'use client';

import { motion } from 'framer-motion';
import { GithubEvent } from '@/lib/githubActivity';

// ── Icons ──────────────────────────────────────────────────────────────────
const PushIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const PullRequestIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const IssueIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const CreateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

// ── Helpers ─────────────────────────────────────────────────────────────────
function getEventMeta(event: GithubEvent): {
  icon: React.ReactNode;
  label: string;
  color: string;
} {
  switch (event.type) {
    case 'PushEvent':
      const commits = event.payload?.commits?.length ?? 0;
      return {
        icon: <PushIcon />,
        label: `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to`,
        color: 'text-purple-400',
      };
    case 'PullRequestEvent':
      const prAction = event.payload?.action ?? 'updated';
      return {
        icon: <PullRequestIcon />,
        label: `${capitalize(prAction)} a pull request in`,
        color: 'text-blue-400',
      };
    case 'IssuesEvent':
      const issueAction = event.payload?.action ?? 'opened';
      return {
        icon: <IssueIcon />,
        label: `${capitalize(issueAction)} an issue in`,
        color: 'text-yellow-400',
      };
    case 'CreateEvent':
      const ref = event.payload?.ref_type ?? 'repository';
      return {
        icon: <CreateIcon />,
        label: `Created a new ${ref} in`,
        color: 'text-cyan-400',
      };
    default:
      return {
        icon: <CreateIcon />,
        label: 'Interacted with',
        color: 'text-white/50',
      };
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function GithubActivityTimeline({ events }: { events: GithubEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-white/30 text-sm font-mono text-center py-8">
        No recent activity available.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-white tracking-tight mb-6">Recent Activity</h3>

      <div className="relative flex flex-col">
        {/* Vertical timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-white/10 to-transparent" />

        {events.map((event, i) => {
          const { icon, label, color } = getEventMeta(event);
          const repo = event.repo.name;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative flex items-start gap-4 pb-6 pl-2"
            >
              {/* Icon bubble */}
              <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${color}`}>
                {icon}
              </div>

              {/* Text */}
              <div className="flex-grow pt-1 min-w-0">
                <p className="text-sm text-white/70 font-light leading-snug">
                  {label}{' '}
                  <a
                    href={`https://github.com/${repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-semibold ${color} hover:underline break-all`}
                  >
                    {repo}
                  </a>
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">{timeAgo(event.created_at)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
