import React from 'react';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  // Função para pausar todos os vídeos
  const pauseAllVideos = () => {
    const allVideos = document.querySelectorAll('.testimonial-video');
    allVideos.forEach(video => {
      const videoElement = video as HTMLVideoElement;
      if (!videoElement.paused) {
        videoElement.pause();
      }
    });
  };

  // Observer para pausar vídeos quando saem da viewport
  React.useEffect(() => {
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

    // Observar todos os vídeos de depoimentos após um pequeno delay
    const observeVideos = () => {
      const videos = document.querySelectorAll('.testimonial-video');
      videos.forEach(video => observer.observe(video));
    };

    // Executar após um delay para garantir que os elementos estejam renderizados
    const timeoutId = setTimeout(observeVideos, 1000);

    return () => {
      clearTimeout(timeoutId);
      const videos = document.querySelectorAll('.testimonial-video');
      videos.forEach(video => observer.unobserve(video));
    };
  }, []);

  // Usando APENAS as 5 fotos novas que você enviou
  const testimonials = [
    { image: '/testimonials/photo_2025-06-12_05-31-05.jpg' },
    { image: '/testimonials/photo_2025-06-12_05-31-11.jpg' },
    { image: '/testimonials/photo_2025-06-12_05-31-16.jpg' },
    { image: '/testimonials/photo_2025-06-12_05-31-21.jpg' },
    { image: '/testimonials/photo_2025-06-12_05-31-24.jpg' }
  ];

  // Vídeos de depoimentos para o carrossel
  const videoTestimonials = [
    '/testimonials/1.mp4',
    '/testimonials/2 copy.mp4',
    '/testimonials/1 copy copy.mp4'
  ];

  return (
    <section className="py-8 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-1" /> DEPOIMENTOS
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-gray-900">De alguns dos nossos Associados</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8">
            Veja o que dizem as pessoas que já fazem parte da nossa família Federal Associados.
          </p>
        </div>

        {/* Carrossel de Depoimentos em Vídeo - SEM AUTOPLAY E SEM TÍTULO */}
        <div className="mb-8 md:mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.4}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20, centeredSlides: true },
              768: { slidesPerView: 1.6, spaceBetween: 24, centeredSlides: true },
              1024: { slidesPerView: 1.8, spaceBetween: 28, centeredSlides: true },
              1280: { slidesPerView: 2.0, spaceBetween: 32, centeredSlides: true }
            }}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            onSlideChange={pauseAllVideos}
            className="mb-8 testimonials-carousel"
          >
            {videoTestimonials.map((videoUrl, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <video
                    className="absolute inset-0 w-full h-full object-contain testimonial-video bg-black"
                    preload="metadata"
                    playsInline
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    src={videoUrl}
                    onPlay={(e) => {
                      // Quando um vídeo começa a tocar, pausa todos os outros
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

        {/* Carrossel de Imagens de Depoimentos - COM AUTOPLAY CONTÍNUO */}
        <div className="mb-8 md:mb-12">
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
            className="mb-8 md:mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square overflow-hidden rounded-lg mb-2 md:mb-3">
                      <img
                        src={testimonial.image}
                        alt={`Depoimento ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Segundo Carrossel de Depoimentos em Vídeo - COM LOOP INFINITO */}
        <div className="mb-8 md:mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.4}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 20, centeredSlides: true },
              768: { slidesPerView: 1.6, spaceBetween: 24, centeredSlides: true },
              1024: { slidesPerView: 1.8, spaceBetween: 28, centeredSlides: true },
              1280: { slidesPerView: 2.0, spaceBetween: 32, centeredSlides: true }
            }}
            loop={true}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            onSlideChange={pauseAllVideos}
            className="mb-8 testimonials-carousel"
          >
            {videoTestimonials.map((videoUrl, index) => (
              <SwiperSlide key={`second-${index}`}>
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <video
                    className="absolute inset-0 w-full h-full object-contain testimonial-video bg-black"
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

        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-block bg-blue-50 rounded-lg p-4 md:p-6 border border-blue-200 shadow-lg">
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">+ de 100.000 associados satisfeitos</p>
            <p className="text-sm md:text-base text-gray-600">
              Junte-se a milhares de pessoas que já descobriram a liberdade de uma internet sem limites
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;