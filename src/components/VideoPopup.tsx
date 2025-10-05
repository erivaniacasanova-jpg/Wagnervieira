import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { X, VolumeX } from 'lucide-react';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSaibaMais: () => void;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose, onSaibaMais }) => {
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoStarted, setVideoStarted] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Reiniciar do início e ativar som
      video.currentTime = 0;
      video.muted = false;
      video.volume = 0.8;
      
      await video.play();
      setVideoStarted(true);
    } catch (error) {
      console.error('Erro ao reproduzir vídeo:', error);
    }
  };

  const handleVideoLoadedData = () => {
    setVideoLoaded(true);
  };

  // Reset states when popup closes
  React.useEffect(() => {
    if (!isOpen) {
      setVideoLoaded(false);
      setVideoStarted(false);
    }
  }, [isOpen]);
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-white z-50" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <VisuallyHidden.Root>
            <Dialog.Title>Vídeo Federal Associados</Dialog.Title>
          </VisuallyHidden.Root>
          
          <div className="w-full max-w-5xl text-center flex flex-col justify-center min-h-screen py-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm z-10"
              aria-label="Fechar"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>

            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Federal Associados</h2>
              <p className="text-gray-600 mb-6">Descubra como ter internet ilimitada de verdade</p>
            </div>

            {/* Vídeo com preload otimizado */}
            <div className="relative mb-6 md:mb-8 rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
              {/* Overlay de carregamento/clique */}
              {(!videoLoaded || !videoStarted) && (
                <div 
                  className="absolute inset-0 z-10 flex items-center justify-center bg-blue-500 cursor-pointer transition-opacity duration-300"
                  onClick={handleVideoClick}
                >
                  <div className="bg-blue-600 rounded-xl p-6 text-center text-white shadow-lg max-w-sm mx-4">
                    <div className="mb-3">
                      <VolumeX className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {!videoLoaded ? 'Carregando vídeo...' : 'Seu vídeo já começou'}
                    </h3>
                    <p className="text-sm opacity-90">
                      {!videoLoaded ? 'Aguarde um momento' : 'Clique para ouvir'}
                    </p>
                  </div>
                </div>
              )}
              
              <video
                ref={videoRef}
                className="w-full h-auto object-contain bg-black"
                controls={videoStarted}
                controlsList="nodownload"
                playsInline
                preload="metadata"
                muted
                onLoadedData={handleVideoLoadedData}
                onContextMenu={(e) => e.preventDefault()}
                src="https://hjqtpzoqcpaejgsoxqon.supabase.co/storage/v1/object/public/pbi/video_2025-09-08_08-28-00.mp4"
                onLoadStart={(e) => {
                  const video = e.currentTarget;
                  video.style.transform = 'none';
                  video.style.objectFit = 'contain';
                  video.style.width = '100%';
                  video.style.height = 'auto';
                }}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  video.style.width = '100%';
                  video.style.height = 'auto';
                  video.style.objectFit = 'contain';
                  video.style.transform = 'none';
                }}
              >
                <style>
                  {`
                    video::-webkit-media-controls-overflow-menu-button,
                    video::-webkit-media-controls-overflow-menu-list,
                    video::-webkit-media-controls-download-button {
                      display: none !important;
                    }
                    video::-webkit-media-controls-enclosure {
                      overflow: hidden !important;
                    }
                    video::-webkit-media-controls-panel {
                      overflow: clip !important;
                    }
                    video {
                      object-fit: contain !important;
                      background-color: #000 !important;
                    }
                  `}
                </style>
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </div>

            {/* Botão Saiba Mais */}
            <div className="text-center">
              <button
                onClick={onSaibaMais}
                className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-lg md:text-xl py-3 md:py-4 px-6 md:px-8 animate-continuous-glow"
              >
                Saiba mais!
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VideoPopup;