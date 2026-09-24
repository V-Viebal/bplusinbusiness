import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    window.location.href = `mailto:cskh@bplusfurniture.com.vn?subject=${encodeURIComponent('Furniture consultation')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl overflow-hidden my-6 border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
              Contact &amp; Support
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mt-1">
              Connect with B+ Atelier
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
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick info bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Hotline</span>
                <a href="tel:+84988089534" className="font-semibold text-neutral-900 hover:underline">
                  +84 988 089 534
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Direct Email</span>
                <a href="mailto:cskh@bplusfurniture.com.vn" className="font-semibold text-neutral-900 hover:underline truncate block">
                  cskh@bplusfurniture...
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[10px]">Production Studio</span>
                <span className="font-medium text-neutral-800 block text-[11px] leading-tight">
                  Hoc Mon, Ho Chi Minh City
                </span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Email draft prepared</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Complete sending in your email app. If it did not open, contact cskh@bplusfurniture.com.vn directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Nguyen"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+84 ..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Inquiry / Consultation Request</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your residential project (dimensions, material preferences, architectural blueprints)..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-black text-white text-xs font-semibold py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue in Email</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
