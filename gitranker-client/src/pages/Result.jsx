import React, { useState, useEffect } from 'react';
import { Github, TrendingUp, Award, Users, Code, Star, GitBranch, Activity, Zap, Globe, BarChart3, ChevronRight, Sparkles, Trophy, Target, Calendar, GitPullRequest, AlertCircle, CheckCircle, Clock, Flame, Brain, TrendingDown, ExternalLink, Share2, Download, ArrowUpRight, ArrowDownRight, Eye, Heart, MessageSquare, GitCommit, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function Result() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get username from URL
  const username = window.location.pathname.split('/').pop() || 'torvalds';

  useEffect(() => {
    fetchProfileData();
  }, [username]);

  const fetchProfileData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5025/api/v1/result/${username}`);

      const data = await response.data;
      console.log('API Response:', data);

      // Add color mapping for category scores
      const colorMap = {
        consistency: 'from-blue-400 to-blue-600',
        volume: 'from-green-400 to-green-600',
        quality: 'from-purple-400 to-purple-600',
        impact: 'from-pink-400 to-pink-600',
        profile: 'from-yellow-400 to-yellow-600'
      };

      // Add colors to categoryScores
      const categoryScoresWithColors = {};
      Object.keys(data.report.categoryScores || {}).forEach(key => {
        categoryScoresWithColors[key] = {
          ...data.report.categoryScores[key],
          color: colorMap[key] || 'from-gray-400 to-gray-600'
        };
      });

      // Transform API data to match component structure
      const transformedData = {
        username: data.profile.username || username,
        fullName: data.profile.fullName || username,
        bio: data.profile.bio || "GitHub Developer",
        location: data.profile.location || "",
        company: data.profile.company || "",
        website: data.profile.website || "",
        twitter: data.profile.twitter || "",
        accountAge: `${data.profile.accountAgeYears || 0} years`,
        createdDate: data.profile.accountCreatedAt ? new Date(data.profile.accountCreatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A',
        avatar: data.profile.avatar || `https://github.com/${username}.png`,

        overallScore: data.report.overallScore || 0,
        globalRank: data.profile.rank || "N/A",
        percentile: data.report.percentile || "N/A",
        level: data.report.level || "Developer",

        categoryScores: categoryScoresWithColors,

        completeness: {
          bio: data.profile.profileCompleteness?.bio || false,
          avatar: data.profile.profileCompleteness?.avatar || false,
          pinned: data.profile.profileCompleteness?.pinnedRepos || false,
          readme: data.profile.profileCompleteness?.profileReadme || false,
          links: data.profile.profileCompleteness?.externalLinks || false,
          score: data.profile.profileCompleteness?.score || 0
        },

        repositories: {
          total: data.report.repositories?.total || 0,
          original: data.report.repositories?.original || 0,
          forked: data.report.repositories?.forked || 0,
          archived: data.report.repositories?.archived || 0,
          active: data.report.repositories?.active || 0
        },

        stars: {
          total: data.report.stars?.total || 0,
          avgPerRepo: data.report.stars?.avgPerRepo || 0,
          topRepos: data.report.stars?.topRepos || [],
          growth: data.report.stars?.growthPercentage || "+0%"
        },


        followers: {
          total: data.report.followers?.total || 0,
          growth: data.report.followers?.growthPercentage || "+0%",
          ratio: data.report.followers?.followerFollowingRatio || 0
        },

        commits: {
          total: data.report.commits?.total || 0,
          last7days: data.report.commits?.last7days || 0,
          last30days: data.report.commits?.last30days || 0,
          last90days: data.report.commits?.last90days || 0,
          last365days: data.report.commits?.last365days || 0,
          perDay: data.report.commits?.perDayAverage || 0,
          firstCommit: data.report.commits?.firstCommitDate || "N/A",
          lastCommit: data.report.commits?.lastCommitDate || "N/A"
        },

        streak: {
          current: data.report.streak?.current || 0,
          longest: data.report.streak?.longest || 0,
          average: data.report.streak?.average || 0,
          breaks: data.report.streak?.breaks || 0
        },

        activity: {
          activeDays: data.report.activity?.activeDaysPercentage || 0,
          inactiveDays: data.report.activity?.inactiveDaysPercentage || 0,
          consistency: data.report.activity?.consistencyLabel || "N/A",
          trend: data.report.activity?.trend || "stable"
        },

        languages: (data.report.languages || []).map(lang => ({
          name: lang.name || 'Unknown',
          percent: lang.percentage || 0,
          bytes: lang.bytes || 0,
          color: lang.color || "from-gray-400 to-gray-600"
        })),


        pullRequests: {
          created: data.report.pullRequests?.created || 0,
          merged: data.report.pullRequests?.merged || 0,
          acceptanceRate: data.report.pullRequests?.acceptanceRate || 0,
          externalRepos: data.report.pullRequests?.externalRepos || 0
        },

        issues: {
          opened: data.report.issues?.opened || 0,
          closed: data.report.issues?.closed || 0,
          participationRate: data.report.issues?.participationRate || 0
        },

        weekdayActivity: data.report.weekdayActivity || [],

        contributionHeatmap: data.report.monthlyHeatmap || [],

      };

      setProfileData(transformedData);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d12] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-xl text-gray-400">Loading profile data...</p>
          <p className="text-sm text-gray-500 mt-2">Analyzing @{username}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0d12] text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/30 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) return null;

  const maxWeekdayCommits = profileData.weekdayActivity.length > 0
    ? Math.max(...profileData.weekdayActivity.map(d => d.commits || 0))
    : 1;
  const maxMonthlyCommits = profileData.contributionHeatmap.length > 0
    ? Math.max(...profileData.contributionHeatmap.map(d => d.commits || 0))
    : 1;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'activity', label: 'Activity', icon: <Activity className="w-4 h-4" /> },
    { id: 'quality', label: 'Quality', icon: <Target className="w-4 h-4" /> },
    { id: 'impact', label: 'Impact', icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white relative isolate">
      {/* Profile Header */}
      <section className="px-6 py-12 border-b border-white/10 z-50 relative mt-10">
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
                      <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2 transition-all">
                        <ExternalLink className="w-3 h-3" />
                        Website
                      </a>
                    )}
                    {profileData.twitter && (
                      <a href={`https://twitter.com/${profileData.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm flex items-center gap-2 transition-all">
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
                    {profileData.level}
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
      <div className="border-b border-white/10 sticky top-0 bg-[#0b0d12]/95 backdrop-blur-xl z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
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
                    <div className={`text-4xl font-black bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-3`}>
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
                  <span className="text-gray-500">growth</span>
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
                  {profileData.commits.perDay.toFixed(1)} per day average
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
                  <span className="text-gray-500">growth</span>
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
            {profileData.languages.length > 0 && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-400" />
                  Language Proficiency
                </h3>
                <div className="space-y-6">
                  {profileData.languages.slice(0, 5).map((lang, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg">{lang.name}</span>
                          <span className="text-sm text-gray-400">
                            {(lang.bytes / 1024).toFixed(1)} KB
                          </span>

                        </div>
                        <span className="text-2xl font-bold">{lang.percent.toFixed(1)}%</span>
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
            )}
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
            </div>

            {/* Weekday Activity */}
            {profileData.weekdayActivity.length > 0 && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Weekly Pattern
                </h3>

                <div className="h-64 flex items-end gap-4">
                  {profileData.weekdayActivity.map((item, i) => {
                    const height = maxWeekdayCommits > 0 ? (item.commits / maxWeekdayCommits) * 100 : 0;
                    return (
                      <div key={i} className="flex-1 group relative flex flex-col items-center">
                        <div className="absolute -top-12 scale-0 group-hover:scale-100 transition-transform bg-black/90 text-sm px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap z-10">
                          {item.commits} commits
                        </div>

                        <div
                          className="w-full rounded-t-2xl bg-gradient-to-t from-blue-500 to-cyan-500 transition-all duration-700 group-hover:from-blue-400 group-hover:to-cyan-400"
                          style={{ height: `${Math.max(height, 2)}%`, minHeight: '4px' }}
                        />

                        <span className="mt-3 text-sm text-gray-400">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Monthly Heatmap */}
            {profileData.contributionHeatmap.length > 0 && (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Yearly Overview
                </h3>

                <div className="grid grid-cols-12 gap-2">
                  {profileData.contributionHeatmap.map((item, i) => {
                    const intensity = maxMonthlyCommits > 0 ? (item.commits / maxMonthlyCommits) * 100 : 0;
                    return (
                      <div key={i} className="group relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/90 text-sm px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap z-10">
                          {item.month}: {item.commits} commits
                        </div>

                        <div className="aspect-square rounded-lg bg-purple-500 transition-all hover:scale-110"
                          style={{ opacity: Math.max(intensity / 100, 0.1) }}
                        />
                        <div className="text-xs text-center mt-2 text-gray-500">{item.month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-400" />
                Repository Quality
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Original Repositories</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{profileData.repositories.original}</div>
                  <div className="text-sm text-gray-400">Created from scratch</div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Active Repositories</span>
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{profileData.repositories.active}</div>
                  <div className="text-sm text-gray-400">Recently maintained</div>
                </div>

                <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Forked Repositories</span>
                    <GitBranch className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{profileData.repositories.forked}</div>
                  <div className="text-sm text-gray-400">Contributed to others</div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-500/10 border border-gray-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Archived</span>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{profileData.repositories.archived}</div>
                  <div className="text-sm text-gray-400">Completed projects</div>
                </div>
              </div>
            </div>

            {/* Top Repository */}
            {profileData.stars.topRepos.length > 0 && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Top Starred Repositories
                </h3>

                <div className="space-y-4">
                  {profileData.stars.topRepos.map((repo, i) => (
                    <div
                      key={repo.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">#{i + 1}</span>
                        <span className="text-xl font-semibold">{repo.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-yellow-400">
                        <Star className="w-5 h-5" />
                        <span className="text-xl font-bold">{repo.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                <div className="text-xs text-green-400">{profileData.pullRequests.acceptanceRate}% acceptance</div>
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
                <div className="text-xs text-blue-400">Contributed</div>
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
                  <div className="text-sm text-gray-400 mb-4">Pull Requests</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                      <span className="text-sm">Merged</span>
                      <span className="font-bold text-green-400">{profileData.pullRequests.merged}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10">
                      <span className="text-sm">Created</span>
                      <span className="font-bold text-purple-400">{profileData.pullRequests.created}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                      <span className="text-sm">Acceptance Rate</span>
                      <span className="font-bold text-blue-400">{profileData.pullRequests.acceptanceRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-4">Issues</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                      <span className="text-sm">Closed</span>
                      <span className="font-bold text-green-400">{profileData.issues.closed}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                      <span className="text-sm">Opened</span>
                      <span className="font-bold text-blue-400">{profileData.issues.opened}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10">
                      <span className="text-sm">Participation</span>
                      <span className="font-bold text-purple-400">{profileData.issues.participationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Position */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-center">

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-black mb-2">
              Leaderboard Position
            </h3>

            <p className="text-gray-400 mb-8">
              Your current standing among all analyzed GitHub developers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black text-purple-400">
                  #{profileData.globalRank}
                </div>
                <div className="text-sm text-gray-400 mt-1">Global Rank</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black text-pink-400">
                  {profileData.overallScore}
                </div>
                <div className="text-sm text-gray-400 mt-1">Score</div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold text-green-400 capitalize">
                  {profileData.level}
                </div>
                <div className="text-sm text-gray-400 mt-1">Level</div>
              </div>
            </div>

            <a
              href="/leaderboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-bold transition-all"
            >
              View Full Leaderboard
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}