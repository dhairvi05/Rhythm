import React, { useRef, useState, useEffect } from "react";

const KolamDesigner = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prev, setPrev] = useState({ x: 0, y: 0 });

  // Symmetry toggles
  const [mirrorVertical, setMirrorVertical] = useState(false);
  const [mirrorHorizontal, setMirrorHorizontal] = useState(false);
  const [mirrorDiagonal, setMirrorDiagonal] = useState(false);

  // Grid settings
  const [showGrid, setShowGrid] = useState(true);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setPrev({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDrawing(true);
  };

  const stopDrawing = () => setDrawing(false);

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
    `}</style>
  );

  return (
    <>
      <Style />
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
          <button className="btn" onClick={clearCanvas}>Clear</button>
          <button className="btn" onClick={downloadPNG}>Download PNG</button>
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
