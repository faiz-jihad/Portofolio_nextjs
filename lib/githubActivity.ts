// lib/githubActivity.ts

export type ContributionDay = {
  date: string;
  count: number;
};

export type GithubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
};

// --------------------------------------------------------------------------
// Contribution Graph (via GitHub GraphQL API - requires GITHUB_TOKEN)
// --------------------------------------------------------------------------
export async function fetchContributionGraph(
  username: string = 'faiz-jihad'
): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    // If no PAT is available, return empty so the UI can show a placeholder
    console.warn('GITHUB_TOKEN is not set. Cannot fetch contribution data.');
    return [];
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
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

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GraphQL request failed: ${res.statusText}`);

    const json = await res.json();
    const weeks =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

    return weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
      }))
    );
  } catch (error) {
    console.error('Error fetching contribution graph:', error);
    return [];
  }
}

// --------------------------------------------------------------------------
// Activity Timeline (via GitHub REST API, public — no token needed)
// --------------------------------------------------------------------------
export async function fetchGithubEvents(
  username: string = 'faiz-jihad'
): Promise<GithubEvent[]> {
  const SUPPORTED_TYPES = ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'];

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events?per_page=30`,
      {
        next: { revalidate: 3600 },
        headers: {
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      }
    );

    if (!res.ok) throw new Error(`REST request failed: ${res.statusText}`);

    const events: GithubEvent[] = await res.json();

    return events
      .filter((e) => SUPPORTED_TYPES.includes(e.type))
      .slice(0, 10); // Return only the 10 most recent events
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    return [];
  }
}
