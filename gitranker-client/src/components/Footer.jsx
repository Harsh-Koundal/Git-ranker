import React from "react";
import { Github, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-50 px-6 py-14 border-t border-white/10 bg-[#0b0d12] overflow-hidden isolate">
      <div className="max-w-7xl mx-auto">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* Brand */}
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              GitRanker
            </span>
          </div>

          {/* Navigation */}
          <div className="flex gap-8 text-gray-400 text-sm font-medium">
            <button
              onClick={() => navigate("/about")}
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <a
              href="https://harsh-koundal.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/Harsh-Koundal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          {/* Copyright */}
          <span>
            © 2026 <span className="text-white font-medium">GitRanker</span>. All rights reserved.
          </span>

          {/* Creator Credit */}
          <span className="flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by
            <span className="text-white font-semibold ml-1">
              Harsh Koundal
            </span>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
