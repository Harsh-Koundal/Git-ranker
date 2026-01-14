const clamp = (value, min = 0, max = 100) => {
  return Math.min(Math.max(value, min), max);
};

const normalize = (value, maxExpected) => {
  if (!maxExpected || isNaN(value)) return 0;
  return clamp((value / maxExpected) * 100);
};

// Consistency Score
export const calculateConsistencyScore = ({commits,streak})=>{
    const commitActivityScore = normalize(commits.last365days,2000);
    const streakScore = normalize(streak.current,120);

    const score = commitActivityScore * 0.6 + streakScore * 0.4;

    return clamp(Math.round(score));
};

// Volume Score
export const calculateVolumeScore = ({repos,commits})=>{
    const repoScore = normalize(repos.total,80);
    const commitScore = normalize(commits.total,10000);

    const score = repoScore * 0.4 + commitScore * 0.6;
    return clamp(Math.round(score));
}

// Quality Score
export const calculateQualityScore = ({ repos, profileCompleteness }) => {
  const originalRatio = repos.total
    ? (repos.original / repos.total) * 100
    : 0;

  const activeRatio = repos.total
    ? (repos.active / repos.total) * 100
    : 0;

  const hygieneScore =
    originalRatio * 0.6 +
    activeRatio * 0.4;

  const completenessBoost = profileCompleteness.score * 0.2;

  const score = hygieneScore * 0.8 + completenessBoost;

  return clamp(Math.round(score));
};


// Impact Score 
export const calculateImpactScore = ({ stars, followers, prs }) => {
  const starsScore = normalize(stars.total, 5000);
  const followerScore = normalize(followers.total, 2000);
  const prScore = normalize(prs.merged, 300);

  const score =
    starsScore * 0.5 +
    followerScore * 0.3 +
    prScore * 0.2;

  return clamp(Math.round(score));
};


// Profile Score
export const calculateProfileScore = ({ profileCompleteness }) => {
  return clamp(profileCompleteness.score);
};


// Final Score
export const calculateFinalScore = ({
  consistency,
  volume,
  quality,
  impact,
  profile,
}) => {
  const finalScore =
    consistency * 0.3 +
    volume * 0.25 +
    quality * 0.2 +
    impact * 0.15 +
    profile * 0.1;

  return Math.round(finalScore);
};

// Full Score
export const generateScoreReport = ({
  commits,
  streak,
  repos,
  stars,
  followers,
  prs,
  profileCompleteness,
}) => {
  const consistency = calculateConsistencyScore({ commits, streak });
  const volume = calculateVolumeScore({ repos, commits });
  const quality = calculateQualityScore({ repos, profileCompleteness });
  const impact = calculateImpactScore({ stars, followers, prs });
  const profile = calculateProfileScore({ profileCompleteness });

  const overallScore = calculateFinalScore({
    consistency,
    volume,
    quality,
    impact,
    profile,
  });

  return {
    overallScore,

    level:
      overallScore >= 90
        ? "Elite"
        : overallScore >= 75
        ? "Advanced"
        : overallScore >= 60
        ? "Intermediate"
        : "Beginner",

    categoryScores: {
      consistency: { score: consistency, weight: 30 },
      volume: { score: volume, weight: 25 },
      quality: { score: quality, weight: 20 },
      impact: { score: impact, weight: 15 },
      profile: { score: profile, weight: 10 },
    },
  };
};