import React from 'react'
import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-[#0b0d12] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                                    <Github className="w-6 h-6" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                                    GitRanker
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-8 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">About</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © 2026 GitRanker. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
