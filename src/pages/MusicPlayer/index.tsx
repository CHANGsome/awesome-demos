import React, { useState } from 'react';
import AudioComp from 'components/AudioComp';
import styles from './index.module.scss';
let music = require('resources/SomeoneYouLoved.mp3');

type AudioProps = {
  audioSrc: string;
  audioTitle: string;
};
const musicList: AudioProps[] = [
  { audioSrc: music.default, audioTitle: 'Someone You Loved' },
  {
    audioSrc:
      'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3',
    audioTitle: 'Music2',
  },
  {
    audioSrc:
      'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3',
    audioTitle: 'Music3',
  },
];
const MusicPlayer: React.FC = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <AudioComp
        audioSrc={musicList[currentIndex].audioSrc}
        audioTitle={musicList[currentIndex].audioTitle}
        onChangeMusic={(det_index: number) => {
          setCurrentIndex(
            (currentIndex + det_index + musicList.length) % musicList.length
          );
        }}
      />
    </div>
  );
};
export default MusicPlayer;
