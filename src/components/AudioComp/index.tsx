import styles from './index.module.scss';
import Icon from 'components/IconComp';
import Handler from 'components/VoiceControl/Handler';
import { useState } from 'react';

type AudioPropsType = {
  audioSrc: string;
  audioTitle: string;
  initVolume?: number;
};
const AudioComp: React.FC<AudioPropsType> = (props) => {
  const { audioSrc, audioTitle, initVolume = 0 } = props;
  const [currentVolume, setCurrentVolume] = useState<number>(initVolume);
  return (
    <div>
      {currentVolume}
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
            <h3>{audioTitle}</h3>
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
          <div className={styles.handlerWrapper}>
            <Handler
              size={8}
              onVolumeChange={(circles: number) => {
                let volume = circles + initVolume;
                if (volume < 0) {
                  volume = 0;
                } else if (volume > 100) {
                  volume = 100;
                }
                setCurrentVolume(volume);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioComp;
