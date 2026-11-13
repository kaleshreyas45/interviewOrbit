import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, CheckCircle } from 'lucide-react';

export default function TrackDetails() {
  const { trackId } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Learning Tracks
      </Link>
      
      <div className="p-8 rounded-2xl bg-[#151a30] border border-white/10 space-y-6">
        <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Track Syllabus</span>
        <h1 className="text-3xl font-bold text-white capitalize">{trackId.replace('-', ' ')} Engineering</h1>
        <p className="text-slate-300">Complete curriculum modules, enterprise patterns, live sandboxes, and capstone project specifications.</p>
        
        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm text-slate-300">
          <div className="flex items-center gap-2"><Clock size={16} className="text-blue-400" /> 12 Weeks (Self-paced)</div>
          <div className="flex items-center gap-2"><BookOpen size={16} className="text-blue-400" /> 24 Production Modules</div>
          <div className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400" /> Verified Certificate</div>
        </div>
      </div>
    </div>
  );
}