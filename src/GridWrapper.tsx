import { CSSProperties, useEffect, useRef } from "react";
import GridLayout from "react-grid-layout";
import "./gridLayoutStyle.css";
import { useWindowSize } from "./useWindowSize";

function draw(
  canvas: any,
  colCount: number,
  rowCount: number,
  oldVersion: boolean,
  isInDesign: boolean
) {
  let iWidth = canvas.clientWidth;
  let iHeight = canvas.clientHeight;

  const ctx = canvas.getContext("2d");

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
  isInDesign: boolean;
  gridWidth?: number;
  gridHeight?: number;
}

export function GridWrapper(props: IGridWrapperProps) {
  const {
    gridWidth,
    gridHeight,
    columnCount,
    rowCount,
    oldVersion,
    isInDesign,
  } = props;
  const windowSize = useWindowSize();
  const availableWidth = gridWidth || windowSize.width || 1;
  const width = Math.ceil(availableWidth / columnCount) * columnCount;
  const availableHeight = gridHeight || windowSize.height || 1;
  const height = Math.ceil(availableHeight / rowCount) * rowCount;

  const canvasRef = useRef(null);

  useEffect(() => {
    draw(canvasRef.current, columnCount, rowCount, oldVersion, isInDesign);
  }, [
    columnCount,
    rowCount,
    windowSize,
    oldVersion,
    gridWidth,
    gridHeight,
    isInDesign,
  ]);
  const items = [];

  const itemStyle: CSSProperties = {
    background: "#2ECC71",
  };
  for (let i = 0; i < columnCount; i += 5) {
    items.push(
      <div
        style={itemStyle}
        key={`item-${i}`}
        data-grid={{ x: i, y: 0, w: 5, h: 5 }}
      >
        {i}
      </div>
    );
  }

  return (
    <>
      <GridLayout
        className="layout"
        margin={[0, 0]}
        cols={columnCount}
        width={width}
        rowHeight={height / rowCount}
        compactType={null}
        useCSSTransforms={true}
        isBounded={true}
        style={{ width, height }}
        isDraggable={isInDesign}
        isResizable={isInDesign}
        isDroppable={isInDesign}
      >
        {items}
      </GridLayout>{" "}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ zIndex: -1, position: "absolute", top: 0, left: 0 }}
      />
    </>
  );
}
