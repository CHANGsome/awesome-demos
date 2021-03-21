import React, { useState } from 'react';
import Handler from './Handler';
import styles from './index.module.scss';

type PropsType = {
  size?: number;
  initVolume?: number;
  onVolumeChange?: (currentVolume: number) => void;
  onMouseEventChange?: (isMouseDown: boolean) => void;
};
const VoiceControl: React.FC<PropsType> = (props) => {
  const {
    size = 10,
    initVolume = 0,
    onVolumeChange,
    onMouseEventChange,
  } = props;
  const [currentVolume, setCurrentVolume] = useState<number>(initVolume);

  return (
    <div className={styles.voiceContainer} style={{ fontSize: `${size}px` }}>
      <Handler
        size={size}
        onVolumeChange={(currentVolume) => {
          onVolumeChange && onVolumeChange(currentVolume);
          setCurrentVolume(currentVolume);
        }}
        onMouseEventChange={(dragging: boolean) => {
          onMouseEventChange && onMouseEventChange(dragging);
        }}
      />
      <div className={styles.voiceDisplay}>
        <div className={styles.voiceNumber}>{currentVolume}</div>
        <div
          className={styles.voiceFill}
          style={{
            borderBottomWidth: `${size * 0.14 * currentVolume}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default VoiceControl;
