import styles from './index.module.scss';
import Icon from 'components/IconComp';
import Handler from 'components/VoiceControl/Handler';
import { useRef, useState } from 'react';
import Waves from 'components/Waves';
import computedWinDis from 'utils/computedWinDis';

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
  isWaiting: boolean;
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
  const [isMouseMove, setIsMouseMove] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveRef1 = useRef<HTMLDivElement>(null);
  const waveRef2 = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [audioProps, setAudioProps] = useState<AudioProps>({
    totalTime: 0,
    currentTime: 0,
    isPlay: false,
    volume: 0,
    isWaiting: false,
  });

  const updateCurrentTime = (value: number) => {
    setAudioProps({
      ...audioProps,
      currentTime: value,
    });
    // 更新进度条
    let progressBarLen = (190 * value) / audioRef.current!.duration;
    if (value.toString() === audioRef.current!.duration.toString()) {
      // 播放完的时候
      setAudioProps({
        ...audioProps,
        isPlay: false,
        currentTime: 0,
      });
      progressBarLen = 0;
    }
    progressBarRef.current!.style.width = `${progressBarLen}px`;
  };
  const controlAudio = (type: string, value?: number) => {
    if (!audioRef.current || !progressBarRef.current) {
      return;
    }
    switch (type) {
      case 'totalTime':
        setAudioProps({ ...audioProps, totalTime: audioRef.current.duration });
        break;
      case 'currentTime':
        // 更新当前时间
        updateCurrentTime(audioRef.current.currentTime);
        break;
      case 'changeCurrentTime':
        // 更新当前时间
        audioRef.current.currentTime = value as number;
        updateCurrentTime(value as number);
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
        audioRef.current.volume = value as number;
        setAudioProps({
          ...audioProps,
          volume: value as number,
        });
        break;
      case 'waiting': // 缓冲时
        setAudioProps({
          ...audioProps,
          isWaiting: true,
        });
        break;
      case 'playing': // 缓冲结束继续播放
        setAudioProps({
          ...audioProps,
          isWaiting: false,
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
            audioRef.current.volume = audioProps.volume;
          }
          controlAudio('totalTime');
        }}
        onTimeUpdate={() => {
          controlAudio('currentTime');
        }}
        ref={audioRef}
        onWaiting={() => {
          // 缓冲时
          controlAudio('waiting');
        }}
        onPlaying={() => {
          // 缓冲结束时
          controlAudio('playing');
        }}
      >
        您的浏览器不支持 audio 标签。
      </audio>
      <div className={styles.audioPlayer}>
        <div className={styles.musicInfo}>
          <div className={styles.info}>
            <h3>{audioTitle}</h3>
            <div
              className={styles.progressBarWrapper}
              style={audioProps.isWaiting ? { opacity: '0.5' } : {}}
            >
              <div className={styles.time}>
                <span>{secondToDate(audioProps.currentTime)}</span>
                <span>{secondToDate(audioProps.totalTime)}</span>
              </div>
              <div
                className={styles.progressBar}
                onClick={(e) => {
                  if (audioProps.isWaiting) {
                    // 缓冲时无法改变进度条
                    return;
                  }
                  if (progressBarRef.current && audioRef.current) {
                    const startX = computedWinDis(progressBarRef.current).left;
                    const currentX = e.clientX;
                    controlAudio(
                      'changeCurrentTime',
                      ((currentX - startX) / 190) * audioRef.current.duration
                    );
                  }
                }}
              >
                <div className={styles.inner} ref={progressBarRef}></div>
              </div>
            </div>
          </div>
          <div className={styles.waveWrapper}>
            <Waves ref={waveRef1} />
          </div>
        </div>
        <div className={styles.coverWrapper}>
          <div
            className={styles.buffer}
            style={audioProps.isWaiting ? { opacity: '1' } : { opacity: '0' }}
          >
            Buffering...
          </div>
          <div
            className={styles.cover}
            style={audioProps.isWaiting ? { opacity: '0.5' } : {}}
          >
            <div className={styles.center}></div>
          </div>
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
