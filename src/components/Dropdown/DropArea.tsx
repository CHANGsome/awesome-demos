import styles from './index.module.scss';
interface PropsType {
  visible: boolean;
}
const DropArea: React.FC<PropsType> = (props) => {
  const { visible } = props;
  return (
    <div className={visible ? styles.dropAreaContainer : styles.dropAreaHidden}>
      {props.children}
    </div>
  );
};
export default DropArea;
