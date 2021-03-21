import React, { useEffect, useRef } from 'react';
import AudioComp from 'components/AudioComp';
import styles from './index.module.scss';
let music = require('resources/SomeoneYouLoved.mp3');

const MusicPlayer: React.FC = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const initVolume = 10;
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.volume = initVolume / 100;
  }, []);
  return (
    <div className={styles.container}>
      <AudioComp audioSrc={music.default} audioTitle="Someone You Loved" />
    </div>
  );
};
export default MusicPlayer;
