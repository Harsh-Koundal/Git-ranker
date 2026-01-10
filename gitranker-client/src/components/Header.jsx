import React from 'react'
import { Github } from 'lucide-react';

const Header = () => {
  return (
    <div>
      <nav className="relative z-10 px-6 py-4 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Github className="w-8 h-8 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              GitRanker
            </span>
          </div>
          <button className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20">
            Sign In
          </button>
        </div>
      </nav>

    </div>
  )
}

export default Header
