import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KolamDesigner = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prev, setPrev] = useState({ x: 0, y: 0 });
  const [currentStroke, setCurrentStroke] = useState([]);
  const [confirmedShapes, setConfirmedShapes] = useState([]);

  const navigate = useNavigate();

  // Symmetry toggles
  const [mirrorVertical, setMirrorVertical] = useState(false);
  const [mirrorHorizontal, setMirrorHorizontal] = useState(false);
  const [mirrorDiagonal, setMirrorDiagonal] = useState(false);

  // Grid settings
  const [showGrid, setShowGrid] = useState(true);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setPrev({ x: startX, y: startY });
    setDrawing(true);
    setCurrentStroke([[startX, startY]]);
  };

  const stopDrawing = async () => {
    if (drawing) {
      setDrawing(false);
      
      if (currentStroke.length > 2) {
        try {
          const response = await fetch("https://rhythm-backend-oi2z.onrender.com/classify_stroke", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stroke: currentStroke }),
          });

          if (!response.ok) throw new Error("Failed to classify stroke");

          const data = await response.json();
          const template = data.template;
          const canvas = canvasRef.current;

          // 1. Find boundaries of your messy drawing
          const xs = currentStroke.map(p => p[0]);
          const ys = currentStroke.map(p => p[1]);
          const minX = Math.min(...xs);
          const minY = Math.min(...ys);
          
          const rangeX = Math.max(...xs) - minX;
          const rangeY = Math.max(...ys) - minY;
          const userSize = Math.max(rangeX, rangeY, 1); 

          // 2. Find boundaries of the AI template
          const tXs = template.map(p => p[0]);
          const tYs = template.map(p => p[1]);
          const tMinX = Math.min(...tXs);
          const tMinY = Math.min(...tYs);
          const tRangeX = Math.max(...tXs) - tMinX;
          const tRangeY = Math.max(...tYs) - tMinY;
          const tSize = Math.max(tRangeX, tRangeY, 1);

          const newShapes = []; // Temporary array to hold our calculated paths

          // Helper function to calculate and save the path (NOT draw it)
          const calculateMappedShape = (mirrorType) => {
            const path = [];
            for (let i = 0; i < template.length; i++) {
              let mappedX = minX + (((template[i][0] - tMinX) / tSize) * userSize);
              let mappedY = minY + (((template[i][1] - tMinY) / tSize) * userSize);

              if (mirrorType === "vertical") mappedX = canvas.width - mappedX;
              if (mirrorType === "horizontal") mappedY = canvas.height - mappedY;
              if (mirrorType === "diagonal") {
                const temp = mappedX;
                mappedX = mappedY;
                mappedY = temp;
              }
              path.push([mappedX, mappedY]);
            }
            newShapes.push(path);
          };

          // Calculate Primary and Mirrored Strokes
          calculateMappedShape("none");
          if (mirrorVertical) calculateMappedShape("vertical");
          if (mirrorHorizontal) calculateMappedShape("horizontal");
          if (mirrorDiagonal) calculateMappedShape("diagonal");

          // 🚀 SEND TO MEMORY! (This triggers the useEffect wipe/redraw automatically)
          setConfirmedShapes(prevShapes => [...prevShapes, ...newShapes]);

        } catch (error) {
          console.error("Classification error:", error);
        }
      }
    }
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentStroke((prevStroke) => [...prevStroke, [x, y]]);

    // ✨ White stroke with glow
    ctx.strokeStyle = "white";
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    if (mirrorVertical) {
      ctx.beginPath();
      ctx.moveTo(width - prev.x, prev.y);
      ctx.lineTo(width - x, y);
      ctx.stroke();
    }

    if (mirrorHorizontal) {
      ctx.beginPath();
      ctx.moveTo(prev.x, height - prev.y);
      ctx.lineTo(x, height - y);
      ctx.stroke();
    }

    if (mirrorDiagonal) {
      ctx.beginPath();
      ctx.moveTo(prev.y, prev.x);
      ctx.lineTo(y, x);
      ctx.stroke();
    }

    setPrev({ x, y });
  };

  // const generateKolam = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/generate_kolam?size=5");
      
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch Kolam data");
  //     }

  //     const data = await response.json();
      
  //     console.log("Backend Connection Successful!");
  //     console.log("Matrix:", data.matrix);
  //     console.log("Tile Points:", data.pt);

  //   } catch (error) {
  //     console.error("Error connecting to backend:", error);
  //     alert("Could not connect to the Python backend. Is it running on port 8000?");
  //   }
  // };

  const generateKolam = async () => {
    try {
      const response = await fetch("https://rhythm-backend-oi2z.onrender.com/generate_kolam?size=5");
      
      if (!response.ok) {
        throw new Error("Failed to fetch Kolam data");
      }

      const data = await response.json();
      console.log("Backend Connection Successful!");
      
      // --- NEW DRAWING LOGIC STARTS HERE ---
      const matrix = data.matrix;
      const pt = data.pt;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // 1. Clear the canvas for the new drawing
      clearCanvas();

      const rows = matrix.length;
      const cols = matrix[0].length;

      // 2. Calculate scaling so the Kolam fits perfectly in the canvas
      const margin = 40; 
      const drawArea = Math.min(canvas.width, canvas.height) - (margin * 2);
      const cellSize = drawArea / Math.max(rows, cols);

      // Center the grid on the canvas
      const offsetX = (canvas.width - (cols * cellSize)) / 2;
      const offsetY = (canvas.height - (rows * cellSize)) / 2;

      // 3. Set the glowing style (matches your manual drawing style)
      ctx.strokeStyle = "white";
      ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 4. Loop through the matrix and draw each tile
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tileId = matrix[r][c];
          
          if (tileId > 0) {
            // pt is 0-indexed, but tileIds are 1-16
            const tilePoints = pt[tileId - 1]; 
            if (!tilePoints) continue;

            ctx.beginPath();
            
            for (let i = 0; i < tilePoints.length; i++) {
              // Extract abstract math coordinates
              const rawX = tilePoints[i][0];
              const rawY = tilePoints[i][1];

              // Map to grid: column (c) + rawX
              const gridX = c + rawX;
              // Map to grid: flip the row vertically because canvas draws top-down, but math is bottom-up
              const gridY = (rows - 1 - r) + rawY; 

              // Scale abstract grid to actual pixel coordinates
              const pixelX = offsetX + (gridX * cellSize);
              const pixelY = offsetY + (gridY * cellSize);

              if (i === 0) {
                ctx.moveTo(pixelX, pixelY);
              } else {
                ctx.lineTo(pixelX, pixelY);
              }
            }
            ctx.stroke();
          }
        }
      }
      // --- NEW DRAWING LOGIC ENDS HERE ---

    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Could not connect to the Python backend. Is it running on port 8000?");
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Keep the dark background consistent
    ctx.fillStyle = "rgba(39, 6, 66, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGrid) drawGrid();
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw faint violet dots for grid
    const width = canvas.width;
    const height = canvas.height;
    const spacing = width / 20;

    ctx.fillStyle = "rgba(160, 130, 255, 0.3)";
    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  const downloadPNG = () => {
    const link = document.createElement("a");
    link.download = "kolam-drawing.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const maxWidth = window.innerWidth - 60;
      const maxHeight = window.innerHeight - 200;

      const size = Math.min(maxWidth, maxHeight) * 0.9;
      canvas.width = size;
      canvas.height = size;

      clearCanvas(); // keep dark background + grid
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [showGrid]);

  // 🔄 NEW: State-Driven Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 1. Wipe the canvas clean (erasing messy white lines)
    ctx.fillStyle = "rgba(39, 6, 66, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (showGrid) drawGrid();

    // 2. Draw all the perfectly snapped shapes in Cyan
    ctx.strokeStyle = "#00ffff";
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3;

    confirmedShapes.forEach(shapePath => {
      ctx.beginPath();
      shapePath.forEach((point, i) => {
        if (i === 0) ctx.moveTo(point[0], point[1]);
        else ctx.lineTo(point[0], point[1]);
      });
      ctx.stroke();
    });

  }, [confirmedShapes, showGrid]); // This runs automatically when these variables change!

  const Style = () => (
    <style>{`
      * { box-sizing: border-box; margin:0; padding:0; }
      body, html, #root { width:100%; height:100%; overflow:hidden; font-family:'Inter', sans-serif; }

      .kolam-app-container {
        width:100vw;
        height:100vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
        padding:20px;
        background: linear-gradient(135deg, #f9f8ff 0%, #efe9ff 40%, #e0d9ff 100%);
        color:#2e1065;
      }

      h1 {
        font-family:'Space Grotesk', sans-serif;
        font-size:clamp(32px,5vw,60px);
        text-align:center;
        margin-bottom:10px;
        background:linear-gradient(135deg,#6b21a8 0%,#9333ea 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }

      p {
        text-align:center;
        font-size:16px;
        color:#4b0082;
        margin-bottom:12px;
      }

      .btn, .toggle {
        padding:10px 18px;
        border-radius:20px;
        font-weight:600;
        font-size:14px;
        cursor:pointer;
        border:none;
        margin:5px;
        background:linear-gradient(135deg,#581c87 0%,#7e22ce 100%);
        color:white;
        transition:all 0.25s ease-in-out;
        box-shadow:0 3px 10px rgba(88,28,135,0.35);
      }

      .btn:hover, .toggle:hover {
        transform:translateY(-2px);
        box-shadow:0 6px 16px rgba(126,34,206,0.45);
        background:linear-gradient(135deg,#6b21a8 0%,#9333ea 100%);
      }

      .kolam-visualization {
        flex:1;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:16px;
        margin-top:16px;
        box-shadow:inset 0 0 50px rgba(255,255,255,0.05);
      }

      canvas {
        border-radius:16px;
        max-width:90%;
        max-height:90%;
        border:1px solid rgba(122,54,240,0.83);
      }

      /* 🏠 Back Button */
      .back-home-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 10px 18px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        border: none;
        background: linear-gradient(135deg, #581c87 0%, #7e22ce 100%);
        color: white;
        transition: all 0.25s ease-in-out;
        box-shadow: 0 3px 10px rgba(88, 28, 135, 0.35);
        z-index: 1000;
      }

      .back-home-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(126, 34, 206, 0.45);
        background: linear-gradient(135deg, #6b21a8 0%, #9333ea 100%);
      }
    `}</style>
  );

  return (
    <>
      <Style />

      {/* 🏠 Back to Home Button */}
      <button
        className="back-home-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Home
      </button>

      <div className="kolam-app-container">
        <h1>Kolam Designer</h1>
        <p>Draw your own Kolam with symmetry!</p>

        <div>
          <button className="toggle" onClick={() => setMirrorVertical(!mirrorVertical)}>
            {mirrorVertical ? "Disable Vertical" : "Vertical Symmetry"}
          </button>
          <button className="toggle" onClick={() => setMirrorHorizontal(!mirrorHorizontal)}>
            {mirrorHorizontal ? "Disable Horizontal" : "Horizontal Symmetry"}
          </button>
          <button className="toggle" onClick={() => setMirrorDiagonal(!mirrorDiagonal)}>
            {mirrorDiagonal ? "Disable Diagonal" : "Diagonal Symmetry"}
          </button>
          <button className="toggle" onClick={() => setShowGrid(!showGrid)}>
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
          <button className="btn" onClick={() => setConfirmedShapes([])}>Clear</button>
          <button className="btn" onClick={downloadPNG}>Download PNG</button>
          <button className="btn" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }} onClick={generateKolam}>
            Auto Generate
          </button>
        </div>

        <div className="kolam-visualization">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={draw}
          />
        </div>
      </div>
    </>
  );
};

export default KolamDesigner;
