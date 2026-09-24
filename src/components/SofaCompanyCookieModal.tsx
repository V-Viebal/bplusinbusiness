import React, { useState, useEffect } from 'react';

export const SofaCompanyCookieModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [statistical, setStatistical] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('sofacompany_cookie_consent');
    if (!consent) {
      // Auto open on first visit
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sofacompany_cookie_consent', 'all');
    setIsOpen(false);
  };

  const handleOnlyNecessary = () => {
    localStorage.setItem('sofacompany_cookie_consent', 'necessary');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#27221e]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-[620px] bg-[#f7f3ec] text-[#27221e] shadow-2xl rounded-2xl overflow-hidden border border-[#ddd6cb] font-['Plus_Jakarta_Sans',sans-serif] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-labelledby="cookie-modal-title"
      >
        {/* Top Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-[#27221e]">B<span className="text-[#88967c]">+</span>IN</span>
            <span className="text-[10px] uppercase font-bold text-[#8c6d48] tracking-widest pl-1">JAPANDI NATURE</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#8c857d] block leading-none">powered by:</span>
            <span className="text-xs font-semibold text-[#27221e]">Cookie Information</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-8 pb-6">
          <h2 id="cookie-modal-title" className="text-3xl font-extrabold tracking-tight text-[#27221e] mb-3">
            To cookie or not to cookie?
          </h2>
          <p className="text-sm text-[#5a534c] leading-relaxed mb-4">
            Like everybody else we use cookies too (uhm, cookies...). We use them to give you a serene, top-notch Japandi experience of our natural collections. Remember, you can change your preferences at all times.
          </p>
          <button 
            type="button" 
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-[#8c6d48] underline hover:text-[#27221e] font-semibold cursor-pointer"
          >
            About cookies
          </button>
        </div>

        {/* Sand Beige Action Box */}
        <div className="bg-[#dfd6cb] px-8 py-6 border-t border-b border-[#cfc4b5]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-3">
            <button
              type="button"
              onClick={handleOnlyNecessary}
              className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-full bg-[#27221e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#88967c] transition-colors text-center cursor-pointer shadow-sm"
            >
              ONLY NECESSARY COOKIES
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-full bg-[#27221e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#88967c] transition-colors text-center cursor-pointer shadow-sm"
            >
              ACCEPTER ALLE COOKIES
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-[#27221e] underline hover:text-[#88967c] font-medium cursor-pointer"
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
          </div>
        </div>

        {/* 4 Category Pill Toggles matching image swatches */}
        <div className="px-8 py-5 bg-[#f7f3ec] grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#e8e2d8]">
          {/* Strictly necessary - Soft Sage Active */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#27221e] font-medium text-center">Strictly necessary</span>
            <div className="w-12 h-6 rounded-full bg-[#88967c] p-0.5 flex items-center cursor-not-allowed">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-6" />
            </div>
          </div>

          {/* Functional */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#27221e] font-medium text-center">Functional</span>
            <button
              type="button"
              onClick={() => setFunctional(!functional)}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                functional ? 'bg-[#88967c]' : 'bg-[#aba49c]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                functional ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Statistical */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#27221e] font-medium text-center">Statistical</span>
            <button
              type="button"
              onClick={() => setStatistical(!statistical)}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                statistical ? 'bg-[#88967c]' : 'bg-[#aba49c]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                statistical ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[#27221e] font-medium text-center">Marketing</span>
            <button
              type="button"
              onClick={() => setMarketing(!marketing)}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center cursor-pointer ${
                marketing ? 'bg-[#88967c]' : 'bg-[#aba49c]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                marketing ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
