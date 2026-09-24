import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Send } from 'lucide-react';
import { TeamMember } from '../types/furniture';
import { teamMembers } from '../data/furnitureData';

interface CraftSpacesSectionProps {
  onOpenCatalogue: () => void;
  onOpenContact: () => void;
  onOpenAbout: () => void;
}

export const CraftSpacesSection: React.FC<CraftSpacesSectionProps> = ({
  onOpenCatalogue,
  onOpenContact,
  onOpenAbout,
}) => {
  const [currentDesignerIndex, setCurrentDesignerIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const currentDesigner = teamMembers[currentDesignerIndex] || teamMembers[0];

  const handleNextDesigner = () => {
    setCurrentDesignerIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrevDesigner = () => {
    setCurrentDesignerIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    window.location.href = `mailto:cskh@bplusfurniture.com.vn?subject=Newsletter%20subscription&body=${encodeURIComponent('Please subscribe this email: ' + newsletterEmail)}`;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Vertical Card with Architectural Wood Slats & Explore Collection */}
        <div className="lg:col-span-4 relative rounded-[32px] sm:rounded-[40px] overflow-hidden min-h-[480px] lg:min-h-[640px] group shadow-sm bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85"
            alt="Minimalist Wood Slatted Bench Architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          {/* Top Pill Badge: Explore Collection ↗ */}
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={onOpenCatalogue}
              className="bg-white/90 hover:bg-white backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-900 shadow-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Right Column: Soft off-white Container with 3 Floating Cards */}
        <div className="lg:col-span-8 bg-[#f7f7f7] rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative shadow-sm overflow-hidden">
          
          {/* Subtle botanical shadow texture in background */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill & Headline Area */}
          <div className="text-center relative z-10 max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block px-5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-700 mb-5 shadow-sm">
              Explore More
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-normal tracking-[-0.03em] text-[#111111] leading-[1.2] mb-4">
              We craft spaces where minimalist style meets everyday comfort and modern beauty.
            </h2>

            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              Minimalist living, reimagined through sleek design and refined elegance.
            </p>
          </div>

          {/* 3 Interactive White Floating Cards at Bottom - Exact Layout of UI Screenshot 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 relative z-10">
            
            {/* Card 1: Our Team */}
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col justify-between">
              <div>
                {/* Header Tag with Arrow */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={onOpenAbout}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f7f7f7] hover:bg-neutral-200 text-[11px] font-semibold text-neutral-800 transition-colors"
                  >
                    <span>Our Team</span>
                  </button>
                  <button
                    onClick={onOpenAbout}
                    aria-label="View team"
                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-800 leading-snug mb-5 font-normal">
                  Meet with our <strong className="font-semibold">creative mind</strong> &amp; curates <strong className="font-semibold">dream furniture</strong>
                </p>

                {/* Team Avatars Row */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  {teamMembers.map((member, idx) => {
                    const isSelected = idx === currentDesignerIndex;
                    return (
                      <button
                        key={member.id}
                        onClick={() => setCurrentDesignerIndex(idx)}
                        className={`relative rounded-full transition-all ${
                          isSelected ? 'ring-2 ring-neutral-900 scale-110 z-10' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-center text-neutral-500 font-medium mb-4">
                  {currentDesigner.role.split('&')[0].trim()}
                </p>
              </div>

              {/* Carousel Arrows and Dots */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <button
                  onClick={handlePrevDesigner}
                  aria-label="Previous designer"
                  className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  {teamMembers.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentDesignerIndex ? 'w-4 bg-neutral-900' : 'w-1.5 bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextDesigner}
                  aria-label="Next designer"
                  className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Get Bonus / Newsletter */}
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col justify-between">
              <div>
                {/* Header Tag with Arrow */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f7f7f7] text-[11px] font-semibold text-neutral-800">
                    Get Bonus
                  </span>
                  <span className="text-neutral-400">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </span>
                </div>

                <p className="text-xs sm:text-[13px] text-neutral-800 leading-snug mb-5 font-normal">
                  <strong className="font-semibold">Discover</strong> the latest, modern &amp; minimalist design
                </p>

                <div className="mb-2">
                  <span className="text-xs font-semibold text-neutral-900 block mb-2">
                    Newsletter
                  </span>
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 text-neutral-900 placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      disabled={subscribed}
                      className="w-full bg-[#111111] hover:bg-black text-white text-xs font-semibold py-2 rounded-full transition-colors flex items-center justify-center gap-1.5"
                    >
                      {subscribed ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Complete request in your email app</span>
                        </>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <p className="text-[10px] text-neutral-400 mt-2">
                Receive our curated residential lookbook.
              </p>
            </div>

            {/* Card 3: Chat to Support */}
            <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_6px_25px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col justify-between">
              <div>
                {/* Header Tag with Arrow */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#f7f7f7] hover:bg-neutral-200 text-[11px] font-semibold text-neutral-800 transition-colors"
                  >
                    Chat to Support
                  </button>
                  <button
                    onClick={onOpenContact}
                    aria-label="Contact us"
                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-0.5">
                    Contact with us
                  </h4>
                  <p className="text-xs text-neutral-500">
                    We are here to help you
                  </p>
                </div>

                <div className="mb-5">
                  <a
                    href="mailto:support@furnico.community.com"
                    className="text-xs text-neutral-900 font-medium underline underline-offset-4 hover:text-neutral-600 break-all"
                  >
                    support@furnico.community.com
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Direct Atelier: cskh@bplusfurniture.com.vn
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-neutral-900 block mb-2">
                  Follow us
                </span>
                <div className="flex items-center gap-3 text-xs font-medium text-neutral-600">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    X
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
