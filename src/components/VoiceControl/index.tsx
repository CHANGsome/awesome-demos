import React, { useCallback, useEffect, useRef } from 'react';
import computedWinDis from 'utils/computedWinDis';
import styles from './index.module.scss';

let dragging = false;
let lastDeg = 0;
let lastX = 0;

type PropsType = {
  size?: number;
  volume?: number;
  onVolumeChange?: (currentVolume: number) => void;
  onMouseEventChange?: (isMouseDown: boolean) => void;
};
const VoiceControl: React.FC<PropsType> = (props) => {
  const { size = 10, volume = 10, onVolumeChange, onMouseEventChange } = props;
  const handlerRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const voiceFillRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (
        !dragging ||
        !handlerRef.current ||
        !volumeRef.current ||
        !voiceFillRef.current
      ) {
        return;
      }
      let [transformOriginX, transformOriginY] = [
        computedWinDis(handlerRef.current).left,
        computedWinDis(handlerRef.current).top +
          handlerRef.current.offsetHeight,
      ];

      let [det_x, det_y] = [
        e.clientX - transformOriginX,
        transformOriginY - e.clientY,
      ];
      let deg = 0;
      let currentVolume = volumeRef.current.textContent
        ? +volumeRef.current.textContent
        : 0;
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
      if (
        det_y > 0 &&
        e.clientX > lastX &&
        deg < lastDeg &&
        deg < 10 &&
        currentVolume < 100
      ) {
        // 其实判断deg===0的时候直接加1最好，但是因为转动太快有掉帧的问题，有些坐标和角度获取不到
        // 加1的条件：1.deg 从 359->0: 在顺时针旋转的时候因为deg一直时递增的（0增到359+），所以当前deg小于上一次deg的时候就是从第四象限跳到第一象限的时候
        //          2.顺时针旋转：
        //          （1）当前X坐标大于上一次坐标（不一定能满足，因为mousemove绑定在document上，有时候拖拽鼠标会往回移动）
        //          （2）所以加一个条件一起判断是否顺时针：deg < 10，只在离y正半轴10度的地方判断
        currentVolume++;
        volumeRef.current.textContent = currentVolume + '';
        voiceFillRef.current.style.borderBottomWidth = `${
          size * 0.14 * currentVolume
        }px`;
      } else if (
        det_y > 0 &&
        e.clientX < lastX &&
        deg > lastDeg &&
        360 - deg < 10 &&
        currentVolume > 0
      ) {
        // 减1的条件：1. 逆时针旋转；2.从第1象限跳到第四象限的那个时候
        currentVolume--;
        volumeRef.current.textContent = currentVolume + '';
        voiceFillRef.current.style.borderBottomWidth = `${
          size * 0.14 * currentVolume
        }px`;
      }
      onVolumeChange && onVolumeChange(currentVolume / 100);
      lastDeg = deg;
      lastX = e.clientX;
      handlerRef.current.style.transform = `rotate(${deg}deg)`;
    },
    [onVolumeChange, size]
  );
  useEffect(() => {
    // 将mousemove和mouseup绑定在document上，这样拖拽元素时鼠标飞出去事件也不会丢失
    document.onmousemove = handleMove; // 鼠标移动
    document.onmouseup = () => {
      dragging = false;
      onMouseEventChange && onMouseEventChange(false);
    }; // 鼠标抬起

    return () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }, [handleMove, onMouseEventChange]);

  useEffect(() => {
    if (!volumeRef.current || !voiceFillRef.current) {
      return;
    }
    volumeRef.current.textContent = volume + '';
    voiceFillRef.current.style.borderBottomWidth = `${size * 0.14 * volume}px`;
  }, [volume, size]);

  return (
    <div className={styles.voiceContainer} style={{ fontSize: `${size}px` }}>
      <div
        ref={handlerRef}
        className={styles.handler}
        onMouseDown={() => {
          dragging = true;
          onMouseEventChange && onMouseEventChange(true);
        }} // 鼠标按下
      >
        <div
          className={styles.head}
          // style={isShow ? {opacity: '1'} : { opacity: '0' }}
        ></div>
        <div
          className={styles.axis}
          // style={isShow ? {opacity: '1'} : { opacity: '0' }}
        ></div>
        <div
          className={styles.anchor}
          // onMouseEnter={() => {
          //   setIsShow(true);
          // }}
        >
          <div className={styles.anchorIconSide}></div>
          <div className={styles.anchorIconCenter}></div>
          <div className={styles.anchorIconSide}></div>
        </div>
      </div>
      <div
        className={styles.voiceDisplay}
        // style={isShow ? {opacity: '1'} : { opacity: '0' }}
      >
        <div className={styles.voiceNumber} ref={volumeRef}></div>
        <div className={styles.voiceFill} ref={voiceFillRef}></div>
      </div>
    </div>
  );
};

export default VoiceControl;
