import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, Github, Star, GitBranch, Code, MapPin, Filter, Search, Globe, Award, Zap, Target, ChevronRight, ExternalLink } from 'lucide-react';

export default function Leaderboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('global');
    const [filterLanguage, setFilterLanguage] = useState('all');
    const [hoveredRank, setHoveredRank] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [topDevelopers, setTopDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalDevelopers, setTotalDevelopers] = useState(0);

    const leaderboardData = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:5025';
            const res = await fetch(`${apiUrl}/api/v1/leaderboard`);

            if (!res.ok) {
                throw new Error('Failed to fetch leaderboard data');
            }

            const data = await res.json();

            setTopDevelopers(
                data.leaderboard.map((u, index) => ({
                    rank: index + 1,
                    name: u.name || 'Unknown',
                    username: u.username || 'unknown',
                    location: u.location || 'Unknown',
                    score: u.score || 0,
                    avatar: u.avatarUrl ? (
                        <img
                            src={u.avatarUrl}
                            alt={u.username}
                            className="w-full h-full object-cover rounded-xl"
                        />
                    ) : (
                        <Github className="w-10 h-10 text-gray-400" />
                    ),
                    repos: u.repos || 0,
                    stars: u.stars || 0,
                    commits: u.commits || 0,
                    language: u.primaryLanguage || 'Unknown',
                    trend: "same",
                    trendValue: 0,
                    badges: u.badges || [],
                }))
            );
            setTotalDevelopers(data.leaderboard.length);
            console.log('Fetched leaderboard data:', data.leaderboard);
            setError(null);
        } catch (err) {
            console.error('Error fetching leaderboard:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsVisible(true);
        leaderboardData();
    }, []);

    const categories = [
        { id: 'global', label: 'Global', icon: <Globe className="w-4 h-4" /> },
        { id: 'country', label: 'By Country', icon: <MapPin className="w-4 h-4" /> },
        { id: 'language', label: 'By Language', icon: <Code className="w-4 h-4" /> }
    ];

    const languages = ['all', 'JavaScript', 'Python', 'TypeScript', 'Go', 'Rust', 'Java', 'C++', 'Swift'];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400" />;
        if (rank === 2) return <Medal className="w-8 h-8 text-gray-400 fill-gray-400" />;
        if (rank === 3) return <Medal className="w-8 h-8 text-amber-600 fill-amber-600" />;
        return <Trophy className="w-6 h-6 text-purple-400" />;
    };

    const getTrendIcon = (trend, value) => {
        if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
        if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
        return <Minus className="w-4 h-4 text-gray-400" />;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-500 to-orange-500';
        if (rank === 2) return 'from-gray-400 to-gray-600';
        if (rank === 3) return 'from-amber-600 to-amber-800';
        return 'from-purple-500 to-pink-500';
    };

    const filteredDevelopers = topDevelopers.filter(dev => {
        const matchesSearch = dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dev.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLanguage = filterLanguage === 'all' || dev.language === filterLanguage;
        return matchesSearch && matchesLanguage;
    });

    if (loading) {
        return (
            <div className="min-h-screen text-white relative overflow-hidden bg-[#0b0d12] flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white relative overflow-hidden bg-[#0b0d12]">
            {/* Hero Section */}
            <section className="relative z-10 px-6 pt-32 pb-16">
                <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm mb-8">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                            Live Global Rankings • Updated Every Hour
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                        <span className="block mb-4">Global Developer</span>
                        <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                            Leaderboard
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Compete with developers worldwide. Track your ranking and climb the ladder.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}

            <section className="relative z-10 px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Developers', value: `${totalDevelopers} `, icon: <Award className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
                            { label: 'Countries', value: '120+', icon: <Globe className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
                            { label: 'Total Commits', value: '2.4M', icon: <GitBranch className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
                            { label: 'Active Today', value: '3,247', icon: <Zap className="w-5 h-5" />, color: 'from-orange-500 to-red-500' }
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-3 text-white`}>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="relative z-10 px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Category Filter */}
                        <div className="flex gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilterCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${filterCategory === cat.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {cat.icon}
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search & Language Filter */}
                        <div className="flex gap-4 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 md:flex-initial md:w-64">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search developers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            {/* Language Filter */}
                            <select
                                value={filterLanguage}
                                onChange={(e) => setFilterLanguage(e.target.value)}
                                className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500/50 transition-all"
                            >
                                {languages.map((lang) => (
                                    <option key={lang} value={lang} className="bg-[#0b0d12]">
                                        {lang === 'all' ? 'All Languages' : lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top 3 Podium */}
            {topDevelopers.length >= 3 && (
                <section className="relative z-10 px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-center gap-8 mb-16">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center w-72">
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-6xl border-4 border-white/10 shadow-2xl">
                                        {topDevelopers[1].avatar}
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold text-sm shadow-lg">
                                        #2
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{topDevelopers[1].name}</h3>
                                <p className="text-gray-400 text-sm mb-3">@{topDevelopers[1].username}</p>
                                <div className="text-5xl font-black bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent mb-4">
                                    {topDevelopers[1].score}
                                </div>
                                <div className="flex gap-2 mb-4">
                                    {topDevelopers[1].badges.map((badge, i) => (
                                        <span key={i} className="text-2xl">{badge}</span>
                                    ))}
                                </div>
                                <div className="h-40 w-full rounded-t-2xl bg-gradient-to-t from-gray-500/20 to-gray-400/20 border border-white/10 border-b-0"></div>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center w-80 -mt-8">
                                <Crown className="w-12 h-12 text-yellow-400 fill-yellow-400 mb-4 animate-bounce" />
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 blur-xl opacity-50 animate-pulse"></div>
                                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-6xl border-4 border-yellow-300 shadow-2xl">
                                        {topDevelopers[0].avatar}
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-lg">
                                        #1
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold mb-1">{topDevelopers[0].name}</h3>
                                <p className="text-gray-400 mb-3">@{topDevelopers[0].username}</p>
                                <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                                    {topDevelopers[0].score}
                                </div>
                                <div className="flex gap-2 mb-4">
                                    {topDevelopers[0].badges.map((badge, i) => (
                                        <span key={i} className="text-3xl">{badge}</span>
                                    ))}
                                </div>
                                <div className="h-56 w-full rounded-t-2xl bg-gradient-to-t from-yellow-500/20 to-orange-500/20 border border-white/10 border-b-0"></div>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center w-72">
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-6xl border-4 border-white/10 shadow-2xl">
                                        {topDevelopers[2].avatar}
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold text-sm shadow-lg">
                                        #3
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{topDevelopers[2].name}</h3>
                                <p className="text-gray-400 text-sm mb-3">@{topDevelopers[2].username}</p>
                                <div className="text-5xl font-black bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-4">
                                    {topDevelopers[2].score}
                                </div>
                                <div className="flex gap-2 mb-4">
                                    {topDevelopers[2].badges.map((badge, i) => (
                                        <span key={i} className="text-2xl">{badge}</span>
                                    ))}
                                </div>
                                <div className="h-32 w-full rounded-t-2xl bg-gradient-to-t from-amber-600/20 to-amber-800/20 border border-white/10 border-b-0"></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Rankings List */}
            <section className="relative z-10 px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-4">
                        {filteredDevelopers.map((dev, i) => (
                            <div
                                key={dev.rank}
                                onMouseEnter={() => setHoveredRank(dev.rank)}
                                onMouseLeave={() => setHoveredRank(null)}
                                className={`group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 ${hoveredRank === dev.rank ? 'transform -translate-y-1 shadow-xl shadow-purple-500/20 border-purple-500/30 bg-white/10' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-6">
                                    {/* Rank */}
                                    <div className="flex flex-col items-center w-20">
                                        {dev.rank <= 3 ? (
                                            getRankIcon(dev.rank)
                                        ) : (
                                            <div className="text-4xl font-black text-gray-400">
                                                #{dev.rank}
                                            </div>
                                        )}
                                        {/* Trend */}
                                        <div className="flex items-center gap-1 mt-2">
                                            {getTrendIcon(dev.trend, dev.trendValue)}
                                            {dev.trendValue > 0 && (
                                                <span className={`text-xs font-bold ${dev.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {dev.trendValue}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Avatar & Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getRankColor(dev.rank)} flex items-center justify-center text-4xl shadow-lg transition-transform duration-300 ${hoveredRank === dev.rank ? 'scale-110' : ''
                                            }`}>
                                            {dev.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-1">{dev.name}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Github className="w-4 h-4" />
                                                    @{dev.username}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {dev.location}
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-semibold">
                                                    {dev.language}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="hidden lg:flex items-center gap-8">
                                        <div className="text-center">
                                            <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                                                <Code className="w-4 h-4" />
                                                <span>Repos</span>
                                            </div>
                                            <div className="text-xl font-bold">{dev.repos}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                                                <Star className="w-4 h-4" />
                                                <span>Stars</span>
                                            </div>
                                            <div className="text-xl font-bold">{dev.stars.toLocaleString()}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                                                <GitBranch className="w-4 h-4" />
                                                <span>Commits</span>
                                            </div>
                                            <div className="text-xl font-bold">{dev.commits.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {/* Score & Badges */}
                                    <div className="flex flex-col items-center gap-3 w-32">
                                        <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                            {dev.score}
                                        </div>
                                        <div className="flex gap-1">
                                            {dev.badges.map((badge, i) => (
                                                <span key={i} className="text-xl">{badge}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* View Profile Button */}
                                    <a
                                        href={`https://github.com/${dev.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 flex items-center gap-2"
                                    >
                                        View Profile
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="group px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 font-bold transition-all duration-300 flex items-center gap-2 mx-auto">
                            Load More Developers
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            <style jsx>{`
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