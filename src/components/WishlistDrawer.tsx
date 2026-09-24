import React from 'react';
import { X, Heart, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types/furniture';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-neutral-900 fill-neutral-900" />
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Saved Favorites
            </h2>
            <span className="text-xs bg-neutral-100 text-neutral-800 font-semibold px-2 py-0.5 rounded-full">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">No saved items yet.</p>
              <p className="text-xs text-neutral-400 mt-1">Tap the heart on any piece to curate your residential collection.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                  className="flex gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 relative group cursor-pointer hover:border-neutral-300 transition-all"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[10px] uppercase font-semibold text-neutral-400">
                      {product.categoryLabel}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-neutral-900 mt-1">
                      {formatVND(product.priceVND)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="px-3 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-full hover:bg-black transition-colors flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveWishlist(product.id);
                    }}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50/70 text-xs text-neutral-500 text-center">
          Items in your favorites can be exported into an architectural lookbook PDF on demand.
        </div>
      </div>
    </div>
  );
};
