import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Clock, BookOpen } from 'lucide-react';

export default function TrackTopicsModal({ isOpen, onClose, trackKey, trackData }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !trackData) return null;

  const topics = trackData.topics || [];

  const handleSelectTopic = (topicId) => {
    onClose();
    // Navigates to e.g. /java/oops
    navigate(`/${trackKey}/${topicId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-[#020612]/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0d1227] border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-950/80 overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10 bg-[#151a30]/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                Learning Track
              </span>
              <span className="text-xs text-slate-400">
                {topics.length > 0 ? `${topics.length} Interactive Topics` : 'Coming Soon'}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {trackData.title} Topics
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {trackData.description}
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Topic List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {topics.length > 0 ? (
            topics.map((topic, idx) => (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#151a30]/60 hover:bg-[#1a213e] border border-white/10 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      /{trackKey}/{topic.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span className="hidden sm:inline">Start Learning</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 rounded-xl bg-[#151a30]/30 border border-white/5">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Clock size={20} />
              </div>
              <h4 className="text-base font-semibold text-white">Curriculum Under Active Development</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Topics for {trackData.title} are currently being developed.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-[#080d22] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ESC</kbd> to close
          </span>
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}