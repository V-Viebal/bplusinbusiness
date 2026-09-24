import React, { useState, useEffect } from 'react';
import { Maximize2, Pause, Play, Volume2, VolumeX, Eye } from 'lucide-react';
import { Product } from '../types/furniture';

interface ComfortLivingSectionProps {
  onSelectProduct: (product: Product) => void;
  caramelProduct: Product;
}

export const ComfortLivingSection: React.FC<ComfortLivingSectionProps> = ({
  onSelectProduct,
  caramelProduct,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ambientZoom, setAmbientZoom] = useState(1);

  // Gentle ambient slow zoom simulation when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAmbientZoom((prev) => (prev >= 1.05 ? 1 : prev + 0.005));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      
      {/* Top Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between mb-12 sm:mb-16">
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-[#111111]">
            Add Comfort To Your Living
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 font-normal">
            Design your space for comfort. It&apos;s our inspiration and your everyday joy.
          </p>
        </div>

        <div className="lg:col-span-6 lg:text-right">
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg lg:ml-auto leading-relaxed">
            Everyone has an innate desire to shape and arrange their surroundings in a way that brings comfort,{' '}
            <strong className="text-neutral-900 font-semibold">
              beauty, and a sense of belonging.
            </strong>{' '}
            That timeless need is what inspires every piece we create.
          </p>
        </div>
      </div>

      {/* 4 Key Stat Metrics - Matching UI Screenshot 3 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-neutral-100">
        <div>
          <div className="text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#111111] tracking-tight mb-2">
            900+
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-snug">
            Products that we have created
          </p>
        </div>

        <div>
          <div className="text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#111111] tracking-tight mb-2">
            21K+
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-snug">
            Happy &amp; loyal customers
          </p>
        </div>

        <div>
          <div className="text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#111111] tracking-tight mb-2">
            95%
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-snug">
            Customers purchase &amp; return again
          </p>
        </div>

        <div>
          <div className="text-4xl sm:text-5xl md:text-[56px] font-semibold text-[#111111] tracking-tight mb-2">
            400+
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-snug">
            Unique Design we crafted
          </p>
        </div>
      </div>

      {/* Large Showcase Media Card with Tan Leather Armchair & Player Controls */}
      <div className="mt-12 sm:mt-16">
        <div
          className={`relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-neutral-100 shadow-xl transition-all duration-700 ${
            isFullscreen ? 'fixed inset-4 z-50 rounded-3xl' : 'aspect-[16/9] max-h-[640px]'
          }`}
        >
          {/* Main Visual: Tan Armchair with Side Table and Architectural Shadow */}
          <div className="w-full h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1580481077190-7361356a15f1?auto=format&fit=crop&w=1600&q=85"
              alt="Como Saddle Leather Armchair and Minimalist Side Table"
              style={{ transform: `scale(${ambientZoom})` }}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
            />
          </div>

          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* Quick Product Tag Button on Top Left */}
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => onSelectProduct(caramelProduct)}
              className="group bg-white/80 hover:bg-white backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-neutral-900 shadow-md flex items-center gap-2 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-700 group-hover:scale-110 transition-transform" />
              <span>Como Saddle Leather Armchair</span>
              <span className="text-neutral-400 font-normal">| 14.200.000₫</span>
            </button>
          </div>

          {/* Floating Video/Media Control Bar at Bottom Center - Exactly as in UI */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-6 text-white shadow-2xl">
              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                aria-label="Toggle Fullscreen"
                className="hover:text-amber-200 transition-colors focus:outline-none"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Showcase'}
              >
                <Maximize2 className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Ambient' : 'Play Ambient'}
                className="hover:text-amber-200 transition-colors focus:outline-none flex items-center justify-center"
                title={isPlaying ? 'Pause Motion' : 'Play Motion'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 stroke-[2.2]" />
                ) : (
                  <Play className="w-4 h-4 stroke-[2.2] fill-current" />
                )}
              </button>

              {/* Sound Toggle Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="hover:text-amber-200 transition-colors focus:outline-none"
                title={isMuted ? 'Ambient Audio Off' : 'Ambient Audio On'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 stroke-[2.2]" />
                ) : (
                  <Volume2 className="w-4 h-4 stroke-[2.2]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
