import React, { useState, useEffect } from 'react';
import { Github, TrendingUp, Award, Users, Code, Star, GitBranch, Activity } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAnalyze = () => {
    if (username.trim()) {
      alert(`Analyzing profile: ${username}`);
    }
  };

  const stats = [
    { label: 'Profiles Analyzed', value: '10,000+' },
    { label: 'Active Users', value: '5,000+' },
    { label: 'Countries', value: '120+' }
  ];

  const steps = [
    {
      icon: <Github className="w-8 h-8" />,
      title: 'Fetch GitHub Data',
      description: 'We pull your commits, PRs, issues, and contribution history from GitHub API'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Analyze Behavior',
      description: 'Our algorithms evaluate consistency, code quality, and community impact'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Rank Globally',
      description: 'Get your score and see where you stand among developers worldwide'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
            ✨ Trusted by 10,000+ developers
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Rate Any GitHub Profile.
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Objectively.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Consistency. Impact. Code Quality. Ranked globally.
          </p>

          {/* Input Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <input
                type="text"
                placeholder="Enter GitHub username or profile URL"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                className="flex-1 px-6 py-4 bg-transparent outline-none text-white placeholder-gray-400"
              />
              <button
                onClick={handleAnalyze}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50"
              >
                Analyze Profile
              </button>
            </div>
          </div>

          <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20">
            View Leaderboard →
          </button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="relative z-10 px-6 py-4 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 text-gray-300">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Analyzed 10,000+ profiles</span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-purple-400" />
            <span>Powered by GitHub data</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span>Real consistency metrics</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            How It <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 ${
                  hoveredCard === i ? 'transform -translate-y-2 shadow-2xl shadow-purple-500/20 bg-white/10' : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 transition-transform duration-300 ${
                  hoveredCard === i ? 'scale-110 rotate-6' : ''
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                <div className="mt-6 text-purple-400 font-semibold">Step {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="relative z-10 px-6 py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            See Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Impact</span>
          </h2>
          
          <div className="rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-8 border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Score Badge */}
              <div className="flex-1 p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">Your GitRank Score</div>
                  <div className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    92
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <TrendingUp className="w-5 h-5" />
                    <span>Top 5% globally</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Code className="w-6 h-6 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold">847</div>
                  <div className="text-sm text-gray-400">Commits</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <GitBranch className="w-6 h-6 text-pink-400 mb-2" />
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-gray-400">Repositories</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Star className="w-6 h-6 text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-gray-400">Stars</div>
                </div>
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Users className="w-6 h-6 text-blue-400 mb-2" />
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
              </div>
            </div>

            {/* Language Chart */}
            <div className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="text-lg font-semibold mb-4">Top Languages</div>
              <div className="space-y-3">
                {[
                  { lang: 'JavaScript', percent: 45, color: 'bg-yellow-400' },
                  { lang: 'Python', percent: 30, color: 'bg-blue-400' },
                  { lang: 'TypeScript', percent: 25, color: 'bg-purple-400' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.lang}</span>
                      <span className="text-gray-400">{item.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Find where you stand among
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              developers worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who track their GitHub performance
          </p>
          <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50">
            Get Your Rank Now →
          </button>
        </div>
      </section>
    </div>
  );
}