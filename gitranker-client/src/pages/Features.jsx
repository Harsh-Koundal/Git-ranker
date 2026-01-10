import React, { useState, useEffect } from 'react';
import { Code, TrendingUp, Award, Users, BarChart3, Target, Zap, Shield, Globe, GitBranch, Star, Activity, Trophy, Sparkles, ChevronRight, Lock, Rocket, Brain, Clock, GitCommit, PieChart, Calendar, LineChart } from 'lucide-react';

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const mainFeatures = [
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: 'Comprehensive Analytics',
            description: 'Deep insights into your coding patterns, contribution frequency, and project impact with beautiful visualizations',
            color: 'from-blue-500 to-cyan-500',
            image: '📊',
            details: [
                'Real-time contribution tracking',
                'Language usage breakdown',
                'Commit frequency analysis',
                'Project complexity metrics'
            ]
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Global Rankings',
            description: 'See where you stand among developers worldwide with our sophisticated ranking algorithm',
            color: 'from-purple-500 to-pink-500',
            image: '🏆',
            details: [
                'Country-specific leaderboards',
                'Language-based rankings',
                'Skill category scores',
                'Historical rank tracking'
            ]
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Smart Recommendations',
            description: 'Get data-driven recommendations to improve your coding skills and GitHub presence',
            color: 'from-orange-500 to-red-500',
            image: '💡',
            details: [
                'Skill gap analysis',
                'Growth opportunity detection',
                'Best practice suggestions',
                'Personalized improvement tips'
            ]
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Achievements & Badges',
            description: 'Unlock achievements and earn badges as you reach coding milestones and improve your skills',
            color: 'from-green-500 to-emerald-500',
            image: '🎖️',
            details: [
                'Custom achievement system',
                'Rare milestone badges',
                'Contribution streaks',
                'Community recognition'
            ]
        }
    ];

    const allFeatures = [
        { icon: <Code className="w-6 h-6" />, title: 'Multi-Language Support', desc: 'Track proficiency across 50+ programming languages' },
        { icon: <Activity className="w-6 h-6" />, title: 'Activity Heatmap', desc: 'Visualize your contribution patterns over time' },
        { icon: <GitBranch className="w-6 h-6" />, title: 'Repository Analysis', desc: 'Deep metrics for each of your repositories' },
        { icon: <Users className="w-6 h-6" />, title: 'Team Insights', desc: 'Compare stats with teammates and competitors' },
        { icon: <Star className="w-6 h-6" />, title: 'Star Tracking', desc: 'Monitor repository stars and growth trends' },
        { icon: <Target className="w-6 h-6" />, title: 'Goal Setting', desc: 'Set and track custom development goals' },
        { icon: <Shield className="w-6 h-6" />, title: 'Privacy Controls', desc: 'Full control over what data is public' },
        { icon: <Zap className="w-6 h-6" />, title: 'Real-time Updates', desc: 'Instant synchronization with GitHub' },
        { icon: <Globe className="w-6 h-6" />, title: 'Global Community', desc: 'Connect with developers worldwide' },
        { icon: <Clock className="w-6 h-6" />, title: 'Historical Data', desc: 'Access years of contribution history' },
        { icon: <PieChart className="w-6 h-6" />, title: 'Visual Reports', desc: 'Export beautiful PDF reports' },
        { icon: <Rocket className="w-6 h-6" />, title: 'Growth Tracking', desc: 'Monitor your skill development over time' }
    ];

    const comparisonData = [
        { feature: 'GitHub Analytics', gitrank: true, others: false },
        { feature: 'Global Rankings', gitrank: true, others: false },
        { feature: 'Achievement System', gitrank: true, others: true },
        { feature: 'Multi-Language Stats', gitrank: true, others: true },
        { feature: 'Historical Tracking', gitrank: true, others: false },
        { feature: 'Privacy Controls', gitrank: true, others: true },
        { feature: 'Export Reports', gitrank: true, others: false }
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Senior Developer',
            company: 'Tech Corp',
            text: 'GitRank helped me identify gaps in my skills and track my improvement over months. The rankings motivate me to contribute more.',
            rating: 5
        },
        {
            name: 'Marcus Johnson',
            role: 'Full Stack Engineer',
            company: 'StartupXYZ',
            text: 'The analytics are incredibly detailed. I love seeing my language distribution and how my coding patterns evolve.',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'Open Source Maintainer',
            company: 'Independent',
            text: 'Being able to showcase my GitHub achievements through GitRank has helped me land better opportunities.',
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen text-white relative overflow-hidden bg-[#0b0d12]">
            {/* Hero Section */}
            <section className="relative z-10 px-6 pt-32 pb-20">
                <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm mb-8">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                            Everything you need to track your growth
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                        <span className="block mb-4">Powerful Features</span>
                        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            Built for Developers
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        Comprehensive tools and insights to analyze your GitHub presence, track your progress, and compete globally
                    </p>
                </div>
            </section>

            {/* Main Features with Interactive Cards */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {mainFeatures.map((feature, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setActiveFeature(i)}
                                className={`group relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-500 cursor-pointer ${
                                    activeFeature === i ? 'transform -translate-y-2 shadow-2xl shadow-purple-500/20 border-purple-500/30' : ''
                                }`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transition-all duration-500 ${
                                    activeFeature === i ? 'scale-110 rotate-6' : ''
                                } shadow-lg text-white`}>
                                    {feature.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg mb-6">{feature.description}</p>

                                {/* Details */}
                                <div className="space-y-3">
                                    {feature.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-300">
                                            <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${activeFeature === i ? 'translate-x-1' : ''}`} />
                                            <span>{detail}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Emoji */}
                                <div className="absolute top-8 right-8 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                                    {feature.image}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Features Grid */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            Complete <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Toolkit</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light">
                            Everything you need in one powerful platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allFeatures.map((feature, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                                className={`p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 ${
                                    hoveredCard === i ? 'transform -translate-y-2 border-purple-500/30 bg-white/10' : ''
                                }`}
                            >
                                <div className={`text-purple-400 mb-4 transition-transform duration-300 ${hoveredCard === i ? 'scale-110' : ''}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">GitRank</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light">
                            See how we compare to other platforms
                        </p>
                    </div>

                    <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] p-1 backdrop-blur-sm border border-white/10">
                        <div className="rounded-3xl bg-black/80 p-8 overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-6 px-4 text-gray-400 font-semibold">Feature</th>
                                        <th className="text-center py-6 px-4">
                                            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                                                GitRank
                                            </span>
                                        </th>
                                        <th className="text-center py-6 px-4 text-gray-400 font-semibold">Others</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((row, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-5 px-4 font-medium">{row.feature}</td>
                                            <td className="py-5 px-4 text-center">
                                                {row.gitrank ? (
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                                                        <span className="text-green-400 text-xl">✓</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                                                        <span className="text-red-400 text-xl">✗</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-5 px-4 text-center">
                                                {row.others ? (
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                                                        <span className="text-green-400 text-xl">✓</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                                                        <span className="text-red-400 text-xl">✗</span>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-6">
                            Loved by <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Developers</span>
                        </h2>
                        <p className="text-lg text-gray-400 font-light">
                            Join thousands of developers who trust GitRank
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-2"
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, idx) => (
                                        <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-300 leading-relaxed mb-6 italic">
                                    "{testimonial.text}"
                                </p>

                                {/* Author */}
                                <div>
                                    <div className="font-bold text-lg">{testimonial.name}</div>
                                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                                    <div className="text-purple-400 text-sm">{testimonial.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-32">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 mb-12">
                        <div className="px-12 py-16 rounded-3xl bg-black">
                            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                                Ready to Level Up
                                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Your GitHub Game?
                                </span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light">
                                Start tracking your progress and competing with developers worldwide
                            </p>
                            <button className="group px-12 py-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50 flex items-center gap-3 mx-auto">
                                Get Started Free
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <p className="text-sm text-gray-500 mt-6">
                                No credit card required • Set up in 30 seconds
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}