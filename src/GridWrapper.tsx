import { useState, useEffect, useRef } from "react";

function drawGridLines(cnv: any, lineOptions: any) {
  console.log("canvas", cnv);
  var iWidth = cnv.width;
  var iHeight = cnv.height;

  var ctx = cnv.getContext("2d");

  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = lineOptions.color;
  ctx.strokeWidth = 1;

  ctx.beginPath();

  var iCount = null;
  var i = null;
  var x = null;
  var y = null;

  iCount = Math.floor(iWidth / lineOptions.separation);

  for (i = 1; i <= iCount; i++) {
    x = i * lineOptions.separation;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, iHeight);
    ctx.stroke();
  }

  iCount = Math.floor(iHeight / lineOptions.separation);

  for (i = 1; i <= iCount; i++) {
    y = i * lineOptions.separation;
    ctx.moveTo(0, y);
    ctx.lineTo(iWidth, y);
    ctx.stroke();
  }

  ctx.closePath();

  return;
}
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function GridWrapper() {
  const size = useWindowSize();
  const ref = useRef(null);

  useEffect(() => {
    let canvas = ref.current;

    const gridOptions = {
      majorLines: {
        separation: 20,
        color: "#D3D3D3",
      },
    };

    drawGridLines(canvas, gridOptions.majorLines);
  });

  return <canvas ref={ref} width={size.width} height={size.height}></canvas>;
}
