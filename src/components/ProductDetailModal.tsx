import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Truck, Clock, Ruler } from 'lucide-react';
import { Product, ProductColor } from '../types/furniture';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color: ProductColor) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#333' });
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const allImages = [product.image, ...(product.secondaryImages || [])];

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden my-6 border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Gallery Column */}
          <div className="md:col-span-6 bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 shadow-inner mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img ? 'border-neutral-900 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantee Pills */}
            <div className="mt-6 pt-5 border-t border-neutral-200/80 space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>B+ Atelier 3-Year Structural Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>White-Glove Home Delivery &amp; Assembly (Vietnam)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Factory Lead Time: {product.leadTime}</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {product.categoryLabel}
                </span>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500 font-medium">{product.room}</span>
                {product.tag && (
                  <span className="ml-auto text-[11px] font-semibold bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Product Titles */}
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-1">
                {product.name}
              </h2>
              {product.vietnameseName && (
                <p className="text-xs text-neutral-500 mb-3 italic">
                  {product.vietnameseName}
                </p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-800">{product.rating}</span>
                <span className="text-xs text-neutral-400">({product.reviewsCount} residential reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-neutral-100">
                <span className="text-2xl font-semibold text-neutral-900">
                  {formatVND(product.priceVND)}
                </span>
                <span className="text-sm text-neutral-400 font-medium">
                  ~${product.priceUSD} USD
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              {/* Color Finish Picker */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-neutral-900 block mb-2">
                  Finish / Upholstery:{' '}
                  <span className="text-neutral-500 font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dimensions */}
              <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 mb-2">
                  <Ruler className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Technical Dimensions ({product.dimensions.unit})</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-neutral-600">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Width</span>
                    <span className="font-semibold text-neutral-800">{product.dimensions.width} cm</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Depth</span>
                    <span className="font-semibold text-neutral-800">{product.dimensions.depth} cm</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">Height</span>
                    <span className="font-semibold text-neutral-800">{product.dimensions.height} cm</span>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-neutral-900 block mb-2">Crafted with:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-medium"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Add to Bag + Wishlist */}
            <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-neutral-200 rounded-full px-2 py-1.5 bg-neutral-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-sm font-semibold text-neutral-700 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-sm font-semibold text-neutral-700 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Bag • {formatVND(product.priceVND * quantity)}</span>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist"
                className="w-12 h-12 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-700 transition-colors shrink-0"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
