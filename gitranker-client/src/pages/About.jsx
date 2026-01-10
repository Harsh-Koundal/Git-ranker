import React from "react";
import {
    Github,
    Linkedin,
    Twitter,
    Code,
    Trophy,
    BarChart3,
    Target,
    Sparkles,
    Globe,
    Award,
    ExternalLink,
} from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-[#0b0d12] text-white px-6 py-24">
            <div className="max-w-6xl mx-auto space-y-32">

                {/* ---------- INTRO ---------- */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">
                            About GitRanker
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black leading-tight">
                        Built to Measure
                        <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Real Developer Impact
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
                        GitRanker is a data-driven platform that analyzes GitHub profiles
                        beyond stars and repositories — focusing on consistency, growth,
                        impact, and real contribution behavior.
                    </p>
                </section>

                {/* ---------- WHY GITRANKER ---------- */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Target className="w-8 h-8 text-cyan-400" />,
                            title: "Consistency Over Hype",
                            desc: "We reward long-term discipline, not one-time spikes or vanity metrics.",
                        },
                        {
                            icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
                            title: "Deep Analytics",
                            desc: "Contribution patterns, activity streaks, language usage, and growth trends.",
                        },
                        {
                            icon: <Trophy className="w-8 h-8 text-pink-400" />,
                            title: "Global Rankings",
                            desc: "See where you stand among developers worldwide and track improvement.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all"
                        >
                            {item.icon}
                            <h3 className="text-2xl font-bold mt-6 mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </section>

                {/* ---------- WHAT WE ANALYZE ---------- */}
                <section>
                    <h2 className="text-5xl font-black mb-12">
                        What GitRanker
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {" "}Analyzes
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Commit consistency & streaks",
                            "Repository quality & maintenance",
                            "Open-source impact",
                            "Language diversity",
                            "Profile completeness",
                            "Contribution trends",
                            "Growth over time",
                            "Global ranking position",
                            "Improvement signals",
                        ].map((text, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10"
                            >
                                <Award className="w-5 h-5 text-purple-400" />
                                <span className="text-gray-300">{text}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------- CREATOR SECTION ---------- */}
                <section className="rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] p-1">
                    <div className="rounded-3xl bg-black/80 p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* LEFT */}
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black">
                                Hi, I’m
                                <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                    Harsh Koundal
                                </span>
                            </h2>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                I’m a Software Engineer focused on designing and building scalable backend systems,
                                data-driven dashboards, and production-ready products — not throwaway demos.
                            </p>

                            <p className="text-gray-400 leading-relaxed">
                                I care deeply about clean architecture, performance, and measurable impact.
                                My work revolves around solving real problems with systems that are reliable,
                                maintainable, and built to grow.
                            </p>

                            <p className="text-gray-400 leading-relaxed">
                                I believe great engineering is a balance of logic, discipline, and continuous learning —
                                writing code that not only works, but lasts.
                            </p>
                        </div>


                        {/* RIGHT */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-4">Connect with me</h3>

                            <div className="space-y-4">
                                <ProfileLink
                                    icon={<Github />}
                                    label="GitHub"
                                    url="https://github.com/Harsh-Koundal"
                                />
                                <ProfileLink
                                    icon={<Linkedin />}
                                    label="LinkedIn"
                                    url="https://www.linkedin.com/in/harsh-koundal-0a7485369/"
                                />
                                <ProfileLink
                                    icon={<Twitter />}
                                    label="X (Twitter)"
                                    url="https://x.com/aharsh3039"
                                />
                                <ProfileLink
                                    icon={<Code />}
                                    label="LeetCode"
                                    url="https://leetcode.com/u/Harsh_Koundal/"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- FOOTER NOTE ---------- */}
                <section className="text-center text-gray-500 text-sm">
                    GitRanker is not about ego — it’s about growth, discipline,
                    and becoming a better developer over time.
                </section>

            </div>
        </div>
    );
}

/* ---------- HELPER COMPONENT ---------- */
function ProfileLink({ icon, label, url }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group"
        >
            <div className="flex items-center gap-4">
                <span className="text-purple-400">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
        </a>
    );
}
