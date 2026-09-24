/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CuratedCollections } from './components/CuratedCollections';
import { ComfortLivingSection } from './components/ComfortLivingSection';
import { CraftSpacesSection } from './components/CraftSpacesSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CatalogueModal } from './components/CatalogueModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { residentialProducts } from './data/furnitureData';
import { Product, ProductColor, CartItem } from './types/furniture';

export default function App() {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState('Home');

  // Key hero products
  const loftProduct = residentialProducts.find((p) => p.id === 'modern-loft-sofa-set') || residentialProducts[0];
  const megnaProduct = residentialProducts.find((p) => p.id === 'megna-karta-spul') || residentialProducts[1];
  const studyProduct = residentialProducts.find((p) => p.id === 'modern-study-table') || residentialProducts[2];
  const bedsideProduct = residentialProducts.find((p) => p.id === 'aesthetic-bed-side-table') || residentialProducts[3];
  const caramelProduct = residentialProducts.find((p) => p.id === 'caramel-saddle-lounge') || residentialProducts[5];

  // Prepopulate cart with 3 items matching the '3' badge in the UI screenshot!
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: loftProduct,
      quantity: 1,
      selectedColor: loftProduct.colors[0],
    },
    {
      product: megnaProduct,
      quantity: 1,
      selectedColor: megnaProduct.colors[0],
    },
    {
      product: bedsideProduct,
      quantity: 1,
      selectedColor: bedsideProduct.colors[0],
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'nature-loft-sofa',
    'caramel-saddle-lounge',
  ]);

  // Modal / Drawer open states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const context = (document as any).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool = {
      name: 'open_furniture_product',
      description: 'Open the product details for a furniture product ID.',
      inputSchema: { type: 'object', properties: { productId: { type: 'string' } }, required: ['productId'], additionalProperties: false },
      annotations: { readOnlyHint: false },
      async execute(input: unknown) {
        const id = (input as any)?.productId;
        if (typeof id !== 'string') throw new Error('A productId string is required.');
        const product = residentialProducts.find(p => p.id === id);
        if (!product) throw new Error('Product not found.');
        setSelectedProduct(product);
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return { id: product.id, name: product.name, opened: true };
      }
    };
    try { Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch {}
    return () => lifecycle.abort();
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, color?: ProductColor) => {
    const chosenColor = color || product.colors[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === chosenColor.name
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: chosenColor }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number, colorName: string) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId && item.selectedColor.name === colorName ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string, colorName: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId || item.selectedColor.name !== colorName));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const wishlistProducts = residentialProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#111111] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        cart={cart}
        wishlistIds={wishlistIds}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        products={residentialProducts}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCatalogue={() => setIsCatalogueOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section - Matching Screenshot 1 */}
        <HeroSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          loftProduct={loftProduct}
          megnaProduct={megnaProduct}
          studyProduct={studyProduct}
          bedsideProduct={bedsideProduct}
        />

        {/* 2. Curated Collections - Matching Screenshot 2 */}
        <CuratedCollections
          products={residentialProducts}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenCatalogue={() => setIsCatalogueOpen(true)}
        />

        {/* 3. Add Comfort To Your Living - Matching Screenshot 3 */}
        <ComfortLivingSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          caramelProduct={caramelProduct}
        />

        {/* 4. We Craft Spaces & 3 Interactive Cards - Matching Screenshot 4 */}
        <CraftSpacesSection
          onOpenCatalogue={() => setIsCatalogueOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
        />
      </main>

      {/* Minimalist Footer */}
      <Footer
        onOpenCatalogue={() => setIsCatalogueOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Product Quick View / Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
      />

      {/* Full Residential Catalogue Modal */}
      <CatalogueModal
        products={residentialProducts}
        isOpen={isCatalogueOpen}
        onClose={() => {
          setIsCatalogueOpen(false);
          setActiveNav('Home');
        }}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onQuickAddToCart={(product) => handleAddToCart(product, 1)}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
      />

      {/* Quotation / Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      {/* About B+ Furniture Atelier Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => {
          setIsAboutOpen(false);
          setActiveNav('Home');
        }}
        onOpenContact={() => {
          setIsAboutOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* Contact & Support Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          setActiveNav('Home');
        }}
      />

    </div>
  );
}
