# main.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Optional

from propose_kolam2D import propose_kolam2D   # your code 3
from draw_kolam import load_kolam_data        # your code 2
from count_islands import count_islands       # your code 1

app = FastAPI()

# Allow React frontend access (development). Change in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load tile point data once at startup
pt = load_kolam_data("kolam_data.mat")
# Convert each tile's complex vector to [[x,y],...]
pt_json = [[[float(p.real), float(p.imag)] for p in tile] for tile in pt]


def detect_symmetry(M: np.ndarray):
    """
    Return booleans for horizontal, vertical, diagonal symmetry of matrix M.
    """
    # Convert to numpy array
    M = np.array(M)
    # Horizontal: flip top<->bottom
    horizontal = np.array_equal(M, M[::-1, :])
    # Vertical: flip left<->right
    vertical = np.array_equal(M, M[:, ::-1])
    # Diagonal (main diagonal) symmetry: check shape and transpose equality
    diagonal = False
    if M.shape[0] == M.shape[1]:
        diagonal = np.array_equal(M, M.T)
    # Anti-diagonal (other diagonal)
    anti_diagonal = False
    if M.shape[0] == M.shape[1]:
        anti_diagonal = np.array_equal(M, np.fliplr(np.flipud(M)).T)

    return {
        "horizontal": bool(horizontal),
        "vertical": bool(vertical),
        "diagonal": bool(diagonal),
        "anti_diagonal": bool(anti_diagonal),
    }


@app.get("/generate_kolam")
def generate_kolam(
    size: int = Query(5, ge=3, le=40),
    seed: Optional[int] = None,
    include_dots: bool = True,
):


    """
    Generate kolam, return:
      - matrix: tile indices
      - pt: tile coordinate shapes (list of list of [x,y])
      - islands: integer label matrix (same shape as matrix)
      - num_islands, island_sizes
      - symmetry_info: detected symmetries
      - dots: list of [row, col] centers (if include_dots)
    """
    # 1. generate matrix
    M = propose_kolam2D(size, seed=seed)

    # 2. compute islands using your count_islands
    num_islands, lengths, Island = count_islands(M)

    # 3. detect symmetry from M
    sym = detect_symmetry(M)

    # 4. optionally provide dot centers (grid coordinates)
    dots = []
    if include_dots:
        # dots are at integer grid centers from 0..rows-1 and 0..cols-1
        rows, cols = M.shape
        for r in range(rows):
            for c in range(cols):
                dots.append([int(r), int(c)])

    return {
        "matrix": M.tolist(),
        "pt": pt_json,
        "islands": Island.tolist(),
        "num_islands": int(num_islands),
        "island_sizes": lengths.tolist(),
        "symmetry_info": sym,
        "dots": dots,
    }
