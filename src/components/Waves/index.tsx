import styles from './index.module.scss';
type PropsType = {
  top?: number;
};
const Waves: React.FC<PropsType> = (props) => {
  const { top = 0 } = props;
  // console.log(top);
  return <div className={styles.waves} style={{ top: `${top}px` }}></div>;
};
export default Waves;
