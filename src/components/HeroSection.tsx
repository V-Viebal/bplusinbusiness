import React, { useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Product } from '../types/furniture';
import { heroFilterPills } from '../data/furnitureData';

interface HeroSectionProps {
  onSelectProduct: (product: Product) => void;
  loftProduct: Product;
  megnaProduct: Product;
  studyProduct: Product;
  bedsideProduct: Product;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectProduct,
  loftProduct,
  megnaProduct,
  studyProduct,
  bedsideProduct,
}) => {
  const [activePill, setActivePill] = useState<string>('Popular');

  // Let the user toggle pills to preview matching signature pieces
  const getActiveSubcardProduct = () => {
    switch (activePill) {
      case 'Exclusive':
        return studyProduct;
      case 'Hot Picks':
        return bedsideProduct;
      case 'Limited Edition':
        return megnaProduct;
      case 'Popular':
      default:
        return megnaProduct;
    }
  };

  const currentSubProduct = getActiveSubcardProduct();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Hero Card - Warm gray container matching UI screenshot 1 */}
        <div className="lg:col-span-6 bg-[#f4f4f4] rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between transition-all">
          <div>
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[46px] font-normal tracking-[-0.03em] text-[#111111] leading-[1.14] mb-8 sm:mb-10">
              Elevate Your Space with Elegant Simplicity Furniture Design
            </h1>

            {/* Filter Pills Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8 sm:mb-12">
              {heroFilterPills.map((pill) => {
                const isActive = activePill === pill;
                return (
                  <button
                    key={pill}
                    onClick={() => setActivePill(pill)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-sm ring-1 ring-neutral-900'
                        : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-neutral-200/70'
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating White Subcard - Megna Karta Spul / Active Selected Item */}
          <div
            onClick={() => onSelectProduct(currentSubProduct)}
            className="group cursor-pointer bg-white rounded-[26px] p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 justify-between"
          >
            <div className="flex-1 pr-0 sm:pr-2">
              {/* Badge */}
              <div className="inline-block bg-[#f4f4f4] text-neutral-800 text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
                {activePill}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-[22px] font-semibold tracking-[-0.02em] text-[#111111] group-hover:text-neutral-700 transition-colors mb-2">
                {currentSubProduct.name}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-neutral-500 leading-relaxed line-clamp-2 mb-4">
                {currentSubProduct.shortDescription}
              </p>

              {/* Arrow circle button */}
              <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center text-neutral-800 transition-colors">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            {/* Thumbnail Image */}
            <div className="w-full sm:w-44 sm:h-32 h-44 rounded-2xl overflow-hidden shrink-0 bg-neutral-100">
              <img
                src={currentSubProduct.image}
                alt={currentSubProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Hero Card - Modern Loft Sofa set with Frosted Glass Overlay */}
        <div
          onClick={() => onSelectProduct(loftProduct)}
          className="lg:col-span-6 relative rounded-[32px] sm:rounded-[40px] overflow-hidden min-h-[480px] lg:min-h-[580px] group cursor-pointer shadow-sm"
        >
          {/* Main Background Image */}
          <img
            src={loftProduct.image}
            alt={loftProduct.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Subtle Ambient Vignette / Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Frosted Glass Overlay Card at bottom - Exact match to screenshot */}
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 right-5 sm:right-7 bg-neutral-900/40 backdrop-blur-xl border border-white/20 rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 text-white shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                {loftProduct.name}
              </h2>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/90">
                  {loftProduct.rating}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed mb-5 max-w-md">
              {loftProduct.shortDescription}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-white text-neutral-900 px-5 py-2 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-sm"
              >
                View Product
              </button>
              <div className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-sm">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
