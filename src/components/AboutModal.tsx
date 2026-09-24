import React from 'react';
import { X, Award, Factory, Sparkles, CheckCircle2, MapPin, Compass } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden my-6 border border-neutral-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-100 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                Atelier Heritage
              </span>
              <span className="text-xs text-neutral-500">Established 2016 · Vietnam</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mt-1">
              About Furnico &amp; B+ Furniture
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Banner Photo */}
          <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm relative">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
              alt="B+ Furniture Atelier Workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-sm font-medium">
                2,000 m² Craft Workshop in Hoc Mon, Ho Chi Minh City
              </p>
            </div>
          </div>

          {/* Philosophy Text */}
          <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
            <p>
              Founded in 2016, <strong>B+ Furniture</strong> is a premier Vietnamese loose furniture design and manufacturing studio specializing in modern upholstered seating, architectural woodwork, and natural stone tables tailored for discerning residential projects.
            </p>
            <p>
              Under our collaborative residential imprint <strong>Furnico</strong>, we translate the essence of quiet luxury into everyday living. Every sofa curve, wood joinery joint, and leather stitch is developed with enduring durability and understated warmth.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <Factory className="w-5 h-5 text-neutral-900 mb-2" />
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">In-House Manufacturing</h4>
              <p className="text-xs text-neutral-500">
                Direct production from raw solid timber, CNC metalwork, to master hand-upholstery under one roof.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <Compass className="w-5 h-5 text-neutral-900 mb-2" />
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Architectural Proportions</h4>
              <p className="text-xs text-neutral-500">
                Calibrated specifically for contemporary villas, penthouses, and residential spaces across Vietnam and Southeast Asia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <Sparkles className="w-5 h-5 text-neutral-900 mb-2" />
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Authentic Materials</h4>
              <p className="text-xs text-neutral-500">
                Sustainably sourced North American oak &amp; walnut, full-grain Italian leather, Belgian linens, and honed travertine.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <Award className="w-5 h-5 text-neutral-900 mb-2" />
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Industry Acclaimed</h4>
              <p className="text-xs text-neutral-500">
                Nominated for Interior of the Year at the prestigious Ashui Awards and trusted by leading interior design studios.
              </p>
            </div>
          </div>

          {/* Location & Contact Info */}
          <div className="p-5 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-400 font-medium">Head Atelier &amp; Factory</p>
              <p className="text-sm font-semibold text-white mt-0.5">
                25/6A Nhi Binh 2, Hoc Mon District, Ho Chi Minh City, Vietnam
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="bg-white text-neutral-900 px-5 py-2 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors shrink-0"
            >
              Book Studio Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
