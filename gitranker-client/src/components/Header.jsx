import React from 'react'
import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-[#0b0d12]/95 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Github className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              GitRanker
            </span>
          </div>
          <div className="flex items-center gap-8">
            <p className="hidden md:block text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer" onClick={()=>navigate('/features')}>Features</p>

            <p className="hidden md:block text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer" onClick={()=>navigate('/leaderboard')}>Leaderboard</p>
            
            <a href="https://github.com/Harsh-Koundal" target="_blank" rel="noopener noreferrer" className="hidden md:block text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">GitHub</a>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Header
