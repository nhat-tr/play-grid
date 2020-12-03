import { useEffect, useRef } from "react";
import { useWindowSize } from "./useWindowSize";

function draw(
  canvas: any,
  colCount: number,
  rowCount: number,
  oldVersion: boolean
) {
  let iWidth = canvas.clientWidth;
  let iHeight = canvas.clientHeight;

  const ctx = canvas.getContext("2d");

  ctx.translate(0.5, 0.5);
  ctx.strokeStyle = "#D3D3D3";
  ctx.strokeWidth = 1;

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.beginPath();

  let i = 1;
  let x = null;
  let y = null;

  if (oldVersion) {
    const colWidth = Math.floor(iWidth / colCount);

    for (i = 1; i <= colCount; i++) {
      x = i * colWidth;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, iHeight);
      ctx.stroke();
    }

    const rowHeight = Math.floor(iHeight / rowCount);

    for (i = 1; i <= rowCount; i++) {
      y = i * rowHeight;
      ctx.moveTo(0, y);
      ctx.lineTo(iWidth, y);
      ctx.stroke();
    }
  } else {
    const colWidth = Math.floor(iWidth / colCount);

    for (i = 1; i <= colWidth; i++) {
      x = i * colCount;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, iHeight);
      ctx.stroke();
    }

    const rowHeight = Math.floor(iHeight / rowCount);

    for (i = 1; i <= rowHeight; i++) {
      y = i * rowCount;
      ctx.moveTo(0, y);
      ctx.lineTo(iWidth, y);
      ctx.stroke();
    }
  }
  ctx.closePath();

  return;
}

export interface IGridWrapperProps {
  columnCount: number;
  rowCount: number;
  oldVersion: boolean;
  gridWidth?: number;
  gridHeight?: number;
}

export function GridWrapper(props: IGridWrapperProps) {
  const { gridWidth, gridHeight, columnCount, rowCount, oldVersion } = props;
  const size = useWindowSize();
  const canvasWidth = gridWidth || size.width;
  const canvasHeight = gridHeight || size.height;
  const canvasRef = useRef(null);

  useEffect(() => {
    draw(canvasRef.current, columnCount, rowCount, oldVersion);
  }, [columnCount, rowCount, size, oldVersion, gridWidth, gridHeight]);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
  );
}
