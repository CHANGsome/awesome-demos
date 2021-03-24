import styles from './index.module.scss';
import Icon from 'components/IconComp';
import Handler from 'components/VoiceControl/Handler';
import { useRef, useState } from 'react';
import Waves from 'components/Waves';

type AudioCompPropsType = {
  audioSrc: string;
  audioTitle: string;
  initVolume?: number;
};
type AudioProps = {
  totalTime: number;
  currentTime: number;
  isPlay: boolean;
  volume: number;
};
const secondToDate = (totalSecond: number) => {
  const second = Math.floor(totalSecond % 60);
  const minute = Math.floor(totalSecond / 60);
  return `${minute > 10 ? minute : `0${minute}`}:${
    second > 10 ? second : `0${second}`
  }`;
};
const AudioComp: React.FC<AudioCompPropsType> = (props) => {
  const { audioSrc, audioTitle } = props;
  const [currentVolume, setCurrentVolume] = useState<number>(0);
  const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef1 = useRef<HTMLDivElement>(null);
  const waveRef2 = useRef<HTMLDivElement>(null);
  const [audioProps, setAudioProps] = useState<AudioProps>({
    totalTime: 0,
    currentTime: 0,
    isPlay: false,
    volume: 0,
  });

  const controlAudio = (type: string, value?: any) => {
    if (!audioRef.current) {
      return;
    }
    switch (type) {
      case 'totalTime':
        setAudioProps({ ...audioProps, totalTime: audioRef.current.duration });
        break;
      case 'currentTime':
        setAudioProps({
          ...audioProps,
          currentTime: audioRef.current.currentTime,
        });
        break;
      case 'play':
        audioRef.current.play();
        setAudioProps({
          ...audioProps,
          isPlay: true,
        });
        break;
      case 'pause':
        audioRef.current.pause();
        setAudioProps({
          ...audioProps,
          isPlay: false,
        });
        break;
      case 'changeVolume':
        audioRef.current.volume = value;
        setAudioProps({
          ...audioProps,
          volume: value,
        });
        break;
    }
  };
  return (
    <div style={isMouseMove ? { pointerEvents: 'none' } : {}}>
      <audio
        src={audioSrc}
        preload="true"
        onCanPlay={() => {
          if (audioRef.current) {
            audioRef.current.volume = 0;
          }
          controlAudio('totalTime');
        }}
        onTimeUpdate={() => {
          controlAudio('currenTime');
        }}
        ref={audioRef}
      >
        您的浏览器不支持 audio 标签。
      </audio>
      <div className={styles.audioPlayer}>
        <div className={styles.musicInfo}>
          <div className={styles.info}>
            <h3>{audioTitle}</h3>
            <div className={styles.progressBarWrapper}>
              <div className={styles.time}>
                <span>{secondToDate(audioProps.currentTime)}</span>
                <span>{secondToDate(audioProps.totalTime)}</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.inner}></div>
              </div>
            </div>
          </div>
          <div className={styles.waveWrapper}>
            <Waves ref={waveRef1} />
          </div>
        </div>
        <div className={styles.cover}>
          <div className={styles.center}></div>
        </div>
        <div className={styles.controls}>
          <div className={styles.prev}>
            <Icon name="prev" />
          </div>
          <div
            className={styles.play}
            onClick={() => {
              audioProps.isPlay ? controlAudio('pause') : controlAudio('play');
            }}
          >
            {audioProps.isPlay ? <Icon name="play" /> : <Icon name="pause" />}
          </div>
          <div className={styles.next}>
            <Icon name="next" />
          </div>
          <div className={styles.handlerWrapper}>
            <Handler
              size={8}
              maxCircles={20}
              onVolumeChange={(circles: number) => {
                controlAudio('changeVolume', circles / 20);
                if (!waveRef1.current || !waveRef2.current) {
                  return;
                }
                if (circles < 10) {
                  waveRef2.current.style.top = `${100 - 10 * circles}px`;
                  waveRef1.current.style.top = '100px';
                } else {
                  waveRef2.current.style.top = '0';
                  waveRef1.current.style.top = `${100 - 10 * (circles - 10)}px`;
                }
              }}
              onMouseEventChange={(dragging: boolean) => {
                // 解决摇杆时会触发其他元素的hover事件的问题
                setIsMouseMove(dragging);
              }}
            />
          </div>
          <div className={styles.waveWrapper}>
            <Waves ref={waveRef2} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AudioComp;
