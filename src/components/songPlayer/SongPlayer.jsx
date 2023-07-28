import React, { useRef, useState, useEffect } from 'react';
import './songPlayer.css';
import hbd from '../../media/hbd.mp3';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const SongPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleAudioInteract = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (hasInteracted) {
      audioRef.current.loop = true;
    }
  }, [hasInteracted]);

  return (
    <div className='song-player'>
      {!hasInteracted ? (
        <button onClick={handleAudioInteract}>
          <MusicNoteIcon /> <span>Play Music</span>
        </button>
      ) : null}
      <audio ref={audioRef} src={hbd} onPlay={handleAudioInteract} />
    </div>
  );
};

export default SongPlayer;
