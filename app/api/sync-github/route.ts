import { NextResponse } from 'next/server';
import { fetchGithubRepositories } from '@/lib/github';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = "force-dynamic"

export async function POST() {
  try {
    const repos = await fetchGithubRepositories('faiz-jihad');
    
    if (!repos || repos.length === 0) {
      return NextResponse.json({ message: "No repositories found to sync." }, { status: 404 });
    }
    
    // Map GitHub API response to match the requested Supabase 'projects' table columns
    const formattedRepos = repos.map(repo => ({
      title: repo.name,
      description: repo.description,
      github_url: repo.html_url,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updated_at: repo.updated_at
    }));

    // Upsert expects a unique constraint on github_url.
    // If you don't have one, this might duplicate entries on subsequent syncs.
    const { data, error } = await supabase
      .from('projects')
      .upsert(formattedRepos, { onConflict: 'github_url', ignoreDuplicates: false }); 

    if (error) {
      console.error("Supabase Sync Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
        message: `Successfully synced ${repos.length} repositories to Supabase.`, 
        data 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
