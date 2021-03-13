import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import voice from 'img/voice.svg';

let dragging = false;
let circles = 0;
let lastDeg = 0;
let lastX = 0;
const VoiceControl: React.FC = () => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [rotateDeg, setRotateDeg] = useState<number>(0);
  useEffect(() => {
    document.onmousemove = handleMove;
    document.onmouseup = () => (dragging = false);
    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, []);
  const handleMove = (e: MouseEvent) => {
    if (!dragging || !handleRef.current) {
      return;
    }
    let [transformOriginX, transformOriginY] = [
      handleRef.current.offsetLeft,
      handleRef.current.offsetTop + handleRef.current.offsetHeight,
    ];
    let [det_x, det_y] = [
      e.clientX - transformOriginX,
      transformOriginY - e.clientY,
    ];
    let deg = 0;
    if (det_y > 0) {
      // 第一、四象限
      // 根据tan值计算角度
      deg = Math.atan(det_x / det_y) / (Math.PI / 180);
      if (det_x < 0) {
        deg += 360;
      }
    } else if (det_y === 0) {
      // x轴
      if (det_x > 0) {
        deg = 90;
      } else if (det_x < 0) {
        deg = 270;
      }
    } else if (det_y < 0) {
      //第二、三象限，都是正值90～270度
      deg = Math.atan(det_x / det_y) / (Math.PI / 180) + 180;
      if (det_x < 0) {
      }
    }
    if (det_y > 0) {
      if (e.clientX > lastX && deg < lastDeg && deg < 10 && circles < 100) {
        circles++;
      } else if (
        e.clientX < lastX &&
        deg > lastDeg &&
        360 - deg < 10 &&
        circles > 0
      ) {
        circles--;
      }
    }
    setRotateDeg(deg);
    lastDeg = deg;
    lastX = e.clientX;
    // handleRef.current.style.transform = `rotate(${deg}deg)`;
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div
          ref={handleRef}
          className={styles.pointer}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
          onMouseDown={() => (dragging = true)}
        ></div>
        <div className={styles.voiceContainer}>
          <div className={styles.voiceDisplay}>
            <div className={styles.circles}> {circles}</div>
            <div
              className={styles.voiceFill}
              style={{ borderBottomWidth: `${1.6 * circles}px` }}
            ></div>
          </div>
          <img src={voice} alt="voice" className={styles.voiceLogo} />
        </div>
      </div>

      <div className={styles.bottom}></div>
    </div>
  );
};

export default VoiceControl;
