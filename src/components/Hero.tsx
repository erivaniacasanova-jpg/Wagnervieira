import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { ArrowRight, Volume2, Play, Pause, VolumeX, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CustomAudioPlayer from './CustomAudioPlayer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroProps {
  onRedirect: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRedirect }) => {
  const [typedText, setTypedText] = useState('');
  const [showAudioIcon, setShowAudioIcon] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [viewerCount, setViewerCount] = useState(529);
  
  // REFERÊNCIA PARA O VÍDEO PRINCIPAL
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const fullText = "Conheça a Federal Associados: uma associação autorizada com planos de internet ilimitados, sem burocracia, que vai muito além da conexão. Descubra como mais de 100.000 brasileiros estão economizando todo mês. Com internet ILIMITADA de verdade";
  
  // Função para pausar todos os vídeos de depoimentos
  const pauseAllTestimonialVideos = () => {
    const allVideos = document.querySelectorAll('.hero-testimonial-video, .hero-testimonial-video-desktop');
    allVideos.forEach(video => {
      const videoElement = video as HTMLVideoElement;
      if (!videoElement.paused) {
        videoElement.pause();
      }
    });
  };

  // Observer para pausar vídeos quando saem da viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar todos os vídeos de depoimentos após um pequeno delay para garantir que estejam renderizados
    const observeVideos = () => {
      const videos = document.querySelectorAll('.hero-testimonial-video, .hero-testimonial-video-desktop');
      videos.forEach(video => observer.observe(video));
    };

    // Executar após um delay para garantir que os elementos estejam renderizados
    const timeoutId = setTimeout(observeVideos, 1000);

    return () => {
      clearTimeout(timeoutId);
      const videos = document.querySelectorAll('.hero-testimonial-video, .hero-testimonial-video-desktop');
      videos.forEach(video => observer.unobserve(video));
    };
  }, []);

  // Efeito para variar o número de pessoas assistindo
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        // Variação aleatória entre -5 e +5
        const change = Math.floor(Math.random() * 11) - 5;
        const newCount = prev + change;
        
        // Mantém entre 200 e 1000
        if (newCount < 200) return 200 + Math.floor(Math.random() * 50);
        if (newCount > 1000) return 950 + Math.floor(Math.random() * 50);
        
        return newCount;
      });
    }, 2000 + Math.random() * 3000); // Varia entre 2-5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingDelay = 30; // Reduzido para ser mais rápido
    
    const typeNextCharacter = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextCharacter, typingDelay);
      }
    };

    setTimeout(typeNextCharacter, 500); // Reduzido delay inicial de 1000ms para 500ms

    return () => {
      currentIndex = fullText.length;
    };
  }, []);

  // OBSERVER PARA PARAR VÍDEO QUANDO SAI DA VIEWPORT
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Parar o vídeo quando sai da viewport
            const video = videoRef.current;
            
            if (video && !video.paused) {
              video.pause();
            }
            
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Configuração do vídeo principal
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      video.muted = true;
      video.volume = 0.8;
      setIsMuted(true);
      setVideoError(false);
      
      // Tentar autoplay após carregar
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    };

    const handleError = () => {
      console.error('Erro ao carregar vídeo');
      setVideoError(true);
      setShowVideo(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      video.currentTime = 0;
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    video.muted = true;
    video.volume = 0.8;
    video.preload = 'metadata';
    video.playsInline = true;
    video.loop = true;

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVideoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const video = videoRef.current;
    if (!video) return;

    try {
      if (showAudioIcon || isMuted) {
        // Primeira vez - ativar som e reiniciar
        video.currentTime = 0;
        video.muted = false;
        setIsMuted(false);
        setShowAudioIcon(false);
        
        await video.play();
        setIsPlaying(true);
      } else {
        // Já tem som - toggle play/pause
        if (video.paused || video.ended) {
          if (video.ended) {
            video.currentTime = 0;
          }
          await video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error('Erro ao controlar vídeo:', error);
      
      try {
        video.muted = true;
        setIsMuted(true);
        video.currentTime = 0;
        await video.play();
        setIsPlaying(true);
      } catch (fallbackError) {
        console.error('Erro no fallback:', fallbackError);
        setVideoError(true);
        setShowVideo(false);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-gray-900 pt-4"
    >
      <div className="container mx-auto px-4 pt-2 pb-2 md:pt-4 md:pb-8">
        {/* Título principal */}

        {/* Botões */}
        <div className="text-center mb-1 md:mb-4">
          {/* CARD DE BENEFÍCIOS - MOBILE ONLY */}
          <div className="mt-1 md:hidden">
            <div className="p-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Sua internet não tá durando o mês todo? <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">PARE DE JOGAR O SEU DINHEIRO NO LIXO</span>. E comece a economizar mais de 70% com a sua internet, vem você também para a
              </h2>
              
              {/* Nova imagem centralizada abaixo do título - MOBILE ONLY */}
              <div className="mb-6 text-center">
                <div className="max-w-xs mx-auto">
                  <img
                    src="/images/imagem.jpg"
                    alt="Homem com celular Federal Associados"
                    className="w-full h-auto rounded-xl shadow-lg bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Audio Player abaixo da imagem - MOBILE ONLY */}
              <div className="mb-6">
                <CustomAudioPlayer audioUrl="/audio/PLANO-R-6990-3 (1).mp3" />
              </div>

              {/* Novo título centralizado em negrito após o áudio */}
              <div className="mb-6 text-center">
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full filter blur-2xl opacity-20 -z-10"></div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-3">
                    Aqui você se juntará aos mais de
                  </p>

                  <div className="mb-3">
                    <span className="text-6xl font-black text-blue-600 tracking-tight block leading-none">
                      100.000
                    </span>
                    <span className="text-xl font-bold text-gray-800 mt-2 block">
                      brasileiros
                    </span>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    que têm um plano de internet móvel <span className="font-bold text-gray-900">realmente ilimitado</span>, tanto para <span className="font-semibold text-gray-800">área urbana como rural</span>.
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-3 flex-wrap">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-blue-100">
                      <span className="text-sm font-semibold text-blue-600">Chip Físico</span>
                    </div>
                    <div className="text-blue-400 font-bold">ou</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-blue-100">
                      <span className="text-sm font-semibold text-blue-600">Chip Virtual</span>
                    </div>
                  </div>

                  <p className="text-base font-bold text-red-600 bg-red-50 inline-block px-4 py-2 rounded-lg">
                    Chega de sofrer com internet ruim
                  </p>
                </div>
              </div>

              {/* Seção de Depoimentos movida para cá */}
              <div className="mt-6 mb-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium mb-2">
                    <Star className="h-4 w-4 mr-1" /> DEPOIMENTOS
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">De alguns dos nossos Associados</h2>
                  <p className="text-base text-gray-600 mb-4">
                    Veja o que dizem as pessoas que já fazem parte da nossa família Federal Associados.
                  </p>
                </div>

                {/* PRIMEIRO CARROSSEL DE VÍDEOS - movido de baixo */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    loopedSlides={5}
                    centeredSlides={false}
                    navigation={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                    onSlideChange={pauseAllTestimonialVideos}
                    className="mb-6 testimonials-carousel"
                  >
                    {[
                      '/testimonials/2 copy copy.mp4',
                      '/testimonials/3.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos/video_2025-09-11_05-31-35.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos/video_2025-09-11_05-31-30.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_05-55-55.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_05-56-02.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_06-00-38.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/video_2025-09-06_09-33-37.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/1.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/2.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/3.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/4.mp4'
                    ].map((videoUrl, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                          <video
                            className="absolute inset-0 w-full h-full object-contain bg-black hero-testimonial-video"
                            preload="auto"
                            playsInline
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            src={videoUrl}
                            onError={(e) => {
                              const video = e.currentTarget;
                              setTimeout(() => {
                                video.load();
                              }, 1000);
                            }}
                            onPlay={(e) => {
                              const allVideos = document.querySelectorAll('.hero-testimonial-video');
                              allVideos.forEach(video => {
                                if (video !== e.currentTarget && !video.paused) {
                                  (video as HTMLVideoElement).pause();
                                }
                              });
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
                              `}
                            </style>
                          </video>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Carrossel de Imagens */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
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
                  >
                    {[
                      '/testimonials/photo_2025-06-12_05-31-05.jpg',
                      '/testimonials/photo_2025-06-12_05-31-11.jpg',
                      '/testimonials/photo_2025-06-12_05-31-16.jpg',
                      '/testimonials/photo_2025-06-12_05-31-21.jpg',
                      '/testimonials/photo_2025-06-12_05-31-24.jpg'
                    ].map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                          <div className="flex flex-col items-center">
                            <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
                              <img
                                src={image}
                                alt={`Depoimento ${index + 1}`}
                                className="w-full h-full object-contain bg-gray-50"
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* SEGUNDO CARROSSEL DE VÍDEOS - movido do final */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}
                    slidesPerView={1}
                    loop={false}
                    navigation={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                    onSlideChange={pauseAllTestimonialVideos}
                    className="testimonials-carousel"
                  >
                    {[
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//2.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//3.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//4.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//5.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/1.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//1.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/2.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/4.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/5.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/7.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//15.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//17.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//21.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//20.mp4'
                    ].map((videoUrl, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                          <video
                            className="absolute inset-0 w-full h-full object-contain bg-black hero-testimonial-video"
                            preload="metadata"
                            playsInline
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            src={videoUrl}
                            onPlay={(e) => {
                              const allVideos = document.querySelectorAll('video');
                              allVideos.forEach(video => {
                                if (video !== e.currentTarget && !video.paused) {
                                  video.pause();
                                }
                              });
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
                              `}
                            </style>
                          </video>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Contador de Associados */}
                <div className="text-center mb-4">
                  <div className="inline-block bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-lg">
                    <p className="text-xl font-bold text-gray-900 mb-1">+ de 100.000 associados satisfeitos</p>
                    <p className="text-sm text-gray-600">
                      Junte-se a milhares de pessoas que já descobriram a liberdade de uma internet sem limites
                    </p>
                  </div>
                </div>

                {/* Botão CTA */}
                <div className="text-center">
                  <button
                    onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-lg py-4 px-6"
                  >
                    Quero Fazer Parte Também
                  </button>
                </div>
              </div>

              <div className="mb-4 text-gray-600 text-left">
                <p className="text-lg mb-4">Quantas vezes você já passou por esse momento humilhante de tentar pagar uma conta, pedir um carro ou mandar aquela mensagem extremamente importante… e a internet simplesmente parou, te deixando na mão mais uma vez?</p>
                
                <p className="text-lg mb-4 font-bold">Eu sei o quanto isso é constrangedor. A gente fica sem saber o que fazer, de tanta vergonha e raiva na hora. Mas não deveria ser assim. Você merece mais. Você merece ter uma internet de verdade.</p>
                
                <p className="text-lg mb-4">Você está cansado de passar por essas situações vergonhosas? Cansado de depender do Wi-Fi dos outros ao sair de casa?</p>
                
                <div className="mb-4">
                  <button
                    onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-base py-3 px-6"
                  >
                    Sim, estou cansado disso
                  </button>
                </div>
                
                <p className="text-lg mb-4">Junte-se aos mais de 100.000 brasileiros que já estão economizando mais de 70% com sua internet todos os meses.</p>
                
                <p className="text-lg font-black">Agora imagine ter internet 4G/5G verdadeiramente ilimitada para navegar o mês inteiro sem preocupações. Aqui na Federal Associados você tem um chip com a melhor conexão 4G/5G do Brasil: Internet rápida, estável e ilimitada de verdade.</p>
              </div>
              
              {/* Imagem e legenda após benefícios - MOBILE */}
              <div className="mb-4">
                <div className="max-w-md mx-auto mb-3">
                  <img
                    src="https://qkbeuebapuqnlpjgcvxb.supabase.co/storage/v1/object/public/imagem/federalassociadosimg2alt.webp"
                    alt="Federal Associados - Internet ilimitada"
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  Ao se associar na Federal Associados, você recebe um chip com benefícios exclusivos que só os nossos associados têm.
                </p>
              </div>

              
              <div className="mt-4">
                <button
                  onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                  className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-base py-3 px-6 button-glow"
                >
                  Quero internet ilimitada <ArrowRight className="ml-2 h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* VERSÃO DESKTOP - IDÊNTICA À MOBILE */}
        <div className="hidden md:block">
          <div className="mt-1">
            <div className="p-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Sua internet não tá durando o mês todo? <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded">PARE DE JOGAR O SEU DINHEIRO NO LIXO</span>. E comece a economizar mais de 70% com a sua internet, vem você também para a
              </h2>

              {/* Nova imagem centralizada abaixo do título - DESKTOP */}
              <div className="mb-6 text-center">
                <div className="max-w-xs mx-auto">
                  <img
                    src="/images/imagem.jpg"
                    alt="Homem com celular Federal Associados"
                    className="w-full h-auto rounded-xl shadow-lg bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Audio Player abaixo da imagem - DESKTOP */}
              <div className="mb-6">
                <CustomAudioPlayer audioUrl="/audio/PLANO-R-6990-3 (1).mp3" />
              </div>

              {/* Novo título centralizado em negrito após o áudio */}
              <div className="mb-6 text-center">
                <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full filter blur-2xl opacity-20 -z-10"></div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-3">
                    Aqui você se juntará aos mais de
                  </p>

                  <div className="mb-3">
                    <span className="text-6xl font-black text-blue-600 tracking-tight block leading-none">
                      100.000
                    </span>
                    <span className="text-xl font-bold text-gray-800 mt-2 block">
                      brasileiros
                    </span>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    que têm um plano de internet móvel <span className="font-bold text-gray-900">realmente ilimitado</span>, tanto para <span className="font-semibold text-gray-800">área urbana como rural</span>.
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-3 flex-wrap">
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-blue-100">
                      <span className="text-sm font-semibold text-blue-600">Chip Físico</span>
                    </div>
                    <div className="text-blue-400 font-bold">ou</div>
                    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-blue-100">
                      <span className="text-sm font-semibold text-blue-600">Chip Virtual</span>
                    </div>
                  </div>

                  <p className="text-base font-bold text-red-600 bg-red-50 inline-block px-4 py-2 rounded-lg">
                    Chega de sofrer com internet ruim
                  </p>
                </div>
              </div>

              {/* Seção de Depoimentos movida para cá */}
              <div className="mt-6 mb-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium mb-2">
                    <Star className="h-4 w-4 mr-1" /> DEPOIMENTOS
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-900">De alguns dos nossos Associados</h2>
                  <p className="text-base text-gray-600 mb-4">
                    Veja o que dizem as pessoas que já fazem parte da nossa família Federal Associados.
                  </p>
                </div>

                {/* PRIMEIRO CARROSSEL DE VÍDEOS - movido de baixo */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    loopedSlides={5}
                    centeredSlides={false}
                    navigation={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                    onSlideChange={pauseAllTestimonialVideos}
                    className="mb-6 testimonials-carousel"
                  >
                    {[
                      '/testimonials/2 copy copy.mp4',
                      '/testimonials/3.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos/video_2025-09-11_05-31-35.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos/video_2025-09-11_05-31-30.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_05-55-55.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_05-56-02.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/videos/video_2025-09-07_06-00-38.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/video_2025-09-06_09-33-37.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/1.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/2.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/3.mp4',
                      'https://luythwgpgfykysnotyfq.supabase.co/storage/v1/object/public/videos/4.mp4'
                    ].map((videoUrl, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                          <video
                            className="absolute inset-0 w-full h-full object-contain bg-black hero-testimonial-video"
                            preload="auto"
                            playsInline
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            src={videoUrl}
                            onError={(e) => {
                              const video = e.currentTarget;
                              setTimeout(() => {
                                video.load();
                              }, 1000);
                            }}
                            onPlay={(e) => {
                              const allVideos = document.querySelectorAll('.hero-testimonial-video');
                              allVideos.forEach(video => {
                                if (video !== e.currentTarget && !video.paused) {
                                  (video as HTMLVideoElement).pause();
                                }
                              });
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
                              `}
                            </style>
                          </video>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Carrossel de Imagens */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
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
                  >
                    {[
                      '/testimonials/photo_2025-06-12_05-31-05.jpg',
                      '/testimonials/photo_2025-06-12_05-31-11.jpg',
                      '/testimonials/photo_2025-06-12_05-31-16.jpg',
                      '/testimonials/photo_2025-06-12_05-31-21.jpg',
                      '/testimonials/photo_2025-06-12_05-31-24.jpg'
                    ].map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                          <div className="flex flex-col items-center">
                            <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
                              <img
                                src={image}
                                alt={`Depoimento ${index + 1}`}
                                className="w-full h-full object-contain bg-gray-50"
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* SEGUNDO CARROSSEL DE VÍDEOS - movido do final */}
                <div className="mb-6 max-w-md mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}
                    slidesPerView={1}
                    loop={false}
                    navigation={true}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                    onSlideChange={pauseAllTestimonialVideos}
                    className="testimonials-carousel"
                  >
                    {[
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//2.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//3.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//4.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//5.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/1.mp4',
                      'https://zqkbaizdfmeheownhjeg.supabase.co/storage/v1/object/public/videos//1.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/2.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/4.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/5.mp4',
                      'https://njmrvklwyzbofuhqrpbt.supabase.co/storage/v1/object/public/depoimentos/7.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//15.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//17.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//21.mp4',
                      'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/depoimentos//20.mp4'
                    ].map((videoUrl, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                          <video
                            className="absolute inset-0 w-full h-full object-contain bg-black hero-testimonial-video"
                            preload="metadata"
                            playsInline
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            src={videoUrl}
                            onPlay={(e) => {
                              const allVideos = document.querySelectorAll('video');
                              allVideos.forEach(video => {
                                if (video !== e.currentTarget && !video.paused) {
                                  video.pause();
                                }
                              });
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
                              `}
                            </style>
                          </video>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Contador de Associados */}
                <div className="text-center mb-4">
                  <div className="inline-block bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-lg">
                    <p className="text-xl font-bold text-gray-900 mb-1">+ de 100.000 associados satisfeitos</p>
                    <p className="text-sm text-gray-600">
                      Junte-se a milhares de pessoas que já descobriram a liberdade de uma internet sem limites
                    </p>
                  </div>
                </div>

                {/* Botão CTA */}
                <div className="text-center">
                  <button
                    onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-lg py-4 px-6"
                  >
                    Quero Fazer Parte Também
                  </button>
                </div>
              </div>

              <div className="mb-4 text-gray-600 text-left">
                <p className="text-lg mb-4">Quantas vezes você já passou por esse momento humilhante de tentar pagar uma conta, pedir um carro ou mandar aquela mensagem extremamente importante… e a internet simplesmente parou, te deixando na mão mais uma vez?</p>

                <p className="text-lg mb-4 font-bold">Eu sei o quanto isso é constrangedor. A gente fica sem saber o que fazer, de tanta vergonha e raiva na hora. Mas não deveria ser assim. Você merece mais. Você merece ter uma internet de verdade.</p>

                <p className="text-lg mb-4">Você está cansado de passar por essas situações vergonhosas? Cansado de depender do Wi-Fi dos outros ao sair de casa?</p>

                <div className="mb-4">
                  <button
                    onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                    className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-base py-3 px-6"
                  >
                    Sim, estou cansado disso
                  </button>
                </div>

                <p className="text-lg mb-4">Junte-se aos mais de 100.000 brasileiros que já estão economizando mais de 70% com sua internet todos os meses.</p>

                <p className="text-lg font-black">Agora imagine ter internet 4G/5G verdadeiramente ilimitada para navegar o mês inteiro sem preocupações. Aqui na Federal Associados você tem um chip com a melhor conexão 4G/5G do Brasil: Internet rápida, estável e ilimitada de verdade.</p>
              </div>

              {/* Imagem e legenda após benefícios - DESKTOP */}
              <div className="mb-4">
                <div className="max-w-md mx-auto mb-3">
                  <img
                    src="https://qkbeuebapuqnlpjgcvxb.supabase.co/storage/v1/object/public/imagem/federalassociadosimg2alt.webp"
                    alt="Federal Associados - Internet ilimitada"
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  Ao se associar na Federal Associados, você recebe um chip com benefícios exclusivos que só os nossos associados têm.
                </p>
              </div>


              <div className="mt-4">
                <button
                  onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
                  className="w-full inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-base py-3 px-6 button-glow"
                >
                  Quero internet ilimitada <ArrowRight className="ml-2 h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;