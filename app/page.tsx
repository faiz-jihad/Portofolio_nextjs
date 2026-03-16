import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import PinnedProjects from '@/components/PinnedProjects';
import GithubProjects from '@/components/GithubProjects';
import GithubProfileStats from '@/components/GithubStats';
import GithubContributionGraph from '@/components/GithubContributionGraph';
import GithubActivityTimeline from '@/components/GithubActivityTimeline';
import { fetchGithubRepositories, calculateGithubStats, fetchPinnedRepositories } from '@/lib/github';
import { fetchContributionGraph, fetchGithubEvents } from '@/lib/githubActivity';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import NanoBanana from '@/components/ui/NanoBanana';

export default async function Home() {
  // All external data fetched in parallel — zero waterfall
  const [repos, contributions, events, pinned] = await Promise.all([
    fetchGithubRepositories('faiz-jihad'),
    fetchContributionGraph('faiz-jihad'),
    fetchGithubEvents('faiz-jihad'),
    fetchPinnedRepositories('faiz-jihad'),
  ]);
  const stats = calculateGithubStats(repos);

  return (
    <main className="bg-black text-white selection:bg-purple-500/30 selection:text-white">
      <ScrollProgress />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <Hero />

      {/* ── 2. ABOUT ─────────────────────────────────────────── */}
      <About />

      {/* ── 3. SKILLS ────────────────────────────────────────── */}
      <Skills />

      {/* ── 4. GITHUB STATS ──────────────────────────────────── */}
      <GithubProfileStats stats={stats} />

      {/* ── 5. PINNED PROJECTS ───────────────────────────────── */}
      <div id="projects">
        <PinnedProjects repos={pinned} />
      </div>

      {/* ── 6. ALL OPEN-SOURCE REPOS ─────────────────────────── */}
      <GithubProjects repos={repos} />

      {/* ── 7. GITHUB ACTIVITY PANEL ─────────────────────────── */}
      <section className="relative py-24 px-8 lg:px-24 flex flex-col items-center bg-black">
        <div className="max-w-7xl w-full">
          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-3">
              Developer Activity
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              GitHub <span className="font-bold">Activity</span>
            </h2>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-12">
              <GithubContributionGraph contributions={contributions} />
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <GithubActivityTimeline events={events} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. CERTIFICATIONS ────────────────────────────────── */}
      <Certifications />

      {/* ── 9. CONTACT ───────────────────────────────────────── */}
      <div id="contact">
        <Contact />
      </div>

      <NanoBanana />
    </main>
  );
}
