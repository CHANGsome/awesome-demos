import styles from './index.module.scss';
import Icon from 'components/IconComp';
import VoiceControl from 'components/VoiceControl';
type AudioPropsType = {
  audioSrc: string;
  audioTitle: string;
  initVolume?: number;
};
const AudioComp: React.FC<AudioPropsType> = (props) => {
  const { audioSrc, audioTitle, initVolume = 0 } = props;
  return (
    <div>
      <audio
        src={audioSrc}
        preload="true"
        onCanPlay={() => {}}
        onTimeUpdate={() => {}}
      >
        您的浏览器不支持 audio 标签。
      </audio>
      <div className={styles.audioPlayer}>
        <div className={styles.musicInfo}>
          <div className={styles.info}>
            <h3>Someone You Loved</h3>
            <div className={styles.progressBarWrapper}>
              <div className={styles.time}>
                <span>00:00</span>
                <span>03:00</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.inner}></div>
              </div>
            </div>
          </div>
          <VoiceControl size={3} />
        </div>
        <div className={styles.cover}>
          <div className={styles.center}></div>
        </div>
        <div className={styles.controls} style={{ pointerEvents: 'auto' }}>
          <div className={styles.prev}>
            <Icon name="prev" />
          </div>
          <div className={styles.play}>
            <Icon name="play" />
          </div>
          <div className={styles.next}>
            <Icon name="next" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioComp;
