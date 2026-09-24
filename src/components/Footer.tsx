import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenCatalogue: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCatalogue,
  onOpenAbout,
  onOpenContact,
}) => {
  return (
    <footer className="bg-white border-t border-neutral-200/80 pt-16 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-neutral-100">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-[-0.03em] text-neutral-900">
                Furnico
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                B+
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              Curated residential loose furniture by B+ Furniture Vietnam. Crafted with lasting aesthetic value, well-considered structures, and uncompromising craftsmanship since 2016.
            </p>

            <div className="text-xs text-neutral-400 space-y-1 pt-2">
              <p>Factory: 25/6A Nhi Binh 2, Hoc Mon District, Ho Chi Minh City</p>
              <p>Hotline: +84 988 089 534 · info@bplusfurniture.com.vn</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button onClick={onOpenCatalogue} className="hover:text-neutral-900 transition-colors">
                  Living Room Sofas
                </button>
              </li>
              <li>
                <button onClick={onOpenCatalogue} className="hover:text-neutral-900 transition-colors">
                  Lounge Armchairs
                </button>
              </li>
              <li>
                <button onClick={onOpenCatalogue} className="hover:text-neutral-900 transition-colors">
                  Coffee &amp; Side Tables
                </button>
              </li>
              <li>
                <button onClick={onOpenCatalogue} className="hover:text-neutral-900 transition-colors">
                  Minimalist Desks
                </button>
              </li>
              <li>
                <button onClick={onOpenCatalogue} className="hover:text-neutral-900 transition-colors">
                  Platform Beds
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <button onClick={onOpenAbout} className="hover:text-neutral-900 transition-colors">
                  About Atelier
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-neutral-900 transition-colors">
                  Craftsmanship Pledge
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-neutral-900 transition-colors">
                  Interior Trade Program
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-neutral-900 transition-colors">
                  Visit Workshop
                </button>
              </li>
            </ul>
          </div>

          {/* Factory Accreditation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Residential Quality
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every loose piece is constructed with kiln-dried solid beech or white oak frames, high resilience 45D foams, and European OEKO-TEX textiles.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
              >
                <span>Request 3D CAD &amp; Spec Sheets</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Furnico · B+ Furniture Vietnam. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-600 cursor-pointer">Warranty Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
