import { forwardRef } from 'react';
import styles from './index.module.scss';
// type PropsType = {
//   top?: number;
// };
const Waves = forwardRef<HTMLDivElement, {}>((props, ref) => {
  // const { top = 0 } = props;
  return <div className={styles.waves} ref={ref}></div>;
});
export default Waves;
