import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import VideoPopup from './VideoPopup';

interface LoadingPopupProps {
  onComplete: () => void;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ onComplete }) => {
  const [showVideoPopup, setShowVideoPopup] = useState(true);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const handleSaibaMais = () => {
    setShowVideoPopup(false);
    setShowLoadingPopup(true);
  };

  const handleCloseVideoPopup = () => {
    setShowVideoPopup(false);
    // Pequeno delay para garantir que as imagens tenham tempo de carregar
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleContinueFromLoading = () => {
    setShowLoadingPopup(false);
    // Pequeno delay para garantir que as imagens tenham tempo de carregar
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <>
      <VideoPopup 
        isOpen={showVideoPopup}
        onClose={handleCloseVideoPopup}
        onSaibaMais={handleSaibaMais}
      />
      
      <Dialog.Root open={showLoadingPopup} onOpenChange={() => {}}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-white z-50" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <VisuallyHidden.Root>
              <Dialog.Title>Carregamento</Dialog.Title>
            </VisuallyHidden.Root>
            
            <div className="w-full max-w-5xl text-center flex flex-col justify-center min-h-screen py-8">
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-gray-900">
                  Sua internet não tá durando o mês todo? Você sabia que
                </h1>
              </div>

              {/* Imagem do celular movida da página principal */}
              <div className="mb-6 md:mb-8">
                <div className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://pfyvnpqpowcqtloitzln.supabase.co/storage/v1/object/public/imagem/photo_2025-08-27_05-25-47.jpg"
                      alt="Federal Associados - Internet ilimitada"
                      className="w-full h-auto object-cover"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>
                
                {/* Descrição abaixo da imagem */}
                <div className="mt-4 text-center">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Do que adianta pagar caro em um celular, e não ter uma boa internet? Você já passou por aquele momento constrangedor de tentar pagar uma conta, pedir um carro ou mandar aquele áudio importante na rua e a internet simplesmente parou? Isso não acontece por falta de um bom celular, mas sim por não ter uma internet de qualidade.
                  </p>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-gray-900">
                  você está cansado de depender do Wi-Fi dos outros ao sair de casa?
                </h1>
              </div>

              <button
                onClick={handleContinueFromLoading}
                className="inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-lg md:text-xl py-3 md:py-4 px-6 md:px-8 animate-button-pulse-glow"
              >
                Sim, estou cansado disso
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default LoadingPopup;