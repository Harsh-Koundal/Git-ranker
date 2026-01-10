import React from 'react'
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <div>
          {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          <div className="flex items-center gap-2">
            <Github className="w-6 h-6 text-purple-400" />
            <span className="font-semibold">GitRanker</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm">
            © 2026 GitRanker. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
  )
}

export default Footer
