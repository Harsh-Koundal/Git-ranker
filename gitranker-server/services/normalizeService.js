// Profile Normalization

export const normalizeUserProfile = (user) => {
    const createdAt = new Date(user.created_at);
    const now = new Date();
    const years = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365);

    return {
        githubUsername: user.login,
        githubId: user.id,

        fullName: user.name || user.login,
        avatarUrl: user.avatar_url,
        bio: user.bio || "",
        location: user.location || "",
        company: user.company || "",
        website: user.blog || "",
        twitter: user.twitter_username || "",

        accountCreatedAt: createdAt,
        accountAgeYears: Math.floor(years),
    };
};

// Profile Completeness

export const normalizeProfileCompleteness = (user) => {
    const checks = {
        bio: Boolean(user.bio),
        avatar: !user.avatar_url.includes("gravatar"),
        pinnedRepos: true,
        profileReadme: true,
        externalLinks: Boolean(user.blog || user.twitter_username),
    };

    const score = (Object.values(checks).filter(Boolean).length / Object.keys(checks).length) * 100;
    return {
        ...checks,
        score: Math.round(score),
    };
};

// Repository Metrics

export const normalizeRepositories = (repos) => {
    const total = repos.length;

    const forked = repos.filter((r) => r.fork).length;
    const archived = repos.filter((r) => r.archived).length;
    const original = total - forked;
    const active = repos.filter((r) => !r.archived).length;

    return {
        total,
        original,
        forked,
        archived,
        active,
    };
};

// Stars Metrics 
export const normalizeStars = (repos)=>{
    const totalStars = repos.reduce(
        (sum,repo) => sum+repo.stargazers_count,
        0
    );

    const topRepo = repos.reduce(
        (max,repo)=> repo.stargazers_count > max.stars ? {name:repo.name,stars:repo.stargazers_count} : max,
        {name:null,stars:0}
    );
    return {
        total: totalStars,
    avgPerRepo: repos.length
      ? Math.round(totalStars / repos.length)
      : 0,
    topRepo,

    };
};

// Followers
export const normalizeFollowers = (user) => {
  const followers = user.followers || 0;
  const following = user.following || 1;

  return {
    total: followers,
    followerFollowingRatio: Number(
      (followers / following).toFixed(2)
    ),
  };
};


// Language Distribution
export const normalizeLanguages = (repoLanguagesMap) => {
  const aggregate = {};

  Object.values(repoLanguagesMap).forEach((langs) => {
    Object.entries(langs).forEach(([lang, bytes]) => {
      aggregate[lang] = (aggregate[lang] || 0) + bytes;
    });
  });

  const totalBytes = Object.values(aggregate).reduce(
    (a, b) => a + b,
    0
  );

  return Object.entries(aggregate)
    .map(([name, bytes]) => ({
      name,
      percentage: totalBytes
        ? Math.round((bytes / totalBytes) * 100)
        : 0,
      commits: Math.round(bytes / 50), // heuristic
      color: "from-purple-500 to-pink-500",
    }))
    .sort((a, b) => b.percentage - a.percentage);
};


// Commits & Activity
export const normalizeCommits = (
  contributionCalendar,
  commitStats
) => {
  const days = contributionCalendar.weeks.flatMap(
    (w) => w.contributionDays
  );

  const last7days = days.slice(-7).reduce((s, d) => s + d.contributionCount, 0);
  const last30days = days.slice(-30).reduce((s, d) => s + d.contributionCount, 0);
  const last90days = days.slice(-90).reduce((s, d) => s + d.contributionCount, 0);
  const last365days = days.reduce((s, d) => s + d.contributionCount, 0);

  return {
    total: commitStats.totalCommitContributions,
    last7days,
    last30days,
    last90days,
    last365days,
    perDayAverage: Math.round(last365days / 365),
  };
};

// Streaks & Consistency
export const normalizeStreaks = (calendar) => {
  let current = 0;
  let longest = 0;
  let temp = 0;

  calendar.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      if (day.contributionCount > 0) {
        temp++;
        longest = Math.max(longest, temp);
      } else {
        temp = 0;
      }
    });
  });

  current = temp;

  return {
    current,
    longest,
    average: Math.round(longest / 3),
    breaks: calendar.weeks.length * 7 - longest,
  };
};

// Weekday Activity
export const normalizeWeekdayActivity = (calendar) => {
  const map = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  calendar.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const weekday = new Date(day.date).toLocaleDateString(
        "en-US",
        { weekday: "short" }
      );
      map[weekday] += day.contributionCount;
    });
  });

  return Object.entries(map).map(([day, commits]) => ({
    day,
    commits,
  }));
};

// Monthly HeatMap
export const normalizeMonthlyHeatmap = (calendar) => {
  const map = {};

  calendar.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const month = new Date(day.date).toLocaleString("en-US", {
        month: "short",
      });
      map[month] = (map[month] || 0) + day.contributionCount;
    });
  });

  return Object.entries(map).map(([month, commits]) => ({
    month,
    commits,
  }));
};


// Pull Requests

export const normalizePullRequests = (prs) => {
  const merged = prs.filter((p) => p.merged_at).length;

  return {
    created: prs.length,
    merged,
    acceptanceRate: prs.length
      ? Math.round((merged / prs.length) * 100)
      : 0,
    externalRepos: new Set(prs.map((p) => p.base.repo.full_name)).size,
  };
};

// Issues
export const normalizeIssues = (issues) => {
  const closed = issues.filter((i) => i.state === "closed").length;

  return {
    opened: issues.length,
    closed,
    participationRate: issues.length
      ? Math.round((closed / issues.length) * 100)
      : 0,
  };
};