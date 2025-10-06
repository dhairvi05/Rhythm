import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";


const Kolam = () => {
  const [matrix, setMatrix] = useState([]);
  const [pt, setPt] = useState([]);
  const [islands, setIslands] = useState([]);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const svgRef = useRef(null);
  const navigate = useNavigate();

  // Feature toggles
  const [showSymmetry, setShowSymmetry] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [animate, setAnimate] = useState(false);

  // NEW - Learn-to-draw state
  const [steps, setSteps] = useState([]); // array of step text (strings)
  const [stepGroups, setStepGroups] = useState([]); // each element is array of path keys ("i-j")
  const [showStepsPanel, setShowStepsPanel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = first step (grid), 1..N = island steps

  const PADDING = 1;

  // Utility to generate steps & groups on frontend if backend doesn't provide
  const generateStepsAndGroups = (matrixArg, islandsArg, sizeArg) => {
    const stepsLocal = [];
    const groups = [];
    // Step 1: Grid
    stepsLocal.push(`Draw a ${sizeArg} × ${sizeArg} dot grid as a guide.`);

    // collect islands -> mapping islandId -> list of tile coords
    const islandMap = {};
    const rows = matrixArg?.length || 0;
    const cols = matrixArg?.[0]?.length || 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const val = matrixArg[i][j];
        if (val > 0) {
          const islandId = (islandsArg?.[i]?.[j]) ?? 0;
          if (!islandMap[islandId]) islandMap[islandId] = [];
          islandMap[islandId].push([i, j]);
        }
      }
    }

    // take island ids > 0 and sort
    const islandIds = Object.keys(islandMap)
      .map((x) => Number(x))
      .filter((id) => id > 0)
      .sort((a, b) => a - b);

    // Add a step for each island (these map to specific polylines)
    islandIds.forEach((islandId) => {
      const tiles = islandMap[islandId];
      // step text (show up to a few tile positions in text)
      const coordsSnippet = tiles
        .slice(0, 6)
        .map((p) => `(${p[0]},${p[1]})`)
        .join(', ');
      const more = tiles.length > 6 ? ', ...' : '';
      stepsLocal.push(
        `Draw the loop(s) forming island ${islandId} — connects ${tiles.length} tile(s). Example tiles: ${coordsSnippet}${more}.`
      );
      // create path keys like "i-j"
      groups.push(tiles.map((p) => `${p[0]}-${p[1]}`));
    });

    // If there were no islands -> add a generic final step
    if (groups.length === 0) {
      stepsLocal.push('Draw continuous symmetric strokes to complete the kolam.');
    }

    return { stepsLocal, groups };
  };

  // Fetch kolam (robust, sets steps/stepGroups using backend if supplied, otherwise generates)
  // if not already imported

// --- Kolam Fetch Function ---
const fetchKolam = useCallback(async () => {
  setLoading(true);

  const RETRIES = 3;
  const DELAY = 1000; // ms between retries

  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await axios.get(
        `https://sih-kolamgenerator.onrender.com/generate_kolam?size=${size}&include_dots=true`,
        { timeout: 15000 }
      );

      const data = res.data || {};
      setMatrix(data.matrix || []);
      setPt(data.pt || []);
      setIslands(data.islands || []);

      if (Array.isArray(data.steps) && data.steps.length > 0) {
        setSteps(data.steps);
      }

      if (Array.isArray(data.step_groups) && data.step_groups.length >= 0) {
        setStepGroups(data.step_groups);
      }

      if ((!data.steps || data.steps.length === 0) || (!data.step_groups || data.step_groups.length === 0)) {
        const generated = generateStepsAndGroups(data.matrix || [], data.islands || [], size);
        if (!data.steps || data.steps.length === 0) setSteps(generated.stepsLocal);
        if (!data.step_groups || data.step_groups.length === 0) setStepGroups(generated.groups);
      }

      setCurrentStep(0);
      setShowStepsPanel(false);
      setLoading(false);
      return; // ✅ success, exit loop

    } catch (err) {
      console.warn(`Attempt ${attempt} failed:`, err?.message ?? err);
      if (attempt < RETRIES) {
        await new Promise(r => setTimeout(r, DELAY));
      } else {
        console.error("All fetch attempts failed:", err);
        alert("⚠️ Could not fetch Kolam data. Please check your internet or try again in a moment.");
        setLoading(false);
      }
    }
  }
}, [size]);

// --- Inside your JSX ---
{/* <Button
  onClick={fetchKolam}
  disabled={loading}
  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      Generating Kolam...
    </>
  ) : (
    "Generate Kolam"
  )}
</Button> */}


  useEffect(() => {
    fetchKolam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKolam]);

  // Download functions (unchanged)
  const downloadSVG = () => {
  if (!svgRef.current) return;
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgRef.current);

  // Create a temporary SVG copy and modify white strokes to black
  const blackSVG = source.replace(/stroke="white"/g, 'stroke="black"');

  const blob = new Blob([blackSVG], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'kolam.svg';
  link.click();

  URL.revokeObjectURL(url);
};


  const downloadPNG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);

    const img = new Image();
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngURL;
      link.download = 'kolam.png';
      link.click();
    };
    img.src = url;
  };

  // Render the kolam. When learn-mode is active, highlight only the current step group's paths.
 // Render the kolam. When learn-mode is active, show cumulative steps (not just current one)
