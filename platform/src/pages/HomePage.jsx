import React, { useState } from 'react';
import TrackTopicsModal from '../components/TrackTopicsModal';
import topicsData from '../topics.json';
import bannerImg from '../assets/banner.png';
import { ArrowRight, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';


const TRACKS_METADATA = [
  { 
    id: 'java', 
    title: 'Java', 
    subtitle: 'Core Java, OOPs, Streams & Multithreading',
    tag: 'Enterprise Core',
    icon: Terminal
  },
  { 
    id: 'react', 
    title: 'React', 
    subtitle: 'Modern Frontend, Hooks & Architecture',
    tag: 'Frontend Engineering',
    icon: Code2
  },
  { 
    id: 'spring-boot', 
    title: 'Spring Boot', 
    subtitle: 'Build Scalable Enterprise Microservices',
    tag: 'Backend Services',
    icon: Layers
  },
  { 
    id: 'microservices', 
    title: 'Microservices', 
    subtitle: 'Distributed Systems & Cloud Deployment',
    tag: 'Cloud Architecture',
    icon: Cpu
  },
];

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTrackClick = (trackId) => {
    setSelectedTrack(trackId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#080d22] text-white min-h-screen pb-24 selection:bg-blue-600 selection:text-white">
      {/* 1. Hero Banner Section */}
      <section className="relative w-full min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden border-b border-blue-900/30">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat bg-right lg:bg-[right_center] bg-cover pointer-events-none opacity-85"
          style={{ backgroundImage: `url(${bannerImg})` }}
        />
        {/* Soft Radial and Directional Vignette Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d22] via-[#080d22]/90 sm:via-[#080d22]/80 lg:via-[#080d22]/65 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d22] via-transparent to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 z-10">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Next-Gen Enterprise Engineering
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.12]">
              One stop destination for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                Java Full Stack Interview
              </span> Preparation
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Industry-grade curriculums in Java, React, Spring Boot, Microservices.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => handleTrackClick('java')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
              >
                Start Java Track
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Learning Tracks Section */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase font-mono">
              Curriculum Tracks
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
              Core Learning Tracks
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Click any module to inspect specific topic breakdowns, hands-on lessons, and interview prep questions.
            </p>
          </div>
        </div>

        {/* 4 Track Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACKS_METADATA.map((track) => {
            const Icon = track.icon;
            const topicCount = topicsData[track.id]?.topics?.length || 0;

            return (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track.id)}
                className="group relative p-6 rounded-2xl bg-[#151a30]/80 border border-white/10 hover:border-blue-500/50 hover:bg-[#1a213e] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl shadow-black/20 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {topicCount > 0 ? `${topicCount} Topics` : 'Coming Soon'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                    {track.subtitle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-cyan-300 transition-colors">
                  <span>View Topics</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Dynamic Topic Selection Modal */}
      <TrackTopicsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        trackKey={selectedTrack}
        trackData={selectedTrack ? topicsData[selectedTrack] : null}
      />
      
    </div>
  );
}
