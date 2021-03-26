import styles from './index.module.scss';

const MusicList: React.FC = (props) => {
  return (
    <div className={styles.musicList}>
      <h3 className={styles.title}>Songs List</h3>
      <div className={styles.item}>Some</div>
      <div className={styles.item}>Some</div>
    </div>
  );
};
export default MusicList;
