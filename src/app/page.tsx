'use client';

import React, { useState, useEffect } from 'react';
import { Shield, LockKeyhole, Coins, Play } from 'lucide-react';
import Image from 'next/image';

// Types
type Category = 'all' | 'superhero' | 'samurai' | 'cyberpunk' | 'noble' | 'professional';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Constants
const COLORS = {
  reserveBlue: 'rgb(1, 81, 175)',
  darkReserveBlue: 'rgb(0, 61, 132)',
} as const;

const categories: readonly Category[] = [
  'all', 'superhero', 'samurai', 'cyberpunk', 'noble', 'professional'
] as const;

const features: Feature[] = [
  {
    icon: <Shield className="w-12 h-12 text-yellow-400" />,
    title: "Not Your Average Guard Dog",
    description: "While others protect physical assets, RSR Dog stands watch over digital value."
  },
  {
    icon: <LockKeyhole className="w-12 h-12 text-yellow-400" />,
    title: "Always Alert",
    description: "24/7 guardian of the Reserve Protocol. No breaks. No holidays. Just pure dedication."
  },
  {
    icon: <Coins className="w-12 h-12 text-yellow-400" />,
    title: "Breeds Different",
    description: "Part watchdog, part protocol guardian, all business. This isn't your standard security detail."
  }
];

const Logo: React.FC = () => (
  <div className="relative">
    <span className="text-3xl font-bold tracking-tighter text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      RSR<span className="text-yellow-400">.</span>dog
    </span>
  </div>
);

const RSRDogWebsite: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [scrollY, setScrollY] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>): void => {
    console.error('Error loading video:', e);
    setIsVideoLoaded(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.reserveBlue }}>
      {/* Hero Section with Video Background */}
      <header className="relative h-screen border-b border-opacity-20 border-white overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className={`object-cover w-full h-full transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-40' : 'opacity-0'
            }`}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={handleVideoError}
          >
            <source src="/your-video.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b"
            style={{ 
              background: `linear-gradient(
                to bottom,
                ${COLORS.reserveBlue}dd 0%,
                ${COLORS.reserveBlue}aa 40%,
                ${COLORS.reserveBlue}88 100%
              )`
            }}
          />
          
          {/* Blueprint grid */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <div className="h-full w-full"
              style={{
                backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>

        <nav className="relative z-10 container mx-auto px-4 py-6 flex justify-between items-center">
          <Logo />
          <div className="flex gap-6 font-mono">
            <a href="#gallery" className="text-blue-100 hover:text-yellow-400">Gallery</a>
            <a href="#about" className="text-blue-100 hover:text-yellow-400">About</a>
            <a href="#community" className="text-blue-100 hover:text-yellow-400">Community</a>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div 
            className="max-w-2xl"
            style={{ 
              transform: `translateY(${scrollY * -0.1}px)`,
              transition: 'transform 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)'
            }}
          >
            <h1 className="text-7xl font-mono text-white mb-6 flex flex-col">
              <span>Guard</span>
              <span>something<span className="text-yellow-400">...</span></span>
            </h1>
            <p className="text-xl font-mono text-blue-100 mb-8">
              The loyal protector of the Reserve Protocol ecosystem.
            </p>
            <button 
              type="button"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-none font-mono hover:bg-yellow-400 hover:text-blue-900 transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch Story
            </button>
          </div>
        </div>

        {/* Blueprint-style decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-l border-t border-white border-opacity-20" />
        <div className="absolute top-0 left-0 w-1/3 h-1/3 border-r border-b border-white border-opacity-20" />
      </header>

      {/* Gallery Section */}
      <section className="py-24 relative" id="gallery">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-mono text-white text-center mb-12">Gallery</h2>
          
          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 font-mono border-2 ${
                  activeCategory === category 
                    ? 'border-yellow-400 text-yellow-400' 
                    : 'border-blue-300/20 text-blue-100 hover:border-blue-300/40'
                } bg-blue-900/20 backdrop-blur-sm transition-colors`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden border-2 border-blue-300/20 aspect-square bg-blue-900/20"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src="/api/placeholder/400/400" 
                    alt={`RSR Dog ${index + 1}`}
                    className="object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <div className="font-mono text-white">
                    <h3 className="text-sm font-bold truncate">Guardian #{index + 1}</h3>
                    <p className="text-xs text-blue-100">Prototype</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 border-y border-white border-opacity-20" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-mono text-white mb-6">About RSR Dog</h2>
            <p className="text-xl font-mono text-blue-100 mb-12">
              Some guard banks. Others guard houses. A few guard secrets.
              RSR Dog guards something else entirely.
            </p>
            <div className="grid grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="text-center border border-white border-opacity-20 p-6"
                  style={{ backgroundColor: `${COLORS.darkReserveBlue}33` }}
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-mono font-bold text-white mb-2">{feature.title}</h3>
                  <p className="font-mono text-blue-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="font-mono text-blue-100">© 2024 RSR Dog. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RSRDogWebsite;