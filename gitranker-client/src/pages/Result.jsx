import React, { useState } from 'react';
import { Github, TrendingUp, Award, Users, Code, Star, GitBranch, Activity, Zap, Globe, BarChart3, ChevronRight, Sparkles, Trophy, Target, Calendar, GitPullRequest, AlertCircle, CheckCircle, Clock, Flame, Brain, TrendingDown, ExternalLink, Share2, Download, ArrowUpRight, ArrowDownRight, Eye, Heart, MessageSquare, GitCommit } from 'lucide-react';

export default function Result() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('365');

  // Mock data - replace with real API data
  const profileData = {
    username: "johndoe",
    fullName: "John Doe",
    bio: "Full-stack developer passionate about open source and building scalable applications",
    location: "San Francisco, CA",
    company: "TechCorp Inc.",
    website: "johndoe.dev",
    twitter: "@johndoe",
    accountAge: "5 years",
    createdDate: "Jan 2020",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    
    overallScore: 92,
    globalRank: "#1,247",
    percentile: "Top 5%",
    level: "Elite",
    
    categoryScores: {
      consistency: { score: 95, weight: 30, color: "from-purple-500 to-pink-500" },
      volume: { score: 88, weight: 25, color: "from-blue-500 to-cyan-500" },
      quality: { score: 91, weight: 20, color: "from-green-500 to-emerald-500" },
      impact: { score: 87, weight: 15, color: "from-orange-500 to-red-500" },
      profile: { score: 98, weight: 10, color: "from-yellow-500 to-orange-500" }
    },
    
    completeness: {
      bio: true,
      avatar: true,
      pinned: true,
      readme: true,
      links: true,
      score: 100
    },
    
    repositories: {
      total: 47,
      original: 38,
      forked: 9,
      archived: 3,
      active: 35
    },
    
    stars: {
      total: 2847,
      avgPerRepo: 60,
      topRepo: { name: "awesome-react-components", stars: 1203 },
      growth: "+18%"
    },
    
    followers: {
      total: 1284,
      growth: "+12%",
      ratio: 2.3
    },
    
    commits: {
      total: 8473,
      last7days: 34,
      last30days: 156,
      last90days: 487,
      last365days: 1923,
      perDay: 5.3,
      firstCommit: "Jan 2020",
      lastCommit: "2 hours ago"
    },
    
    streak: {
      current: 87,
      longest: 234,
      average: 45,
      breaks: 12
    },
    
    activity: {
      activeDays: 76,
      inactiveDays: 24,
      consistency: "Excellent",
      trend: "improving"
    },
    
    languages: [
      { name: "JavaScript", percent: 38, commits: 3220, color: "from-yellow-400 to-orange-400" },
      { name: "TypeScript", percent: 28, commits: 2372, color: "from-blue-400 to-blue-600" },
      { name: "Python", percent: 18, commits: 1525, color: "from-green-400 to-green-600" },
      { name: "Go", percent: 10, commits: 847, color: "from-cyan-400 to-cyan-600" },
      { name: "Other", percent: 6, commits: 509, color: "from-gray-400 to-gray-600" }
    ],
    
    pullRequests: {
      created: 284,
      merged: 256,
      acceptanceRate: 90,
      externalRepos: 42
    },
    
    issues: {
      opened: 167,
      closed: 143,
      participationRate: 85
    },
    
    weekdayActivity: [
      { day: "Mon", commits: 1247 },
      { day: "Tue", commits: 1389 },
      { day: "Wed", commits: 1456 },
      { day: "Thu", commits: 1298 },
      { day: "Fri", commits: 1124 },
      { day: "Sat", commits: 892 },
      { day: "Sun", commits: 1067 }
    ],
    
    contributionHeatmap: Array(12).fill(0).map((_, month) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
      commits: Math.floor(Math.random() * 200) + 50
    })),
    
    strengths: [
      "Exceptional consistency with 87-day active streak",
      "High TypeScript/JavaScript expertise with 66% contribution",
      "Strong open-source engagement with 90% PR acceptance rate",
      "Well-maintained profile with complete documentation"
    ],
    
    weaknesses: [
      "Could increase repository diversity",
      "Weekend activity slightly lower than weekdays",
      "Few contributions to external trending projects"
    ],
    
    suggestions: [
      "Maintain your excellent consistency streak",
      "Consider contributing to more high-impact open source projects",
      "Explore adding more languages to broaden skill set",
      "Document your projects with better README files"
    ]
  };

  const maxWeekdayCommits = Math.max(...profileData.weekdayActivity.map(d => d.commits));
  const maxMonthlyCommits = Math.max(...profileData.contributionHeatmap.map(d => d.commits));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'quality', label: 'Quality', icon: <Target className="w-4 h-4" /> },
    { id: 'impact', label: 'Impact', icon: <Trophy className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white mt-10">

      {/* Profile Header */}
      <section className="px-6 py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar & Basic Info */}
            <div className="flex gap-6 items-start">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <img src={profileData.avatar} alt={profileData.fullName} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-[#0b0d12]">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-black mb-2">{profileData.fullName}</h2>
                <p className="text-xl text-purple-400 mb-3">@{profileData.username}</p>
                <p className="text-gray-400 mb-4 max-w-xl leading-relaxed">{profileData.bio}</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {profileData.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Globe className="w-4 h-4" />
                      {profileData.location}
                    </div>
                  )}
                  {profileData.company && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      {profileData.company}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Joined {profileData.createdDate}
                  </div>
                </div>
                
                {(profileData.website || profileData.twitter) && (
                  <div className="flex gap-2">
                    {profileData.website && (
                      <a href={`https://${profileData.website}`} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2 transition-all">
                        <ExternalLink className="w-3 h-3" />
                        Website
                      </a>
                    )}
                    {profileData.twitter && (
                      <a href={`https://twitter.com/${profileData.twitter.replace('@', '')}`} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2 transition-all">
                        <ExternalLink className="w-3 h-3" />
                        Twitter
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Score Card */}
            <div className="ml-auto">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 text-center min-w-[280px]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {profileData.level} Developer
                  </span>
                </div>
                
                <div className="text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {profileData.overallScore}
                </div>
                <div className="text-sm text-gray-400 mb-4">Overall Score</div>
                
                <div className="flex gap-4 justify-center text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">{profileData.globalRank}</div>
                    <div className="text-xs text-gray-400">Global Rank</div>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{profileData.percentile}</div>
                    <div className="text-xs text-gray-400">Percentile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-white/10 sticky top-[73px] bg-[#0b0d12]/95 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Category Scores */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-400" />
                Category Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(profileData.categoryScores).map(([key, data]) => (
                  <div key={key} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm text-gray-400 capitalize">{key}</div>
                      <div className="text-xs px-2 py-1 rounded-full bg-white/5">{data.weight}%</div>
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r {data.color} bg-clip-text text-transparent mb-3">
                      {data.score}
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${data.color} transition-all duration-1000`}
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{profileData.repositories.total}</div>
                    <div className="text-sm text-gray-400">Total Repos</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {profileData.repositories.active} active · {profileData.repositories.forked} forked
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{profileData.stars.total}</div>
                    <div className="text-sm text-gray-400">Total Stars</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {profileData.stars.growth}
                  </span>
                  <span className="text-gray-500">this month</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <GitCommit className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{profileData.commits.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Total Commits</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {profileData.commits.perDay} per day average
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{profileData.followers.total}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {profileData.followers.growth}
                  </span>
                  <span className="text-gray-500">this quarter</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Profile Completeness
                </h3>
                <div className="text-4xl font-black text-green-400">{profileData.completeness.score}%</div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(profileData.completeness).filter(([key]) => key !== 'score').map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                    {value ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-400" />
                    )}
                    <span className="text-sm capitalize">{key}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-400" />
                Language Proficiency
              </h3>
              <div className="space-y-6">
                {profileData.languages.map((lang, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{lang.name}</span>
                        <span className="text-sm text-gray-400">{lang.commits.toLocaleString()} commits</span>
                      </div>
                      <span className="text-2xl font-bold">{lang.percent}%</span>
                    </div>
                    <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${lang.color} transition-all duration-1000`}
                        style={{ width: `${lang.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-8">
            {/* Streak Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                <Flame className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.streak.current}</div>
                <div className="text-sm text-gray-400">Current Streak</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <Trophy className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.streak.longest}</div>
                <div className="text-sm text-gray-400">Longest Streak</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <Activity className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.activity.activeDays}%</div>
                <div className="text-sm text-gray-400">Active Days</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-4xl font-bold mb-1 capitalize">{profileData.activity.consistency}</div>
                <div className="text-sm text-gray-400">Consistency</div>
              </div>
            </div>

            {/* Commit Timeline */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GitCommit className="w-6 h-6 text-purple-400" />
                Commit History
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Last 7 days', value: profileData.commits.last7days },
                  { label: 'Last 30 days', value: profileData.commits.last30days },
                  { label: 'Last 90 days', value: profileData.commits.last90days },
                  { label: 'Last 365 days', value: profileData.commits.last365days },
                  { label: 'All time', value: profileData.commits.total }
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 text-center">
                    <div className="text-3xl font-bold mb-1">{item.value.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>First commit: {profileData.commits.firstCommit}</span>
                <span>Last commit: {profileData.commits.lastCommit}</span>
              </div>
            </div>

            {/* Weekday Activity */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                Weekly Pattern
              </h3>
              
              <div className="h-64 flex items-end gap-4">
                {profileData.weekdayActivity.map((item, i) => {
                  const height = (item.commits / maxWeekdayCommits) * 100;
                  return (
                    <div key={i} className="flex-1 group relative flex flex-col items-center">
                      <div className="absolute -top-12 scale-0 group-hover:scale-100 transition-transform bg-black/90 text-sm px-4 py-2 rounded-xl border border-white/10">
                        {item.commits} commits
                      </div>
                      
                      <div
                        className="w-full rounded-t-2xl bg-gradient-to-t from-blue-500 to-cyan-500 transition-all duration-700 group-hover:from-blue-400 group-hover:to-cyan-400"
                        style={{ height: `${height}%` }}
                      />
                      
                      <span className="mt-3 text-sm text-gray-400">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Heatmap */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Yearly Overview
              </h3>
              
              <div className="grid grid-cols-12 gap-2">
                {profileData.contributionHeatmap.map((item, i) => {
                  const intensity = (item.commits / maxMonthlyCommits) * 100;
                  return (
                    <div key={i} className="group relative">
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/90 text-sm px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap z-10">
                        {item.month}: {item.commits} commits
                      </div>
                      
                      <div className="aspect-square rounded-lg bg-purple-500 transition-all hover:scale-110" 
                           style={{ opacity: intensity / 100 }}
                      />
                      <div className="text-xs text-center mt-2 text-gray-500">{item.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Repository Quality */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-400" />
                  Repository Quality
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'README Documentation', status: 'excellent', percent: 95 },
                    { label: 'License Present', status: 'good', percent: 87 },
                    { label: 'Topics & Tags', status: 'excellent', percent: 92 },
                    { label: 'CI/CD Configured', status: 'average', percent: 68 },
                    { label: 'Tests Present', status: 'good', percent: 81 }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className={`text-sm font-semibold ${
                          item.status === 'excellent' ? 'text-green-400' :
                          item.status === 'good' ? 'text-blue-400' : 'text-yellow-400'
                        }`}>
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${
                            item.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            item.status === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            'bg-gradient-to-r from-yellow-500 to-orange-500'
                          }`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Score */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-400" />
                  Maintenance Activity
                </h3>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Recently Updated</span>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold">28 repos</div>
                    <div className="text-xs text-gray-400 mt-1">Updated in last 30 days</div>
                  </div>

                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Needs Attention</span>
                      <AlertCircle className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="text-3xl font-bold">5 repos</div>
                    <div className="text-xs text-gray-400 mt-1">Not updated in 6+ months</div>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-500/10 border border-gray-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Archived</span>
                      <Activity className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="text-3xl font-bold">{profileData.repositories.archived} repos</div>
                    <div className="text-xs text-gray-400 mt-1">Officially archived</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Repositories */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Top Repositories by Stars
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: 'awesome-react-components', stars: 1203, forks: 234, language: 'TypeScript', updated: '2 days ago' },
                  { name: 'ml-pipeline-toolkit', stars: 876, forks: 145, language: 'Python', updated: '1 week ago' },
                  { name: 'api-gateway-framework', stars: 543, forks: 89, language: 'Go', updated: '3 days ago' }
                ].map((repo, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">{repo.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                            {repo.language}
                          </span>
                          <span>Updated {repo.updated}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-semibold">{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <GitBranch className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold">{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-8">
            {/* Open Source Impact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <GitPullRequest className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.pullRequests.created}</div>
                <div className="text-sm text-gray-400 mb-3">Pull Requests</div>
                <div className="text-xs text-green-400">{profileData.pullRequests.acceptanceRate}% acceptance rate</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <MessageSquare className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.issues.opened}</div>
                <div className="text-sm text-gray-400 mb-3">Issues Opened</div>
                <div className="text-xs text-green-400">{profileData.issues.participationRate}% participation</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <Globe className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-4xl font-bold mb-1">{profileData.pullRequests.externalRepos}</div>
                <div className="text-sm text-gray-400 mb-3">External Repos</div>
                <div className="text-xs text-blue-400">Active contributor</div>
              </div>
            </div>

            {/* Contribution Stats */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Contribution Metrics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400 mb-4">Pull Request Distribution</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                      <span className="text-sm">Merged</span>
                      <span className="font-bold text-green-400">{profileData.pullRequests.merged}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                      <span className="text-sm">Open</span>
                      <span className="font-bold text-blue-400">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10">
                      <span className="text-sm">Closed</span>
                      <span className="font-bold text-red-400">16</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-4">Issue Distribution</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                      <span className="text-sm">Resolved</span>
                      <span className="font-bold text-green-400">{profileData.issues.closed}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                      <span className="text-sm">Active</span>
                      <span className="font-bold text-blue-400">18</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-500/10">
                      <span className="text-sm">Stale</span>
                      <span className="font-bold text-gray-400">6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-400" />
                Community Engagement
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12.4K</div>
                  <div className="text-xs text-gray-400">Total Views</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{profileData.stars.total}</div>
                  <div className="text-xs text-gray-400">Stars Earned</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <GitBranch className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">542</div>
                  <div className="text-xs text-gray-400">Total Forks</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{profileData.followers.total}</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* AI Insights */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-400">Generated analysis based on your activity</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  Your Strengths
                </h4>
                <div className="space-y-3">
                  {profileData.strengths.map((strength, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <Sparkles className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weaknesses */}
              <div className="mb-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-400">
                  <AlertCircle className="w-5 h-5" />
                  Areas for Improvement
                </h4>
                <div className="space-y-3">
                  {profileData.weaknesses.map((weakness, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <TrendingDown className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">{weakness}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
                  <Zap className="w-5 h-5" />
                  Personalized Suggestions
                </h4>
                <div className="space-y-3">
                  {profileData.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Trajectory */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Growth Trajectory
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                  <ArrowUpRight className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-green-400 mb-2">+28%</div>
                  <div className="text-sm text-gray-400">Commit Growth</div>
                  <div className="text-xs text-gray-500 mt-2">vs last quarter</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-center">
                  <ArrowUpRight className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-blue-400 mb-2">+18%</div>
                  <div className="text-sm text-gray-400">Star Growth</div>
                  <div className="text-xs text-gray-500 mt-2">vs last quarter</div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center">
                  <ArrowUpRight className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-purple-400 mb-2">+12%</div>
                  <div className="text-sm text-gray-400">Follower Growth</div>
                  <div className="text-xs text-gray-500 mt-2">vs last quarter</div>
                </div>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-yellow-400" />
                Next Milestone
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Reach 100-day streak</span>
                    <span className="text-yellow-400 font-bold">87 / 100 days</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000"
                         style={{ width: '87%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">13 more days to reach this milestone! 🎯</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Earn 3,000 stars</span>
                    <span className="text-yellow-400 font-bold">2,847 / 3,000 stars</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000"
                         style={{ width: '94.9%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">153 more stars needed! ⭐</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Reach 10,000 commits</span>
                    <span className="text-yellow-400 font-bold">8,473 / 10,000 commits</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000"
                         style={{ width: '84.7%' }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">1,527 more commits to go! 💪</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Share Your Achievement</h3>
            <p className="text-gray-400 mb-6">Let others see your GitHub performance and ranking</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 font-semibold transition-all flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share on Twitter
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Report
              </button>
              <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold transition-all flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                View on GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}