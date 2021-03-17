import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import voice from 'img/voice.svg';

let dragging = false;
let circles = 0;
let lastDeg = 0;
let lastX = 0;

type PropsType = {
  size?: number;
  volume?: number;
  onVolumeChange?: (currentVolume: number) => void;
};
const VoiceControl: React.FC<PropsType> = (props) => {
  const { size = 10, volume = 10, onVolumeChange } = props;
  const handlerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [rotateDeg, setRotateDeg] = useState<number>(0);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging || !handlerRef.current) {
        return;
      }
      let [transformOriginX, transformOriginY] = [
        handlerRef.current.offsetLeft,
        handlerRef.current.offsetTop + handlerRef.current.offsetHeight,
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
          // 其实判断deg===0的时候直接加1最好，但是因为转动太快有掉帧的问题，有些坐标和角度获取不到
          // 加1的条件：1.deg 从 359->0: 在顺时针旋转的时候因为deg一直时递增的（0增到359+），所以当前deg小于上一次deg的时候就是从第四象限跳到第一象限的时候
          //          2.顺时针旋转：
          //          （1）当前X坐标大于上一次坐标（不一定能满足，因为mousemove绑定在document上，有时候拖拽鼠标会往回移动）
          //          （2）所以加一个条件一起判断是否顺时针：deg < 10，只在离y正半轴10度的地方判断
          circles++;
        } else if (
          e.clientX < lastX &&
          deg > lastDeg &&
          360 - deg < 10 &&
          circles > 0
        ) {
          // 减1的条件：1. 逆时针旋转；2.从第1象限跳到第四象限的那个时候
          circles--;
        }
      }
      onVolumeChange && onVolumeChange(circles / 100);
      setRotateDeg(deg);
      lastDeg = deg;
      lastX = e.clientX;
    },
    [onVolumeChange]
  );
  useEffect(() => {
    // 将mousemove和mouseup绑定在document上，这样拖拽元素时鼠标飞出去事件也不会丢失
    document.onmousemove = handleMove; // 鼠标移动
    document.onmouseup = () => (dragging = false); // 鼠标抬起

    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, [handleMove]);

  useEffect(() => {
    if (!volumeRef.current) {
      return;
    }
    volumeRef.current.textContent = volume + '';
    circles = 10;
  }, [volume]);

  return (
    <div className={styles.container} style={{ fontSize: `${size}px` }}>
      <div className={styles.top}>
        <div
          ref={handlerRef}
          className={styles.handler}
          style={{ transform: `rotate(${rotateDeg}deg)` }}
          onMouseDown={() => (dragging = true)} // 鼠标按下
        >
          <div className={styles.head}>
            {/* <img
              src={require('img/Jennie2.jpg').default}
              alt="head"
              className={styles.headIcon}
            /> */}
          </div>
          <div className={styles.axis}></div>
          <div className={styles.anchor}></div>
        </div>
        <div className={styles.voiceContainer}>
          <div className={styles.voiceDisplay}>
            <div className={styles.voiceNumber} ref={volumeRef}>
              {circles}
            </div>
            <div
              className={styles.voiceFill}
              style={
                volume && !circles
                  ? { borderBottomWidth: `${size * 0.14 * volume}px` }
                  : { borderBottomWidth: `${size * 0.14 * circles}px` }
              }
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
