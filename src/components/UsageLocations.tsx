import React from 'react';
import { Smartphone, Wifi, Home } from 'lucide-react';

const UsageLocations: React.FC = () => {
  return (
    <section className="py-6 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg max-w-xl mx-auto text-center border border-gray-200">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">VOCÊ PODE UTILIZAR SEU PLANO EM:</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <div className="flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg bg-blue-600 text-white">
                <Smartphone className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-sm md:text-base">Celulares & Tablets</span>
              </div>
              <div className="flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg bg-blue-600 text-white">
                <Wifi className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-sm md:text-base">Modem Móvel</span>
              </div>
              <div className="flex items-center px-4 md:px-6 py-2 md:py-3 rounded-lg bg-blue-600 text-white">
                <Home className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-sm md:text-base">Modem Externo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsageLocations;
