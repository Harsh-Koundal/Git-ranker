import React, { useState, useEffect } from 'react';
import { Github, TrendingUp, Award, Users, Code, Star, GitBranch, Activity, Globe, BarChart3, ChevronRight, Sparkles, Trophy, Target, Loader2, AlertCircle } from 'lucide-react';
import axios from "axios";

export default function Home() {
    const [username, setUsername] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleAnalyze = async () => {
        if (!username.trim()) {
            setError('Please enter a GitHub username');
            return;
        }

        setIsAnalyzing(true);
        setError('');
        setAnalysisResult(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/analyze`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { username: username.trim() },
            });

            const data = response.data;

            setAnalysisResult(data);
            
            // Navigate to results page after 2 seconds
            setTimeout(() => {
                window.location.href = `/results/${username.trim()}`;
            }, 2000);

        } catch (err) {
            setError(err.message || 'Failed to analyze profile. Please try again.');
            console.error('Analysis error:', err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const stats = [
        { label: 'Profiles Analyzed', value: '10,000+', icon: <BarChart3 className="w-6 h-6" /> },
        { label: 'Active Developers', value: '5,000+', icon: <Users className="w-6 h-6" /> },
        { label: 'Global Rankings', value: '120+', icon: <Globe className="w-6 h-6" /> }
    ];

    const contributionData = [
        { day: "Mon", commits: 4 },
        { day: "Tue", commits: 7 },
        { day: "Wed", commits: 5 },
        { day: "Thu", commits: 9 },
        { day: "Fri", commits: 6 },
        { day: "Sat", commits: 12 },
        { day: "Sun", commits: 8 },
    ];

    const maxCommits = Math.max(...contributionData.map(d => d.commits));

    const steps = [
        {
            icon: <Github className="w-10 h-10" />,
            title: 'Import GitHub Activity',
            description: 'We fetch your public GitHub data including repositories, commits, pull requests, and contribution history.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <BarChart3 className="w-10 h-10" />,
            title: 'Get Detailed Analytics',
            description: 'Comprehensive metrics on your coding patterns, contributions, language distribution, and project impact',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Trophy className="w-10 h-10" />,
            title: 'Track Your Growth',
            description: 'Monitor your ranking progress, earn achievements, and compare your stats with developers worldwide',
            color: 'from-orange-500 to-red-500'
        }
    ];

    const features = [
        { icon: <Target className="w-5 h-5" />, text: 'Accurate Metrics' },
        { icon: <Code className="w-5 h-5" />, text: 'Code Insights' },
        { icon: <Award className="w-5 h-5" />, text: 'Badges & Rewards' },
        { icon: <TrendingUp className="w-5 h-5" />, text: 'Growth Analytics' }
    ];

    return (
        <div className="min-h-screen text-white relative overflow-hidden bg-[#0b0d12]">
            {/* Hero Section */}
            <section className="relative z-10 px-6 pt-24 pb-40">
                <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Trusted by 10,000+ developers worldwide
                            </span>
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="text-center mb-12">
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">
                            <span className="block mb-4">Discover Your</span>
                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                Developer DNA
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                            Get comprehensive analytics on your GitHub performance. Track your contributions, measure impact, and compete on the global developer leaderboard.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                                >
                                    <span className="text-purple-400">{feature.icon}</span>
                                    <span className="text-sm text-gray-300">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                            <div className="relative flex flex-col sm:flex-row gap-4 p-3 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10">
                                <div className="flex-1 flex items-center px-6 py-4 bg-white/5 rounded-2xl">
                                    <Github className="w-5 h-5 text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Enter your GitHub username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setError('');
                                        }}
                                        onKeyPress={(e) => e.key === 'Enter' && !isAnalyzing && handleAnalyze()}
                                        disabled={isAnalyzing}
                                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-lg disabled:opacity-50"
                                    />
                                </div>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing}
                                    className="group/btn px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Now
                                            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {analysisResult && (
                            <div className="mt-4 p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Sparkles className="w-5 h-5 text-green-400" />
                                    <p className="text-green-300 font-semibold">Analysis Complete!</p>
                                </div>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>Username: <span className="text-white font-medium">{analysisResult.username}</span></p>
                                    <p>Overall Score: <span className="text-white font-medium">{analysisResult.overallScore}</span></p>
                                    <p>Level: <span className="text-white font-medium">{analysisResult.level}</span></p>
                                    <p className="text-green-400 mt-3">Redirecting to results...</p>
                                </div>
                            </div>
                        )}

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Free analysis • No credit card required • Results in seconds
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                    <div className="text-purple-400 mb-4">{stat.icon}</div>
                                    <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="relative z-10 py-6 border-y border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="flex items-center gap-12 animate-scroll whitespace-nowrap">
                    {[...Array(2)].map((_, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span>Rated 4.9/5 by developers</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span>10,000+ profiles analyzed</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Globe className="w-4 h-4 text-blue-400" />
                                <span>Available in 120+ countries</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Award className="w-4 h-4 text-purple-400" />
                                <span>Trusted by top companies</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 px-6 py-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl md:text-7xl font-black mb-6">
                            How It <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Works</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                            Simple three-step process to analyze your GitHub profile and track your ranking
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className="group relative"
                            >
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/30 to-transparent z-0"></div>
                                )}

                                <div className={`relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-500 ${hoveredCard === i ? 'transform -translate-y-4 shadow-2xl shadow-purple-500/20 border-purple-500/30' : ''}`}>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl shadow-lg">
                                        {i + 1}
                                    </div>

                                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 transition-all duration-500 ${hoveredCard === i ? 'scale-110 rotate-6' : ''} shadow-lg`}>
                                        {step.icon}
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Preview */}
            <section className="relative z-10 px-6 py-32 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl md:text-7xl font-black mb-6">
                            View Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Performance</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light">
                            In-depth analytics that reveal your strengths and growth opportunities
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10"></div>

                        <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] p-1 backdrop-blur-sm border border-white/10">
                            <div className="rounded-3xl bg-black/80 p-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Left: Score */}
                                    <div className="space-y-6">
                                        <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 text-center">
                                            <div className="text-gray-400 mb-4 text-lg">Your GitRank Score</div>
                                            <div className="text-9xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                                                92
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-semibold">
                                                <TrendingUp className="w-6 h-6" />
                                                <span>Top 5% Globally</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { icon: <Code className="w-7 h-7 text-purple-400" />, value: '847', label: 'Commits' },
                                                { icon: <GitBranch className="w-7 h-7 text-pink-400" />, value: '23', label: 'Repos' },
                                                { icon: <Star className="w-7 h-7 text-yellow-400" />, value: '156', label: 'Stars' },
                                                { icon: <Users className="w-7 h-7 text-blue-400" />, value: '42', label: 'Followers' }
                                            ].map((item, i) => (
                                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                                    {item.icon}
                                                    <div className="text-3xl font-bold mt-3">{item.value}</div>
                                                    <div className="text-sm text-gray-400 mt-1">{item.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Charts */}
                                    <div className="space-y-6">
                                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                            <div className="text-xl font-bold mb-6 flex items-center gap-2">
                                                <Code className="w-5 h-5 text-purple-400" />
                                                Top Languages
                                            </div>
                                            <div className="space-y-5">
                                                {[
                                                    { lang: 'JavaScript', percent: 45, color: 'from-yellow-400 to-orange-400' },
                                                    { lang: 'Python', percent: 30, color: 'from-blue-400 to-blue-600' },
                                                    { lang: 'TypeScript', percent: 25, color: 'from-purple-400 to-pink-400' }
                                                ].map((item, i) => (
                                                    <div key={i}>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="font-semibold">{item.lang}</span>
                                                            <span className="text-gray-400">{item.percent}%</span>
                                                        </div>
                                                        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                                                            <div
                                                                className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 rounded-full`}
                                                                style={{ width: `${item.percent}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-2 text-xl font-bold">
                                                    <Activity className="w-5 h-5 text-pink-400" />
                                                    Contribution Streak
                                                </div>
                                                <span className="text-sm text-green-400 font-medium">
                                                    +18% this week
                                                </span>
                                            </div>

                                            <div className="relative h-40 flex items-end gap-3">
                                                {[0, 25, 50, 75, 100].map((g) => (
                                                    <div
                                                        key={g}
                                                        className="absolute left-0 right-0 border-t border-white/5"
                                                        style={{ bottom: `${g}%` }}
                                                    />
                                                ))}

                                                {contributionData.map((item, i) => {
                                                    const height = (item.commits / maxCommits) * 100;

                                                    return (
                                                        <div key={i} className="flex-1 group relative flex flex-col items-center">
                                                            <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-xs px-3 py-1 rounded-lg border border-white/10 text-white">
                                                                {item.commits} commits
                                                            </div>

                                                            <div
                                                                className="w-full rounded-xl bg-gradient-to-t from-purple-500 to-pink-500 transition-all duration-700 ease-out group-hover:from-purple-400 group-hover:to-pink-400"
                                                                style={{ height: `${height}%` }}
                                                            />

                                                            <span className="mt-2 text-xs text-gray-400">{item.day}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="mt-6 flex justify-between text-sm text-gray-400">
                                                <span>Last 7 days</span>
                                                <span>Avg: 7 commits/day</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-32">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500 mb-12">
                        <div className="px-12 py-16 rounded-3xl bg-black">
                            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                                Start Analyzing
                                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Your GitHub Today
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                                Join thousands of developers discovering their GitHub potential and competing globally
                            </p>
                            <button 
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="group px-12 py-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/50 flex items-center gap-3 mx-auto"
                            >
                                Start Free Analysis
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
}