const renderKolam = () => {
  if (matrix.length === 0 || pt.length === 0) return null;

  const allX = [];
  const allY = [];
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[0].length; j += 1) {
      const val = matrix[i][j];
      if (val > 0 && pt[val - 1]) {
        pt[val - 1].forEach((p) => {
          allX.push(j + p[0]);
          allY.push(i + p[1]);
        });
      }
    }
  }
  if (allX.length === 0) return null;

  const minX = Math.min(...allX);
  const minY = Math.min(...allY);
  const maxX = Math.max(...allX);
  const maxY = Math.max(...allY);

  const container = document.querySelector('.kolam-visualization');
  const containerWidth = container?.clientWidth || 500;
  const containerHeight = container?.clientHeight || 500;

  const cols = maxX - minX + 2 * PADDING;
  const rows = maxY - minY + 2 * PADDING;
  const SCALE = Math.min(containerWidth / cols, containerHeight / rows);
  const offsetX = (containerWidth - cols * SCALE) / 2;
  const offsetY = (containerHeight - rows * SCALE) / 2;

  // --- KEY CHANGE ---
  // Combine all previous step groups up to currentStep
  const cumulativeGroupKeys = new Set();
  for (let k = 0; k <= currentStep - 1; k++) {
    (stepGroups?.[k] || []).forEach((key) => cumulativeGroupKeys.add(key));
  }

  const paths = [];
  let delay = 0;

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[0].length; j += 1) {
      const val = matrix[i][j];
      if (val > 0 && pt[val - 1]) {
        const tilePoints = pt[val - 1];
        const key = `${i}-${j}`;
        const pathData = tilePoints
          .map(
            (p) =>
              `${(j + p[0] - minX + PADDING) * SCALE},${(i + p[1] - minY + PADDING) * SCALE}`
          )
          .join(' ');

        const inLearnMode = showStepsPanel;
        const isVisible = inLearnMode ? cumulativeGroupKeys.has(key) : true;
        const isCurrent = inLearnMode
          ? stepGroups?.[currentStep - 1]?.includes(key)
          : false;

        const strokeOpacity = inLearnMode
          ? isVisible
            ? isCurrent
              ? 1
              : 0.7
            : 0.1
          : 1;

        const strokeW = inLearnMode
          ? isCurrent
            ? 3
            : isVisible
            ? 2
            : 1
          : 2;

        const animatedStyle =
          animate && !inLearnMode
            ? {
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                animation: `draw 1s linear forwards`,
                animationDelay: `${delay}s`,
              }
            : {};

        if (!inLearnMode || isVisible) {
         paths.push(
          <polyline
          key={key}
          points={pathData}
          fill="none"
          stroke="white"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={strokeOpacity}
          style={{
          ...animatedStyle,
          filter: isCurrent ? 'drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #00ffff)' : 'none',
          transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
    }}
  />
);

        }
        if (animate && !inLearnMode) delay += 0.2;
      }
    }
  }

  // symmetry & grid unchanged...
  const symmetryLines = showSymmetry
    ? [
        <line
          key="v"
          x1={containerWidth / 2}
          y1={0}
          x2={containerWidth / 2}
          y2={containerHeight}
          stroke="white"
          strokeDasharray="5,5"
        />,
        <line
          key="h"
          x1={0}
          y1={containerHeight / 2}
          x2={containerWidth}
          y2={containerHeight / 2}
          stroke="white"
          strokeDasharray="5,5"
        />,
      ]
    : [];

  const dots = showGrid
    ? Array.from({ length: size }, (_, ii) =>
        Array.from({ length: size}, (_, jj) => (
          <circle
            key={`dot-${ii}-${jj}`}
            cx={(jj - minX + PADDING) * SCALE}
            cy={(ii - minY + PADDING) * SCALE}
            r={2}
            fill="white"
          />
        ))
      )
    : [];

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        {paths}
        {dots}
      </g>
      {symmetryLines}
    </svg>
  );
};

  // Step navigation helpers
  const stepsCount = Math.max(1, steps.length); // at least 1 (grid)
  const onNextStep = () => {
    setCurrentStep((s) => Math.min(s + 1, stepsCount - 1));
  };
  const onPrevStep = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };
  const openLearnPanel = () => {
    setShowStepsPanel(true);
    setCurrentStep(0);
  };

  // Style (kept your prior styles and added steps panel)
  const Style = () => (
  <style>{`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body, html, #root {
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }

    /* 🌸 Background + Layout */
    .kolam-app-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 20px;
      background: linear-gradient(135deg, #f9f8ff 0%, #efe9ff 40%, #e0d9ff 100%);
      color: #2e1065;
    }

    /* 🌈 Heading gradient (lavender + violet) */
    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(32px, 5vw, 60px);
      text-align: center;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #6b21a8 0%, #9333ea 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 12px rgba(147,51,234,0.15);
    }

    p {
      text-align: center;
      font-size: 16px;
      color: #4b0082;
      margin-bottom: 12px;
    }

    /* 💎 Buttons (deep violet) */
    .btn, .toggle {
      padding: 10px 18px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      border: none;
      margin: 5px;
      background: linear-gradient(135deg, #581c87 0%, #7e22ce 100%);
      color: white;
      transition: all 0.25s ease-in-out;
      box-shadow: 0 3px 10px rgba(88, 28, 135, 0.35);
    }

    .btn:hover, .toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(126, 34, 206, 0.45);
      background: linear-gradient(135deg, #6b21a8 0%, #9333ea 100%);
    }

    /* 🎨 Canvas Area (slightly darker to contrast white Kolam) */
    .kolam-visualization {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(145deg, #2e1065 0%, #3b0764 100%);
      border-radius: 16px;
      backdrop-filter: blur(8px);
      box-shadow: inset 0 0 50px rgba(204, 34, 34, 0.05);
      margin-top: 16px;
      overflow: hidden;
    }

    /* 📘 Learn Steps Panel */
    .steps-panel {
      position: fixed;
      right: 20px;
      bottom: 20px;
      background: rgba(255, 255, 255, 0.97);
      border: 1px solid rgba(168, 85, 247, 0.3);
      color: #3b0764;
      padding: 16px;
      border-radius: 14px;
      max-width: 360px;
      max-height: 65vh;
      overflow-y: auto;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      z-index: 1000;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .steps-panel h3 {
      margin-bottom: 8px;
      font-size: 16px;
      background: linear-gradient(135deg, #6b21a8 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .steps-panel p {
      margin: 8px 0;
      font-size: 14px;
      color: #4b0082;
    }

    .steps-controls {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      justify-content: flex-end;
    }

    /* ✨ Kolam Line Glow Animation */
    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }

    @keyframes pulseGlow {
      0%, 100% {
        filter: drop-shadow(0 0 10px #ffffff) drop-shadow(0 0 20px #e9d5ff);
      }
      50% {
        filter: drop-shadow(0 0 25px #c084fc) drop-shadow(0 0 40px #f5e1ff);
      }
    }
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
      <button
  className="back-home-btn"
  onClick={() => navigate('/dashboard')}
>
  ← Back to Home
</button>
      <div className="kolam-app-container">
        <h1>Kolam Generator</h1>
        <p>Create unique, intricate patterns inspired by traditional South Indian art.</p>

        {/* Controls */}
        <div>
          <button className="toggle" onClick={() => setShowSymmetry(!showSymmetry)}>
            {showSymmetry ? 'Hide Symmetry' : 'Show Symmetry'}
          </button>
          <button className="toggle" onClick={() => setShowGrid(!showGrid)}>
            {showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>
          <button className="toggle" onClick={() => setAnimate(!animate)}>
            {animate ? 'Stop Animation' : 'Animate Drawing'}
          </button>

          <button className="btn" onClick={downloadSVG}>Download SVG</button>
          <button className="btn" onClick={downloadPNG}>Download PNG</button>
          
        </div>

        {/* Size slider */}
        <div className="control-group" style={{ marginTop: 8 }}>
          <label htmlFor="size-slider">Kolam Complexity (Size)</label>
          <div className="slider-container" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
            <input
              id="size-slider"
              type="range"
              min="3"
              max="20"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{size}</span>
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <button onClick={fetchKolam} className="btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate New Kolam'}
          </button>

          {/* NEW: Learn to Draw button */}
          {matrix.length > 0 && (
            <button className="btn" onClick={openLearnPanel} style={{ marginLeft: 8 }}>
              Learn to Draw
            </button>
          )}
        </div>

        {/* Visualization */}
        <div className="kolam-visualization">
          {loading ? <p>Loading...</p> : renderKolam()}
        </div>
      </div>

      {/* Steps panel */}
      {showStepsPanel && (
        <div className="steps-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Step {currentStep + 1} / {Math.max(1, steps.length)}</h3>
            <div>
              <button className="btn" onClick={() => setShowStepsPanel(false)} style={{ padding: '6px 10px', background: '#ff6b6b', color: '#fff' }}>
                Close
              </button>
            </div>
          </div>

          <p style={{ whiteSpace: 'pre-line' }}>
          <strong>Step {currentStep + 1}:</strong> {steps[currentStep] || '—'}
          </p>


          <div className="steps-controls">
            <button className="toggle" onClick={onPrevStep} disabled={currentStep === 0}>Prev</button>
            <button className="toggle" onClick={onNextStep} disabled={currentStep >= steps.length - 1}>Next</button>
          </div>

          <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
            <div><strong>Tip:</strong> Use Prev/Next to step through the drawing. The highlighted strokes show what to draw for the chosen step.</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Kolam;
