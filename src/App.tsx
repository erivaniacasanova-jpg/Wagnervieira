import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Differentials from './components/Differentials';
import About from './components/About';
import TrustSection from './components/TrustSection';
import WrittenTestimonials from './components/WrittenTestimonials';
import MembershipBenefits from './components/MembershipBenefits';
import ObjectionsSection from './components/ObjectionsSection';
import PBISection from './components/PBISection';
import UsageLocations from './components/UsageLocations';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CadastroModal from './components/CadastroModal';
import FixedCTAButton from './components/FixedCTAButton';

function App() {
  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);

  const handleDirectRedirect = () => {
    setIsCadastroModalOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="font-sans text-gray-900 overflow-x-hidden bg-white min-h-screen">
        {/* Botão Fixo no Topo */}
        <FixedCTAButton />

        {/* 1. HERO - Problema + Agitação */}
        <Hero onRedirect={handleDirectRedirect} />
        
        {/* 2. BENEFITS - Apresenta a solução imediatamente */}
        <Benefits onRedirect={handleDirectRedirect} />
        
        {/* 3. ABOUT - Dá contexto sobre a empresa, cria proximidade e humaniza */}
        <About />
        
        {/* 4. DIFFERENTIALS - Mostra o porquê somos diferentes dos concorrentes */}
        <Differentials onRedirect={handleDirectRedirect} />
        
        {/* 5. TRUST - Elimina as últimas objeções e prepara o terreno para o CTA final */}
        <TrustSection onRedirect={handleDirectRedirect} />
        
        {/* 6. WRITTEN TESTIMONIALS - Prova social concentrada (mais impacto) */}
        <WrittenTestimonials onRedirect={handleDirectRedirect} />
        
        {/* 7. MEMBERSHIP BENEFITS - Valor agregado (sweeteners) */}
        <MembershipBenefits onRedirect={handleDirectRedirect} />
        
        {/* 8. OBJECTIONS - Remove barreiras finais */}
        <ObjectionsSection onRedirect={handleDirectRedirect} />

        {/* 9. USAGE LOCATIONS - Onde usar o plano */}
        <UsageLocations />

        {/* 9.5. PBI SECTION - Programa de Indicação para transformar internet em renda */}
        <PBISection onRedirect={handleDirectRedirect} />

        {/* 10. FAQ - Últimas dúvidas antes da conversão */}
        <FAQ />
        
        {/* 11. FOOTER - Fechamento */}
        <Footer />
        
        {/* Cadastro Modal */}
        <CadastroModal
          isOpen={isCadastroModalOpen}
          onClose={() => setIsCadastroModalOpen(false)}
        />

        {/* WhatsApp Button - sempre visível */}
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;