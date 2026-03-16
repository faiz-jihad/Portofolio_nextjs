// lib/github.ts

export type GithubRepository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
};

export type GithubStats = {
  totalRepos: number;
  totalStars: number;
  topLanguages: { language: string; count: number }[];
};

export async function fetchGithubRepositories(username: string = 'faiz-jihad'): Promise<GithubRepository[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache results, revalidate every hour
      headers: {
        // Optional: Add authorization header if available in env to prevent rate limiting
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch GitHub repositories: ${res.statusText}`);
    }

    const repos: any[] = await res.json();

    return repos
      .filter((repo) => !repo.fork) // Exclude forks
      .filter((repo) => !!repo.description) // Only show repos with description
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
      }))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()); // Sort by updated_at descending
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}

export function calculateGithubStats(repos: GithubRepository[]): GithubStats {
  const totalRepos = repos.length;
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageCounts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3); // Get top 3 languages

  return {
    totalRepos,
    totalStars,
    topLanguages,
  };
}
