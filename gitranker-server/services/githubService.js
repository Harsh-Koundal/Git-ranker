import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const githubREST = axios.create({
    baseURL: process.env.GITHUB_REST_URL,
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    },
    timeout:10000,
});

const githubGraphQL = axios.create({
    baseURL: process.env.GITHUB_GRAPHQL_URL,
    headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
    },
    timeout:10000,
});

const fetchAllPages = async (URL,params={})=>{
    let page = 1;
    let results = [];
    let hasNext = true;

    while (hasNext) {
        const {data} = await githubREST.get(URL, {
            params: { ...params, per_page: 100, page },
        });

        results.push(...data);
        hasNext = data.length === 100;
        page += 1;
    }
    return results;
};

// User profile
export const fetchUserProfile = async (username) => {
    const { data } = await githubREST.get(`/users/${username}`);
    return data;
};

// User repositories
export const fetchUserRepos = async (username) => {
    return await fetchAllPages(`/users/${username}/repos`, { sort: 'updated' });
};

// Repository Languages
export const fetchRepoLanguages = async (owner, repo) => {
    const { data } = await githubREST.get(`/repos/${owner}/${repo}/languages`);
    return data;
};

// Commits (per repo)
export const fetchRepoCommits = async (owner, repo, author) => {
    return await fetchAllPages(`/repos/${owner}/${repo}/commits`, { author });
};

// Pull Requests 
export const fetchPullRequests = async(username,repo)=>{
    return await fetchAllPages(
        `/repos/${username}/${repo}/pulls`,
        {state:"all"}
    );
};

// User repositories 
export const fetchAllRepositories = async (username) => {
  return await fetchAllPages(`/users/${username}/repos`, {
    sort: "updated",
    direction: "desc",
  });
};


// Issues
export const fetchIssues = async (username,repo)=>{
    return await fetchAllPages(
        `/repos/${username}/${repo}/issues`,
        {state:"all"}
    );
};

// Followers 
export const fetchFollowers = async (username) => {
  return await fetchAllPages(`/users/${username}/followers`);
};

// Stared repos
export const fetchStarredRepos = async (username) => {
  return await fetchAllPages(`/users/${username}/starred`);
};

// Contribution Calender
export const fetchContributionCalendar = async (username) => {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await githubGraphQL.post("", {
    query,
    variables: { username },
  });

  return data.data.user.contributionsCollection.contributionCalendar;
};

// Total Commits
export const fetchCommitStats = async (username) => {
  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
          contributionYears
        }
      }
    }
  `;

  const { data } = await githubGraphQL.post("", {
    query,
    variables: { username },
  });

  return data.data.user.contributionsCollection;
};


// First & Last Commit Date
export const fetchFirstAndLastCommit = async (username, repo) => {
  const commits = await fetchAllPages(
    `/repos/${username}/${repo}/commits`
  );

  if (!commits.length) return null;

  const sorted = commits.sort(
    (a, b) =>
      new Date(a.commit.author.date) -
      new Date(b.commit.author.date)
  );

  return {
    firstCommit: sorted[0].commit.author.date,
    lastCommit: sorted[sorted.length - 1].commit.author.date,
  };
};

// Rate Limit
export const checkRateLimit = async () => {
  const { data } = await githubREST.get("/rate_limit");
  return data;
};