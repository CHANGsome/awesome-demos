import Layout from 'components/DoubleColumnLayout';
import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import useWindowSize from 'hooks/useWindowSize';
import Icon from 'components/IconComp';

let canDraw = false;
let lastXY: (number | undefined)[] = [undefined, undefined];
enum Size {
  SMALL = 2,
  MIDDLE = 5,
  LARGE = 8,
}

const Canvas: React.FC = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [usingEraser, setUsingEraser] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('black');
  const [penSize, setPenSize] = useState<number>(Size.SMALL);
  const [eraserSize, setEraserSize] = useState<number>(Size.SMALL);

  const drawCircle = (x: number, y: number, radius: number) => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }
    if (usingEraser) {
      context.clearRect(x, y, eraserSize * 2, eraserSize * 2);
    } else {
      context.beginPath();
      context.fillStyle = penColor;
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
      context.clearRect(x2, y2, eraserSize * 2, eraserSize * 2);
    } else {
      context.beginPath();
      context.strokeStyle = penColor;
      context.moveTo(x1, y1); // 起点
      context.lineWidth = penSize * 2;
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
    drawCircle(x, y, penSize);
    lastXY = [x, y];
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canDraw || lastXY[0] === undefined || lastXY[1] === undefined) {
      return;
    }
    const [x, y] = getCurrentXY(e.clientX, e.clientY);
    drawCircle(x, y, penSize);
    drawLine(lastXY[0], lastXY[1], x, y);
    lastXY = [x, y];
  };
  return (
    <Layout>
      <div className={styles.canvasContainer}>
        <div className={styles.tools}>
          <Icon
            name="pencil"
            className={styles.pencil}
            onClick={() => {
              setUsingEraser(false);
              if (canvasRef.current) {
                canvasRef.current.style.cursor =
                  ' url(https://cdn.discordapp.com/attachments/303406782104207362/315839175406649345/Overwatch.cur),auto';
              }
            }}
            style={!usingEraser ? { transform: 'scale(1.5)' } : {}}
          />
          <Icon
            name="eraser"
            className={styles.eraser}
            onClick={() => {
              setUsingEraser(true);
              if (canvasRef.current) {
                canvasRef.current.style.cursor =
                  'url(https://z3.ax1x.com/2021/03/31/cAOe8P.png) ,auto';
              }
            }}
            style={usingEraser ? { transform: 'scale(1.5)' } : {}}
          />
          <Icon
            name="clear"
            onClick={() => {
              if (canvasRef.current) {
                const context = canvasRef.current.getContext('2d');
                if (context) {
                  context.clearRect(0, 0, windowWidth, windowHeight);
                }
              }
            }}
          />
          <Icon
            name="download"
            onClick={() => {
              if (canvasRef.current) {
                let url = canvasRef.current.toDataURL('img/png');
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.href = url;
                a.download = 'image';
                a.click();
              }
            }}
          />
          <div className={styles.divider}></div>
          {usingEraser ? (
            <div className={styles.eraserSelection}>
              <div
                className={styles.small}
                onClick={() => {
                  setEraserSize(Size.SMALL);
                }}
                style={eraserSize === Size.SMALL ? { borderColor: 'blue' } : {}}
              ></div>
              <div
                className={styles.middle}
                onClick={() => {
                  setEraserSize(Size.MIDDLE);
                }}
                style={
                  eraserSize === Size.MIDDLE ? { borderColor: 'blue' } : {}
                }
              ></div>
              <div
                className={styles.large}
                onClick={() => {
                  setEraserSize(Size.LARGE);
                }}
                style={eraserSize === Size.LARGE ? { borderColor: 'blue' } : {}}
              ></div>
            </div>
          ) : (
            <div className={styles.penSelection}>
              <div
                className={styles.red}
                onClick={() => {
                  setPenColor('red');
                }}
                style={
                  penColor === 'red'
                    ? { border: ' 4px solid #ccc', transform: 'scale(1.4)' }
                    : {}
                }
              ></div>
              <div
                className={styles.blue}
                style={
                  penColor === 'blue'
                    ? { border: ' 4px solid #ccc', transform: 'scale(1.4)' }
                    : {}
                }
                onClick={(e) => {
                  setPenColor('blue');
                }}
              ></div>
              <div
                className={styles.black}
                onClick={() => {
                  setPenColor('black');
                }}
                style={
                  penColor === 'black'
                    ? { border: ' 4px solid #ccc', transform: 'scale(1.4)' }
                    : {}
                }
              ></div>
              <div className={styles.divider}></div>
              <div
                className={styles.penWrapper}
                onClick={() => {
                  setPenSize(Size.SMALL);
                }}
                style={
                  penSize === Size.SMALL ? { backgroundColor: '#ccc' } : {}
                }
              >
                <div className={styles.smallPen}></div>
              </div>
              <div
                className={styles.penWrapper}
                onClick={() => {
                  setPenSize(Size.MIDDLE);
                }}
                style={
                  penSize === Size.MIDDLE ? { backgroundColor: '#ccc' } : {}
                }
              >
                <div className={styles.middlePen}></div>
              </div>
              <div
                className={styles.penWrapper}
                onClick={() => {
                  setPenSize(Size.LARGE);
                }}
                style={
                  penSize === Size.LARGE ? { backgroundColor: '#ccc' } : {}
                }
              >
                <div className={styles.largePen}></div>{' '}
              </div>
            </div>
          )}
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
