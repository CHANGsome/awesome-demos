import React, { useEffect, useRef } from 'react';
import InvoiceControl from 'components/VoiceControl';
let music = require('./resources/SomeoneYouLoved.mp3');

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.volume = 0;
  }, []);
  return (
    <div className="App">
      <InvoiceControl
        volume={10}
        onVolumeChange={(currentVolume: number) => {
          if (!audioRef.current) {
            return;
          }
          audioRef.current.volume = currentVolume;
        }}
      />

      <audio controls ref={audioRef}>
        <source src={music.default} type="audio/mpeg"></source>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
