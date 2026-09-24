import React, { useState } from 'react';
import { X, Trash2, ArrowRight, CheckCircle2, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { CartItem } from '../types/furniture';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, colorName: string) => void;
  onRemoveItem: (productId: string, colorName: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);

  // Form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [projectType, setProjectType] = useState('Private Residential Villa');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const subtotalVND = cart.reduce((sum, item) => sum + item.product.priceVND * item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const orderRef = `BP-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = cart.map(item => `${item.product.name} — ${item.selectedColor.name} × ${item.quantity}`).join('\n');
    const body = `Reference: ${orderRef}\nName: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\nAddress: ${clientAddress}\nProject: ${projectType}\n\n${lines}\n\n${notes}`;
    window.location.href = `mailto:cskh@bplusfurniture.com.vn?subject=${encodeURIComponent('Quotation request ' + orderRef)}&body=${encodeURIComponent(body)}`;
    setSubmittedOrder(orderRef);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Quotation Bag
            </h2>
            <span className="text-xs bg-neutral-100 text-neutral-800 font-semibold px-2.5 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
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

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {submittedOrder ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Quotation Email Prepared
              </h3>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto leading-relaxed">
                Your quotation details are ready. Complete sending in your email app to request a quotation. If it did not open, contact cskh@bplusfurniture.com.vn directly.
              </p>

              <div className="pt-6 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setSubmittedOrder(null);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full bg-neutral-900 text-white text-xs font-semibold py-3 rounded-full hover:bg-black transition-colors"
                >
                  Done &amp; Return to Atelier
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout / Quotation Submission Form */
            <form onSubmit={handleSendQuotation} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Residential Project Details
                </span>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-neutral-600 underline"
                >
                  Back to Bag
                </button>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Project Property Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  <option>Private Residential Villa</option>
                  <option>Luxury Penthouse / Duplex</option>
                  <option>Modern Urban Apartment</option>
                  <option>Townhouse / Shophouse Residence</option>
                  <option>Interior Designer / Architect Spec</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Delivery Address (Vietnam)</label>
                <input
                  type="text"
                  required
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Custom Notes / Specs</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#111111] hover:bg-black text-white text-xs font-semibold py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Continue in Email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-sm">Your quotation bag is currently empty.</p>
              <p className="text-xs text-neutral-400 mt-1">Browse our curated residential pieces to begin.</p>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 relative group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs font-bold text-neutral-900">
                        {formatVND(item.product.priceVND * item.quantity)}
                      </span>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-neutral-200 bg-white rounded-full px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor.name)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-neutral-600 hover:text-neutral-900"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor.name)}
                          className="w-5 h-5 flex items-center justify-center text-xs font-bold text-neutral-600 hover:text-neutral-900"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedColor.name)}
                    aria-label="Remove item"
                    className="absolute top-3 right-3 text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {!submittedOrder && cart.length > 0 && !isCheckingOut && (
          <div className="p-6 border-t border-neutral-200/80 bg-neutral-50/70 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Estimated Subtotal (VND)</span>
                <span className="font-semibold text-neutral-800">{formatVND(subtotalVND)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>International Equivalent</span>
                <span>~${subtotalUSD.toLocaleString()} USD</span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-600 font-medium">
                <span>White-Glove Delivery &amp; Setup</span>
                <span>Complimentary (HCMC &amp; Hanoi)</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-semibold py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Project Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
