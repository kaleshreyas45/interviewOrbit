import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Atom, Leaf, Box } from 'lucide-react';

const iconMap = {
  java: { icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  react: { icon: Atom, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  spring: { icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  microservices: { icon: Box, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
};

export default function TrackCard({ id, title, subtitle, iconType }) {
  const iconConfig = iconMap[iconType] || iconMap.java;
  const IconComponent = iconConfig.icon;

  return (
    <Link 
      to={`/tracks/${id}`}
      className="group relative p-6 rounded-2xl bg-[#151a30]/80 border border-white/10 hover:border-blue-500/50 hover:bg-[#1a213d] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${iconConfig.bg}`}>
          <IconComponent className={`w-6 h-6 ${iconConfig.color}`} />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600/40 group-hover:border-blue-500/50 transition-all">
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}