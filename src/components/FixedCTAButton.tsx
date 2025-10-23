import React from 'react';

const FixedCTAButton: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
      <a
        href="https://federalassociadoscadastro.shop"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      >
        Quero me associar
      </a>
    </div>
  );
};

export default FixedCTAButton;
