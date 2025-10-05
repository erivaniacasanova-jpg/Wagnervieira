import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, MoreVertical } from 'lucide-react';

interface CustomAudioPlayerProps {
  audioUrl: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSpeedChange = (speed: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="bg-gray-100 rounded-full px-6 py-4 flex items-center justify-center gap-4 shadow-md">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-transparent hover:bg-gray-200 rounded-full transition-colors"
          aria-label={isPlaying ? 'Pausar' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-gray-900" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 text-gray-900" fill="currentColor" />
          )}
        </button>

        <div className="flex-shrink-0 text-sm font-medium text-gray-700 min-w-[80px]">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
        >
          <Volume2 className="w-6 h-6 text-gray-900" />
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Mais opções"
          >
            <MoreVertical className="w-6 h-6 text-gray-900" />
          </button>

          {showSpeedMenu && (
            <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">
                Velocidade
              </div>
              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                    playbackRate === speed ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
