import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { Product, ProductCategory } from '../types/furniture';
import { categoryFilterTabs } from '../data/furnitureData';

interface CuratedCollectionsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenCatalogue: () => void;
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({
  products,
  onSelectProduct,
  onOpenCatalogue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products according to category
  const filteredProducts = products.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Showcase priority: if filtered, show those, otherwise prioritize the 3 key ones from UI
  const displayProducts =
    selectedCategory === 'all'
      ? products.filter((p) => p.featuredInCurated || ['modern-study-table', 'aesthetic-bed-side-table', 'nature-loft-sofa'].includes(p.id))
      : filteredProducts;

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      
      {/* Top Tag & Headings Grid */}
      <div className="mb-8 sm:mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-600 mb-4 bg-white/60">
          Product Categories
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-[#111111]">
              Curated Collections
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-2 font-normal">
              Discover our minimalist masterpiece
            </p>
          </div>

          <div className="lg:col-span-6 lg:text-right">
            <p className="text-xs sm:text-sm text-neutral-600 max-w-lg lg:ml-auto leading-relaxed">
              Discover thoughtfully selected pieces that blend timeless design with everyday comfort. Each collection is crafted to{' '}
              <strong className="text-neutral-900 font-semibold">
                elevate your space with style and intention.
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Category Filter Pills Bar */}
      <div className="flex items-center gap-3 mb-10 pb-2">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {categoryFilterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-transparent text-neutral-900 border-2 border-neutral-900 font-semibold'
                    : 'bg-white text-neutral-600 border border-neutral-300/80 hover:text-neutral-900 hover:border-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scroll Arrow button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll Categories"
          className="shrink-0 w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-700 transition-colors shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Showcase Product Cards Grid - Matching UI screenshot 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
        {displayProducts.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectProduct(item)}
            className="group relative rounded-[32px] overflow-hidden aspect-[4/5] bg-neutral-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Main Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient for Bottom Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Floating Frosted Glass Bottom Overlay Bar - Exact as in screenshot */}
            <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/40 backdrop-blur-xl border border-white/20 rounded-[22px] p-4 sm:p-5 text-white shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1 shrink-0 text-amber-300">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white/90">
                    {item.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-white text-neutral-900 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-sm"
                >
                  View Product
                </button>
                <div className="w-7 h-7 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xs font-bold hover:bg-neutral-100 transition-colors shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Collection Center Button */}
      <div className="flex justify-center">
        <button
          onClick={onOpenCatalogue}
          className="bg-[#111111] hover:bg-black text-white px-9 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Explore Collection
        </button>
      </div>

    </section>
  );
};
