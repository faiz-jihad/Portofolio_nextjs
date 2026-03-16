'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Project = {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image_url: string;
  featured: boolean;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true)
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
            setProjects(data);
        } else {
            // Fallback mock data if the Supabase table is empty or missing
            setProjects([
              { 
                id: 1, 
                title: 'Toko Roni POS System', 
                description: 'A scalable Point of Sale architecture.',
                tech_stack: ['Laravel', 'React'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
              { 
                id: 2, 
                title: 'Identifkation Skin Disease APP', 
                description: 'Cross-platform mobile commerce experience.',
                tech_stack: ['Flutter', 'FLASK'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
              { 
                id: 3, 
                title: 'AI Skin Disease Model Training', 
                description: 'Machine learning pipeline for predictive analysis.',
                tech_stack: ['Python', 'ML'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
              { 
                id: 4, 
                title: 'WEB Booking Badminton Field', 
                description: 'Fullstack Next.js web application.',
                tech_stack: ['Laravel', 'React'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
              { 
                id: 5, 
                title: 'BUMDES COMPANY PROFILE', 
                description: 'Web application and e-commerce platform.',
                tech_stack: ['Laravel', 'React'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
              { 
                id: 6, 
                title: 'WEB QUIZ APP', 
                description: 'Interactive quiz application.',
                tech_stack: ['Laravel', 'React'], 
                github_url: '#', 
                live_url: '#',
                image_url: '',
                featured: true
              },
            ]);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
        <section className="relative min-h-screen bg-black text-white py-32 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin"></div>
        </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-white py-32 px-8 lg:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light mb-16 tracking-tight"
        >
          Selected <span className="font-bold">Work</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 50px rgba(139, 92, 246, 0.15)", // Subtle purple glow
                borderColor: "rgba(255, 255, 255, 0.3)"
              }}
              className="group relative flex flex-col justify-between overflow-hidden cursor-pointer
                         bg-white/[0.03] backdrop-blur-2xl border border-white/5 transition-all duration-500 rounded-2xl p-8"
              style={{ minHeight: '300px' }}
            >
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech, idx) => (
                        <p key={idx} className="text-xs font-mono text-white/50 uppercase tracking-widest">{tech}</p>
                    ))}
                </div>
                <div className="flex gap-3">
                    {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                        </a>
                    )}
                    {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">Live Demo</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                    )}
                </div>
              </div>

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 mt-8">
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                    {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
