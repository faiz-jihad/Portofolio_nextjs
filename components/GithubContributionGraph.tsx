'use client';

import { motion } from 'framer-motion';
import { ContributionDay } from '@/lib/githubActivity';
import { useState } from 'react';

const CELL_SIZE = 12; // px
const CELL_GAP = 3; // px

function getColor(count: number): string {
  if (count === 0) return 'bg-white/5';
  if (count <= 3) return 'bg-emerald-900';
  if (count <= 6) return 'bg-emerald-600';
  return 'bg-emerald-400';
}

function getShadow(count: number): string {
  if (count === 0) return '';
  if (count <= 3) return 'shadow-[0_0_4px_rgba(52,211,153,0.3)]';
  if (count <= 6) return 'shadow-[0_0_6px_rgba(52,211,153,0.5)]';
  return 'shadow-[0_0_8px_rgba(52,211,153,0.8)]';
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Group flat days array into 7-row columns (weeks), filling the first column
function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

// Generate placeholder data when no token is available
function generatePlaceholder(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().split('T')[0],
      count: Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 12),
    });
  }
  return days;
}

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

export default function GithubContributionGraph({
  contributions,
}: {
  contributions: ContributionDay[];
}) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const data = contributions.length > 0 ? contributions : generatePlaceholder();
  const weeks = groupIntoWeeks(data);
  const totalContributions = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight">Contribution Graph</h3>
        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      {/* Scrollable graph container */}
      <div className="relative overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {/* Day labels column */}
          <div className="flex flex-col gap-[3px] pr-1 pt-6">
            {DAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="text-[10px] font-mono text-white/30 leading-none"
                style={{ height: CELL_SIZE, lineHeight: `${CELL_SIZE}px` }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          {weeks.map((week, wIdx) => (
            <motion.div
              key={wIdx}
              className="flex flex-col gap-[3px]"
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: wIdx * 0.01, ease: 'easeOut' }}
              style={{ transformOrigin: 'bottom' }}
            >
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className={`rounded-sm cursor-pointer transition-all duration-200 hover:scale-125 ${getColor(day.count)} ${getShadow(day.count)}`}
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parentRect = e.currentTarget.closest('.relative')!.getBoundingClientRect();
                    setTooltip({
                      text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`,
                      x: rect.left - parentRect.left + CELL_SIZE / 2,
                      y: rect.top - parentRect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-lg bg-gray-900 border border-white/10 text-white text-xs font-mono whitespace-nowrap shadow-xl"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[10px] text-white/30 font-mono">Less</span>
        {[0, 1, 4, 7, 10].map((n) => (
          <div key={n} className={`w-3 h-3 rounded-sm ${getColor(n)} ${getShadow(n)}`} />
        ))}
        <span className="text-[10px] text-white/30 font-mono">More</span>
      </div>
    </div>
  );
}
