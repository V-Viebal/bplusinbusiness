import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Heart, ShoppingBag, Menu, X, ArrowUpRight, Search, SlidersHorizontal, Sparkles, Check, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';
import { CartItem, Product } from '../types/furniture';
import { residentialProducts } from '../data/furnitureData';

interface NavbarProps {
  cart: CartItem[];
  wishlistIds: string[];
  activeNav: string;
  setActiveNav: (nav: string) => void;
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCatalogue: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  wishlistIds,
  activeNav,
  setActiveNav,
  products = residentialProducts,
  onSelectProduct,
  onOpenCart,
  onOpenWishlist,
  onOpenCatalogue,
  onOpenAbout,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Extract unique categories from residentialProducts
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.categoryLabel) cats.add(p.categoryLabel);
    });
    return Array.from(cats);
  }, [products]);

  // Filter residentialProducts array by name, category, collection, or room
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q && selectedCategory === 'all') return [];

    return products.filter((product) => {
      // Name filter
      const matchesName = product.name.toLowerCase().includes(q) ||
        (product.vietnameseName && product.vietnameseName.toLowerCase().includes(q));

      // Category filter
      const matchesCategoryText = product.category.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q);

      // Collection & Room filter
      const matchesOther = product.collection.toLowerCase().includes(q) ||
        product.room.toLowerCase().includes(q);

      const matchesQuery = !q || matchesName || matchesCategoryText || matchesOther;

      // Category tab filter
      const matchesCategoryTab = selectedCategory === 'all' || product.categoryLabel === selectedCategory;

      return matchesQuery && matchesCategoryTab;
    });
  }, [searchQuery, selectedCategory, products]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: '/' or 'Cmd+K' / 'Ctrl+K' focuses the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') ||
          ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    setMobileMenuOpen(false);
    if (nav === 'Catalogue') onOpenCatalogue();
    if (nav === 'About Us') onOpenAbout();
    if (nav === 'Contact') onOpenContact();
  };

  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
    setIsSearchOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#e8e2d8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo - B+IN Japandi Nature */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('Home')}
              className="group text-left focus:outline-none flex items-center gap-2"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-[28px] font-black tracking-[-0.04em] text-[#27221e] group-hover:opacity-85 transition-opacity">
                  B<span className="text-[#88967c]">+</span>IN
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#8c6d48] bg-[#dfd6cb]/60 px-1.5 py-0.5 rounded-full border border-[#cfc4b5]">
                  JAPANDI
                </span>
              </div>
            </button>
          </div>

          {/* SEARCH BAR (Center-Left) - Filters residentialProducts by name or category */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search furniture by name or category..."
                aria-label="Search residential products"
                className="w-full pl-9 pr-14 py-2 text-xs sm:text-sm bg-[#eee8de]/70 hover:bg-[#eee8de] focus:bg-white text-[#27221e] placeholder-[#8c857d] rounded-full border border-[#ddd6cb] focus:border-[#88967c] focus:outline-none focus:ring-2 focus:ring-[#88967c]/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8c857d] absolute left-3 pointer-events-none" />
              
              <div className="absolute right-2.5 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 text-[#8c857d] hover:text-[#27221e] rounded-full hover:bg-[#dfd6cb]/60 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-semibold text-[#8c857d] bg-[#dfd6cb]/60 border border-[#cfc4b5] rounded shadow-xs">
                    /
                  </kbd>
                )}
                
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:flex p-1 text-[#8c857d] hover:text-[#88967c] rounded-full hover:bg-[#dfd6cb]/60 transition-colors"
                  title="Open Search Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* LIVE SEARCH RESULTS DROPDOWN */}
            {isSearchOpen && (searchQuery.trim().length > 0 || selectedCategory !== 'all') && (
              <div className="absolute left-0 right-0 mt-2 bg-[#fbf9f6] border border-[#ddd6cb] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 max-h-[480px] flex flex-col">
                {/* Dropdown Header: Category Filter Tabs */}
                <div className="p-3 bg-[#dfd6cb]/40 border-b border-[#ddd6cb] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 flex-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-[#27221e] text-white shadow-xs'
                          : 'bg-[#eee8de] text-[#5a534c] hover:bg-[#dfd6cb]'
                      }`}
                    >
                      All ({products.length})
                    </button>
                    {availableCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-[#88967c] text-white shadow-xs'
                            : 'bg-[#eee8de] text-[#5a534c] hover:bg-[#dfd6cb]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8c6d48] hover:text-[#27221e] shrink-0 pl-1"
                  >
                    <span>Modal</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto max-h-[340px] divide-y divide-[#eee8de]">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="p-3 hover:bg-[#eee8de]/60 cursor-pointer transition-colors flex items-center gap-3.5 group"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e8e2d8] shrink-0 border border-[#ddd6cb]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#88967c] bg-[#88967c]/10 px-2 py-0.5 rounded-full border border-[#88967c]/20">
                              {product.categoryLabel}
                            </span>
                            {product.room && (
                              <span className="text-[10px] text-[#8c857d] hidden sm:inline">
                                • {product.room}
                              </span>
                            )}
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-[#27221e] truncate group-hover:text-[#88967c] transition-colors">
                            {product.name}
                          </h4>

                          {product.vietnameseName && (
                            <p className="text-[11px] text-[#736c64] truncate">
                              {product.vietnameseName}
                            </p>
                          )}
                        </div>

                        {/* Price & Action */}
                        <div className="text-right shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-[#27221e] block">
                            ${product.priceUSD.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8c6d48] font-medium block">
                            {(product.priceVND / 1000000).toFixed(1)}M VND
                          </span>
                        </div>

                        <ChevronRight className="w-4 h-4 text-[#8c857d] group-hover:text-[#88967c] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-10 h-10 rounded-full bg-[#dfd6cb]/60 flex items-center justify-center mx-auto mb-2.5 text-[#8c857d]">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold text-[#27221e] mb-1">
                        No furniture found
                      </p>
                      <p className="text-xs text-[#736c64] max-w-xs mx-auto mb-4">
                        We couldn't find any pieces matching "{searchQuery}" in category "{selectedCategory}".
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        <span className="text-[11px] text-[#8c857d] mr-1">Suggestions:</span>
                        {['Sofa', 'Table', 'Armchair', 'Oak', 'Bouclé'].map((hint) => (
                          <button
                            key={hint}
                            type="button"
                            onClick={() => {
                              setSearchQuery(hint);
                              setSelectedCategory('all');
                              searchInputRef.current?.focus();
                            }}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#eee8de] text-[#27221e] hover:bg-[#88967c] hover:text-white transition-colors"
                          >
                            {hint}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown Footer */}
                <div className="p-2.5 bg-[#dfd6cb]/30 border-t border-[#ddd6cb] flex items-center justify-between text-[11px] text-[#8c857d]">
                  <span>
                    Showing {filteredProducts.length} of {products.length} residential items
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      onOpenCatalogue();
                    }}
                    className="font-bold text-[#27221e] hover:text-[#88967c] flex items-center gap-1 transition-colors"
                  >
                    <span>View full catalog</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Center Pill Navigation Capsule */}
          <nav className="hidden lg:flex items-center bg-[#eee8de]/80 border border-[#ddd6cb] rounded-full px-3 py-1 shadow-inner">
            <button
              onClick={() => handleNavClick('Home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeNav === 'Home'
                  ? 'bg-[#27221e] text-white shadow-xs'
                  : 'text-[#5a534c] hover:text-[#27221e]'
              }`}
            >
              {activeNav === 'Home' && <span className="w-1.5 h-1.5 rounded-full bg-[#88967c] animate-pulse" />}
              Home
            </button>

            <button
              onClick={() => handleNavClick('Catalogue')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeNav === 'Catalogue'
                  ? 'bg-[#27221e] text-white shadow-xs'
                  : 'text-[#5a534c] hover:text-[#27221e]'
              }`}
            >
              Catalogue
            </button>

            <button
              onClick={() => handleNavClick('About Us')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeNav === 'About Us'
                  ? 'bg-[#27221e] text-white shadow-xs'
                  : 'text-[#5a534c] hover:text-[#27221e]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('Contact')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeNav === 'Contact'
                  ? 'bg-[#27221e] text-white shadow-xs'
                  : 'text-[#5a534c] hover:text-[#27221e]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Utility: Wishlist, Cart with badge, and Profile */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full border border-[#ddd6cb] bg-white hover:bg-[#eee8de] flex items-center justify-center text-[#27221e] hover:text-[#88967c] transition-colors relative"
            >
              <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'fill-[#88967c] text-[#88967c]' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#88967c] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart / Bag Button with badge */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              className="w-10 h-10 rounded-full border border-[#ddd6cb] bg-white hover:bg-[#eee8de] flex items-center justify-center text-[#27221e] hover:text-[#88967c] transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#27221e] text-white text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-[#ddd6cb] bg-white hover:bg-[#eee8de] transition-colors text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Alex Moristar"
                  className="w-7 h-7 rounded-full object-cover border border-[#ddd6cb]"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8c857d] font-semibold leading-none">Hi Alex!</span>
                  <span className="text-xs font-bold text-[#27221e] leading-tight">Alex M.</span>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fbf9f6] rounded-2xl p-3 shadow-xl border border-[#ddd6cb] z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#ddd6cb] mb-2">
                    <p className="text-xs text-[#8c857d] font-medium">Residential Client</p>
                    <p className="text-sm font-semibold text-[#27221e]">artenanedgar@gmail.com</p>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onOpenCart();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#27221e] hover:bg-[#eee8de] rounded-xl flex items-center justify-between"
                    >
                      <span>Active Quotation ({totalCartCount})</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8c857d]" />
                    </button>
                    <button
                      onClick={() => {
                        onOpenCatalogue();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#27221e] hover:bg-[#eee8de] rounded-xl flex items-center justify-between"
                    >
                      <span>Residential Lookbook</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8c857d]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#ddd6cb] bg-white flex items-center justify-center text-[#27221e]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fbf9f6] border-b border-[#ddd6cb] px-6 py-5 shadow-lg space-y-4">
            <div className="flex flex-col gap-2">
              {['Home', 'Catalogue', 'About Us', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-left py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider ${
                    activeNav === item
                      ? 'bg-[#27221e] text-white'
                      : 'text-[#27221e] hover:bg-[#eee8de]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#ddd6cb] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Alex Moristar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-[#8c857d] font-medium">Logged in</p>
                  <p className="text-sm font-semibold text-[#27221e]">Alex Moristar</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="text-xs font-bold px-4 py-2 bg-[#27221e] text-white rounded-full"
              >
                Bag ({totalCartCount})
              </button>
            </div>
          </div>
        )}
      </header>

      {/* FULL SEARCH MODAL (Satisfies "displaying results in a dropdown or modal") */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#27221e]/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-[#fbf9f6] border border-[#ddd6cb] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header with Search Input */}
            <div className="p-4 sm:p-6 bg-[#eee8de]/50 border-b border-[#ddd6cb] flex items-center gap-3">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-[#88967c] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter residentialProducts by name or category (e.g. Sofa, Table, Loft)..."
                  className="w-full pl-12 pr-10 py-3.5 bg-white text-[#27221e] placeholder-[#8c857d] text-sm sm:text-base font-medium rounded-full border border-[#ddd6cb] focus:border-[#88967c] focus:outline-none focus:ring-4 focus:ring-[#88967c]/15 shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-[#8c857d] hover:text-[#27221e] absolute right-3.5 rounded-full hover:bg-[#dfd6cb]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-3 text-[#27221e] hover:bg-[#dfd6cb] rounded-full transition-colors shrink-0"
                aria-label="Close search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills in Modal */}
            <div className="px-6 py-3 bg-[#dfd6cb]/30 border-b border-[#ddd6cb] flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-[#8c857d] mr-1 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#88967c]" />
                Filter:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#27221e] text-white shadow-xs'
                    : 'bg-[#eee8de] text-[#5a534c] hover:bg-[#dfd6cb]'
                }`}
              >
                All Products ({products.length})
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#88967c] text-white shadow-xs'
                      : 'bg-[#eee8de] text-[#5a534c] hover:bg-[#dfd6cb]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results Grid / List */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="p-3.5 bg-white border border-[#ddd6cb] rounded-2xl hover:border-[#88967c] hover:shadow-lg transition-all cursor-pointer flex gap-3.5 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#eee8de] shrink-0 border border-[#e8e2d8]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#88967c] bg-[#88967c]/10 px-2 py-0.5 rounded-full">
                            {product.categoryLabel}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#27221e] group-hover:text-[#88967c] transition-colors truncate">
                          {product.name}
                        </h4>
                        {product.vietnameseName && (
                          <p className="text-xs text-[#736c64] truncate">
                            {product.vietnameseName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-black text-[#27221e]">
                          ${product.priceUSD.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-[#88967c] group-hover:underline flex items-center gap-0.5">
                          <span>View piece</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#dfd6cb]/60 flex items-center justify-center mx-auto mb-3 text-[#8c857d]">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#27221e] mb-1">
                    No matching pieces found
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736c64] max-w-md mx-auto">
                    Try refining your search keyword or selecting "All Products" to view all available furniture.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#eee8de]/50 border-t border-[#ddd6cb] flex items-center justify-between text-xs text-[#736c64]">
              <span>
                Matching <strong className="text-[#27221e]">{filteredProducts.length}</strong> items in <code className="text-[#88967c] font-semibold">residentialProducts</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onOpenCatalogue();
                }}
                className="px-4 py-2 rounded-full bg-[#27221e] text-white font-bold hover:bg-[#88967c] transition-colors flex items-center gap-1.5"
              >
                <span>Browse Full Lookbook</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
