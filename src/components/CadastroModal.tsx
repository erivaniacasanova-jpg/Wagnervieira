import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { X, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CadastroModal: React.FC<CadastroModalProps> = ({ isOpen, onClose }) => {
  const handleSiteRedirect = () => {
    window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank');
    onClose();
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank');
    onClose();
  };

  const activationOptions = [
    {
      operator: "Vivo",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Ativação Imediata",
      description: "Ao escolher um plano da Vivo 80GB com ligação acima, você pode simplesmente comprar um chip lacrado em qualquer farmácia, loja, banca de jornal e solicitar ativação de forma imediata.",
      highlight: true
    },
    {
      operator: "Chip físico",
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: "Ativação Tradicional",
      description: "Receba seu chip em casa e solicite a ativação após a entrega.",
      highlight: false
    },
    {
      operator: "Chip Virtual",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      title: "Ativação Instantânea",
      description: "Ao escolher a opção de chip virtual (se o seu aparelho for compatível), você realiza a ativação de forma imediata através de um QR Code exclusivo fornecido pela nossa equipe de ativação.",
      highlight: false
    }
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[90vh] w-[95vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-lg focus:outline-none z-50 overflow-y-auto">
          <VisuallyHidden.Root>
            <Dialog.Title>Cadastro Federal Associados</Dialog.Title>
          </VisuallyHidden.Root>
          
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              aria-label="Fechar"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>

            {/* Vídeo Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="text-center mb-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Federal Associados</h2>
                <p className="text-gray-600 mb-6">Conheça como funciona nosso processo de associação, com o envio do seu chip grátis para todo o Brasil</p>
              </div>

              {/* Vídeo com preload otimizado */}
              <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg">
                <video
                  className="w-full h-auto object-contain bg-black"
                  controls
                  controlsList="nodownload"
                  playsInline
                  preload="metadata"
                  poster=""
                  onContextMenu={(e) => e.preventDefault()}
                  src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/cadastro/cadastro.mp4"
                  onLoadStart={(e) => {
                    // Força orientação correta desde o início
                    const video = e.currentTarget;
                    video.style.transform = 'none';
                    video.style.objectFit = 'contain';
                    video.style.width = '100%';
                    video.style.height = 'auto';
                  }}
                  onLoadedMetadata={(e) => {
                    // Garante que o vídeo mantenha proporção correta
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
            </div>

            {/* Opções de Ativação por Operadora */}
            <div className="p-6 border-b border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Opções de Ativação
                </h3>
                <p className="text-gray-600">
                  Escolha a melhor opção para sua operadora preferida
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activationOptions.map((option, index) => (
                  <div 
                    key={index}
                    className="rounded-xl p-4 border-2 border-gray-300 bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      {option.icon}
                      <h4 className="text-lg font-bold ml-3 text-gray-900">
                        {option.operator}
                      </h4>
                    </div>
                    
                    <h5 className="text-base font-semibold mb-2 text-gray-900">
                      {option.title}
                    </h5>
                    
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="p-6">
              <div className="space-y-4">
                <button
                  onClick={handleSiteRedirect}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Falar com Consultor
                </button>
                
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center animate-subtle-pulse"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-white mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63" />
                  </svg>
                  Falar no WhatsApp
                </button>
              </div>

              {/* Grupo Exclusivo de Associados */}
              <div className="mt-6">
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 md:p-6 border border-green-200">
                    <div className="flex items-center justify-center mb-3">
                      <svg className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63" />
                      </svg>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900">Grupo Exclusivo de Associados</h4>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 mb-4">
                      Comunidade ativa 24h por dia!
                    </p>
                  </div>
                  
                  <p className="text-base md:text-lg text-gray-600 mt-4">
                    Quando você se torna um associado, você pode ingressa em nosso grupo da empresa onde os associados troca experiências com outros associados e recebe suporte 24h por dia. Veja alguns depoimentos la de nosso grupo:
                  </p>
                </div>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 }
                  }}
                  loop={true}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  }}
                  navigation={true}
                  pagination={{ 
                    clickable: true,
                    dynamicBullets: true
                  }}
                  className="mb-6"
                >
                  {[
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-31-50.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-31-56.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-00.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-05.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-10.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-15.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-20.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-24.jpg',
                    'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/grupodowhatsap//photo_2025-07-31_05-32-28.jpg'
                  ].map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                        <div className="w-full aspect-square overflow-hidden rounded-lg mb-2 md:mb-3">
                          <img
                            src={imageUrl}
                            alt={`Depoimento do grupo WhatsApp ${index + 1}`}
                            className="w-full h-full object-contain bg-gray-50"
                            loading="lazy"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-xs md:text-sm text-gray-600">
                            Depoimento real do nosso grupo
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CadastroModal;