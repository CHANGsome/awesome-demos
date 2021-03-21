import { useRef } from 'react';
import styles from './index.module.scss';

const Handler: React.FC = () => {
  const handlerRef = useRef<HTMLDivElement>(null);
  return (
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
  );
};
export default Handler;
