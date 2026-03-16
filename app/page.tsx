import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import GithubProjects from '@/components/GithubProjects';
import GithubProfileStats from '@/components/GithubStats';
import GithubContributionGraph from '@/components/GithubContributionGraph';
import GithubActivityTimeline from '@/components/GithubActivityTimeline';
import { fetchGithubRepositories, calculateGithubStats } from '@/lib/github';
import { fetchContributionGraph, fetchGithubEvents } from '@/lib/githubActivity';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import NanoBanana from '@/components/ui/NanoBanana';

export default async function Home() {
  // Fetch all data in parallel for performance
  const [repos, contributions, events] = await Promise.all([
    fetchGithubRepositories('faiz-jihad'),
    fetchContributionGraph('faiz-jihad'),
    fetchGithubEvents('faiz-jihad'),
  ]);
  const stats = calculateGithubStats(repos);

  return (
    <main className="bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <ScrollProgress />
      
      {/* The Scrollytelling Section */}
      <div className="relative z-10">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* The Post-Scroll Content Section */}
      <div className="relative z-20 bg-black pt-16">
        <GithubProfileStats stats={stats} />
        <GithubProjects repos={repos} />

        {/* GitHub Activity Panel */}
        <section className="relative py-24 px-8 lg:px-24 flex flex-col items-center">
          <div className="max-w-7xl w-full">
            {/* Section header */}
            <div className="mb-12">
              <p className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
                Developer Activity
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                GitHub <span className="font-bold">Activity</span>
              </h2>
            </div>

            {/* Glassmorphism wrapper */}
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-12">
                {/* Contribution graph (full width) */}
                <GithubContributionGraph contributions={contributions} />

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Activity timeline (full width, scrollable on mobile) */}
                <GithubActivityTimeline events={events} />
              </div>
            </div>
          </div>
        </section>

        <Skills />
        <Contact />
      </div>
      
      <NanoBanana />
    </main>
  );
}
