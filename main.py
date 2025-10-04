
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, List, Dict, Tuple
import numpy as np
import random
import traceback

from propose_kolam2D import propose_kolam2D
from draw_kolam import load_kolam_data
from count_islands import count_islands

app = FastAPI()

# DEV: allow all origins; change in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load tile points once (complex numbers -> [[x,y],...])
pt = load_kolam_data("kolam_data.mat")
pt_json = [[[float(p.real), float(p.imag)] for p in tile] for tile in pt]


def detect_symmetry(M: np.ndarray) -> Dict[str, bool]:
    """Return booleans for horizontal, vertical, diagonal and anti-diagonal symmetry."""
    M = np.array(M)
    horizontal = np.array_equal(M, M[::-1, :])
    vertical = np.array_equal(M, M[:, ::-1])
    diagonal = False
    anti_diagonal = False
    if M.shape[0] == M.shape[1]:
        diagonal = np.array_equal(M, M.T)
        anti_diagonal = np.array_equal(M, np.fliplr(np.flipud(M)).T)
    return {
        "horizontal": bool(horizontal),
        "vertical": bool(vertical),
        "diagonal": bool(diagonal),
        "anti_diagonal": bool(anti_diagonal),
    }


def assemble_steps_and_groups(
    matrix: np.ndarray,
    islands: np.ndarray,
    size: int,
    include_dots: bool,
) -> Tuple[List[str], List[List[str]]]:
    """
    Create human-readable 'steps' and corresponding 'step_groups'.
    step_groups[k] is a list of tile keys "r-c" that should be highlighted/drawn on step (k+1),
    because steps[0] is reserved for the dot-grid.
    """
    steps: List[str] = []
    step_groups: List[List[str]] = []

    # Step 0: grid/dots
    steps.append(f"Step 1: Draw a {size} × {size} dot grid as a guide.")
    if include_dots:
        steps.append("Step 2: Place dots at the grid centers (these are anchors for the Kolam lines).")

    # Map islands -> list of tile coords (r, c)
    island_map = {}
    rows = matrix.shape[0]
    cols = matrix.shape[1] if rows > 0 else 0
    for r in range(rows):
        for c in range(cols):
            val = int(matrix[r, c])
            if val and val > 0:
                island_id = int(islands[r, c]) if (islands is not None and islands.shape == matrix.shape) else 0
                island_map.setdefault(island_id, []).append((r, c))

    # Sort island ids (prefer positive >0)
    island_ids = sorted([k for k in island_map.keys() if k > 0])

    # Create a step for each island (keeps steps readable and groups correspond to tile keys)
    step_index_offset = 2 if include_dots else 1
    for idx, island_id in enumerate(island_ids):
        tiles = island_map[island_id]
        tiles_count = len(tiles)
        # Friendly description: list a few tile coords as example
        coords_snippet = ", ".join([f"({r},{c})" for (r, c) in tiles[:6]])
        more = ", ..." if tiles_count > 6 else ""
        # Step text numbering continues after grid/dot steps
        step_text = f"Step {step_index_offset + idx + 1}: Draw the loop(s) forming island {island_id} — connects {tiles_count} tile(s). Example tiles: {coords_snippet}{more}."
        steps.append(step_text)
        # Group: list of keys "r-c" that the frontend uses to highlight
        step_groups.append([f"{r}-{c}" for (r, c) in tiles])

    # If no islands produced, add a generic final step
    if len(step_groups) == 0:
        steps.append(f"Step {step_index_offset + 1}: Draw continuous symmetric strokes to complete the kolam.")

    return steps, step_groups


@app.get("/generate_kolam")
def generate_kolam(
    size: int = Query(5, ge=3, le=40),
    seed: Optional[int] = None,
    include_dots: bool = True,
):
    """
    Generate kolam and return matrix, pt, islands, metadata plus step-by-step instructions.
    """
    try:
        if seed is not None:
            random.seed(seed)
            np.random.seed(int(seed) & 0xFFFFFFFF)

        # 1. Generate matrix using your existing generator
        M = propose_kolam2D(size, seed=seed)  # should return an np.ndarray
        # 2. island counting (returns: num_islands, lengths, Island)
        num_islands, lengths, Island = count_islands(M)

        # 3. symmetry detect
        sym = detect_symmetry(M)

        # 4. optional dots (grid centers)
        dots = []
        if include_dots:
            rows, cols = M.shape
            for r in range(rows):
                for c in range(cols):
                    dots.append([int(r), int(c)])

        # 5. create steps and step_groups (so frontend can step manually)
        steps, step_groups = assemble_steps_and_groups(M, Island, size, include_dots)

        # 6. prepare JSON-safe objects
        response = {
            "matrix": M.astype(int).tolist(),
            "pt": pt_json,  # already list-of-lists
            "islands": Island.astype(int).tolist(),
            "num_islands": int(num_islands),
            "island_sizes": (lengths.tolist() if hasattr(lengths, "tolist") else list(lengths)),
            "symmetry_info": sym,
            "dots": dots,
            "steps": steps,
            "step_groups": step_groups,
        }
        return response

    except Exception as e:
        tb = traceback.format_exc()
        print(tb)
        return JSONResponse(status_code=500, content={"error": str(e), "trace": tb})
