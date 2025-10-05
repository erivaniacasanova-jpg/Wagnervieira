import React from 'react';
import { ShoppingBag, Film, Fuel, Stethoscope, Dumbbell, Building } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MembershipBenefitsProps {
  onRedirect: () => void;
}

const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({ onRedirect }) => {
  return (
    <section className="py-8 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section - Imagens responsivas */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl mb-12 md:mb-16">
          {/* Imagem para desktop */}
          <div className="hidden md:block">
            <img
              src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/conputador.jpg"
              alt="Clube de benefícios Federal Associados - Desktop"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Imagem para mobile */}
          <div className="block md:hidden">
            <img
              src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/celular.jpg"
              alt="Clube de benefícios Federal Associados - Mobile"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Como funciona o Clube */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">
            Como funciona o nosso Clube de Benefícios.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Passo 01 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-900">01</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Se torne um associado</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Faça parte do nosso Clube 
                e tenha acesso aos nossos 
                benefícios.
              </p>
            </div>

            {/* Passo 02 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-900">02</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Escolha</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                São centenas de benefícios 
                que você pode escolher e 
                usar quantas vezes quiser.
              </p>
            </div>

            {/* Passo 03 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-900">03</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Apresente-se</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Depois de escolher o 
                benefício que você quer, é 
                só se apresentar no 
                estabelecimento desejado e 
                informar que você e um 
                associado para receber seu 
                desconto especial.
              </p>
            </div>

            {/* Passo 04 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-900">04</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Economize</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Pronto! Você já está 
                economizando. Use 
                quantas vezes quiser e 
                aproveite todos os seus 
                benefícios de ser um de 
                nossos associados.
              </p>
            </div>
          </div>
        </div>

        {/* Grandes marcas com descontos exclusivos */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Veja grandes marcas parceiras da Federal Associados com descontos exclusivos para você que é associado em qualquer lugar do Brasil!
          </h3>
          
          {/* Grid de logos das marcas */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {/* Logos das marcas parceiras */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/1.png"
                alt="Marca parceira 1"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/2.png"
                alt="Marca parceira 2"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/3.jpg"
                alt="Marca parceira 3"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/4.png"
                alt="Marca parceira 4"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/5.png"
                alt="Marca parceira 5"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/6.jpg"
                alt="Marca parceira 6"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/7.png"
                alt="Marca parceira 7"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/8.jpg"
                alt="Marca parceira 8"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/9.jpg"
                alt="Marca parceira 9"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/10.jpg"
                alt="Marca parceira 10"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/11.png"
                alt="Marca parceira 11"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/12.jpg"
                alt="Marca parceira 12"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/13.jpg"
                alt="Marca parceira 13"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/14.jpg"
                alt="Marca parceira 14"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/15.png"
                alt="Marca parceira 15"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/16.jpg"
                alt="Marca parceira 16"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/17.jpg"
                alt="Marca parceira 17"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios/18.png"
                alt="Marca parceira 18"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Descontos imperdíveis para você aproveitar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12 md:mb-16">
          {/* Texto à esquerda */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              São centenas de parceiros com descontos<br />
              imperdíveis para você aproveitar sendo um associado da Federal Associados.
            </h3>
          </div>
          
          {/* Grid de imagens à direita */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Imagem 1 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios%202/1.png"
                alt="Desconto imperdível 1"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            {/* Imagem 2 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios%202/2.png"
                alt="Desconto imperdível 2"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            {/* Imagem 3 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios%202/3.png"
                alt="Desconto imperdível 3"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            {/* Imagem 4 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios%202/4.png"
                alt="Desconto imperdível 4"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
            
            {/* Imagem 5 */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md col-span-2 md:col-span-1">
              <img
                src="https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/beneficios%202/5.png"
                alt="Desconto imperdível 5"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Novo bloco de perfumes */}
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
            <div className="mb-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                navigation={true}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true
                }}
                className="perfume-carousel"
              >
                {[
                  'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/perfumes/1.jpg',
                  'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/perfumes/2.jpg',
                  'https://fznhzqgulsyrjfrzcdqi.supabase.co/storage/v1/object/public/perfumes/3.jpg'
                ].map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-[3/4] overflow-hidden rounded-lg">
                      <img
                        src={imageUrl}
                        alt={`Perfume Federal Cosméticos ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="text-center">
              <p className="text-base md:text-lg font-bold text-gray-900 mb-2">
                Todo associado também tem direito a 1 PERFUME MENSAL GRÁTIS da Federal Cosméticos!
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Isso mesmo: todo mês você recebe um perfume exclusivo, direto da Federal Cosméticos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Estratégico após benefícios exclusivos */}
        <div className="text-center mt-8 md:mt-12">
          <button
            onClick={() => window.open('https://wa.me/5584981321396?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%20da%20Federal%20Associados.%20Gostaria%20de%20saber%20mais%20como%20funciona%20essa%20internet%2C%20como%20funciona%20a%20contrata%C3%A7%C3%A3o.%20Gostaria%20de%20saber%20de%20todos%20os%20detalhes', '_blank')}
            className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 animate-subtle-pulse hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-lg text-lg py-3 px-6 mb-3"
          >
            Quero Todos Esses Benefícios
          </button>
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;