import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, Star, Heart, ArrowUpRight, Check, Plus } from 'lucide-react';
import { Product, ProductCategory, RoomType } from '../types/furniture';

interface CatalogueModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const CatalogueModal: React.FC<CatalogueModalProps> = ({
  products,
  isOpen,
  onClose,
  onSelectProduct,
  onQuickAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('All Rooms');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const rooms: RoomType[] = ['All Rooms', 'Living Room', 'Bedroom', 'Study & Office', 'Dining Room', 'Lounge'];

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'cozy-corner-armchairs', label: 'Armchairs & Lounges' },
    { id: 'soft-neutral-sofas', label: 'Sofas' },
    { id: 'coffee-tables', label: 'Coffee & Side Tables' },
    { id: 'minimalist-study-table', label: 'Desks & Study' },
    { id: 'computer-table', label: 'Computer Tables' },
    { id: 'corner', label: 'Beds, Dining & Storage' },
  ];

  // Filtering
  const filtered = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.vietnameseName && item.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoom = selectedRoom === 'All Rooms' || item.room === selectedRoom;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesRoom && matchesCategory;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceVND - b.priceVND;
    if (sortBy === 'price-desc') return b.priceVND - a.priceVND;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default order
  });

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-[#fafafa] rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden my-4 border border-neutral-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-white border-b border-neutral-200/80 px-6 sm:px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                B+ Furniture
              </span>
              <span className="text-xs text-neutral-500">Residential Catalogue</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
              Curated Residential Catalog ({filtered.length} designs)
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white px-6 sm:px-8 py-4 border-b border-neutral-200/60 shrink-0 space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sofas, desks, tables, bouclé, solid oak..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* Room Filter Pills */}
            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoom(room)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedRoom === room
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>

          {/* Categories & Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-1 rounded-full text-xs transition-all ${
                    selectedCategory === cat.id
                      ? 'border border-neutral-900 font-semibold text-neutral-900 bg-neutral-100'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-neutral-200 rounded-lg px-2 py-1 text-xs text-neutral-800 font-medium focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {sorted.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-neutral-500 text-sm">No residential pieces match your filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRoom('All Rooms');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-semibold underline underline-offset-4 text-neutral-900"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((item) => {
                const isWishlisted = wishlistIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="group bg-white rounded-[26px] overflow-hidden border border-neutral-200/70 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Tag */}
                        {item.tag && (
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
                            {item.tag}
                          </div>
                        )}
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(item.id);
                          }}
                          aria-label="Wishlist"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-neutral-700 shadow-sm transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                          <span>{item.categoryLabel}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="font-semibold text-neutral-700">{item.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                          {item.name}
                        </h3>

                        <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed">
                          {item.shortDescription}
                        </p>

                        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-900">
                            {formatVND(item.priceVND)}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {item.dimensions.width}×{item.dimensions.depth}×{item.dimensions.height} cm
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="px-5 pb-5 pt-0 flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className="flex-1 py-2 px-3 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        {addedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </>
                        )}
                      </button>

                      <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700 group-hover:bg-neutral-50 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="bg-neutral-100/80 px-6 py-3 border-t border-neutral-200 text-center text-xs text-neutral-500 shrink-0">
          Crafted to order at B+ Furniture Factory (Hoc Mon, Ho Chi Minh City). Custom dimensions &amp; bespoke textiles available upon project request.
        </div>
      </div>
    </div>
  );
};
