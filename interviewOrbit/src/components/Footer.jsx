import React from 'react';
import { Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816] px-6 py-12 text-sm text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Terminal size={18} className="text-blue-400" />
            InterviewOrbit
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            The premier training curriculum for full-stack developers specializing in Java enterprise ecosystems and modern React frontends.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Learning Tracks</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Java</a></li>
            <li><a href="#" className="hover:text-white transition-colors">React</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Spring Boot</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Microservices</a></li>
          </ul>
        </div>

        {/* <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">System Design Labs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Code Sandboxes</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Roadmaps</a></li>
          </ul>
        </div> */}

        {/* <div>
          <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">About Academy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Enterprise Hiring</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div> */}
      </div>
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 text-xs text-slate-600">
        © 2025 InterviewOrbit Inc. All rights reserved.
      </div>
    </footer>
  );
}
