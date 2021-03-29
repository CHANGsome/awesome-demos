import Layout from 'components/DoubleColumnLayout';
import React, { useRef } from 'react';
import styles from './index.module.scss';
import useWindowSize from 'hooks/useWindowSize';

let canDraw = false;
let usingEraser = false;
let lastXY: (number | undefined)[] = [undefined, undefined];
const RADIUS = 5;
const Canvas: React.FC = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const drawCircle = (x: number, y: number, radius: number) => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }
    if (usingEraser) {
      context.clearRect(x, y, RADIUS * 2, RADIUS * 2);
    } else {
      context.beginPath();
      context.fillStyle = 'black';
      // 圆心(x,y)，半径，画圈的角度：0度～Math.PI * 2（360度）
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  };
  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }
    if (usingEraser) {
      context.clearRect(x2, y2, RADIUS * 2, RADIUS * 2);
    } else {
      context.beginPath();
      context.strokeStyle = 'black';
      context.moveTo(x1, y1); // 起点
      context.lineWidth = RADIUS * 2;
      context.lineTo(x2, y2); // 终点
      context.stroke();
      context.closePath();
    }
  };
  const getCurrentXY = (x: number, y: number) => {
    // e.clientX 和 e.clientY 是计算到视口左上角的距离
    // 由于layout组件有个左边的导航栏，因此减去导航栏的宽度160px
    return [x - 160, y];
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    canDraw = true;
    const [x, y] = getCurrentXY(e.clientX, e.clientY);
    drawCircle(x, y, RADIUS);
    lastXY = [x, y];
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canDraw || lastXY[0] === undefined || lastXY[1] === undefined) {
      return;
    }
    const [x, y] = getCurrentXY(e.clientX, e.clientY);
    drawCircle(x, y, RADIUS);
    drawLine(lastXY[0], lastXY[1], x, y);
    lastXY = [x, y];
  };
  return (
    <Layout>
      <div className={styles.canvasContainer}>
        <div className={styles.tools}>
          <button
            onClick={() => {
              usingEraser = false;
            }}
          >
            铅笔
          </button>
          <button
            onClick={() => {
              usingEraser = true;
            }}
          >
            橡皮擦
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={windowWidth - 160}
          height={windowHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => {
            canDraw = false;
          }}
        ></canvas>
      </div>
    </Layout>
  );
};
export default Canvas;
