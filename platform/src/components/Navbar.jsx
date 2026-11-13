import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Search, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d22]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - starts flush with the max-w-7xl content container */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 p-2 flex items-center justify-center text-cyan-400">
            <Terminal size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
              InterviewOrbit{" "}
            </span>
            <span className="text-[10px] uppercase font-mono text-slate-400">
              Enterprise Academy
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/">
            <a className="hover:text-cyan-400 transition">Tracks</a>
          </Link>

          {/* <a href="#courses" className="hover:text-cyan-400 transition">
            Courses
          </a>
          <a href="#practice" className="hover:text-cyan-400 transition">
            Practice Labs
          </a> */}
        </nav>
      </div>
    </header>
  );
}
