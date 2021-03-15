import React, { useRef } from 'react';
import InvoiceControl from 'components/VoiceControl';
import music from './resources/SomeoneYouLoved.mp3';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <div className="App">
      <InvoiceControl
        onVolumeChange={(currentVolume: number) => {
          if (!audioRef.current) {
            return;
          }
          audioRef.current.volume = currentVolume;
        }}
      />
      <audio controls ref={audioRef}>
        <source src={music} type="audio/mpeg"></source>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
