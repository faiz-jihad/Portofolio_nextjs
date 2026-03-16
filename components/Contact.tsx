'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // Reset after 5s
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus('error');
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white py-32 px-8 lg:px-24 flex flex-col items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[150px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
        <div className="text-left">
            <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono tracking-widest uppercase text-sm mb-6"
            >
            What's Next?
            </motion.p>
            
            <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
            >
            Let's build something <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">extraordinary.</span>
            </motion.h2>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex gap-4 items-center"
            >
                <a href="https://github.com/faizjihad" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 backdrop-blur-md">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">GitHub</span>
                </a>
                <a href="https://linkedin.com/in/faizjihad" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 backdrop-blur-md">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">LinkedIn</span>
                </a>
            </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-white/60 font-medium">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        required
                        disabled={status === 'submitting'}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-light"
                        placeholder="John Doe"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-white/60 font-medium">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        required
                        disabled={status === 'submitting'}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-light"
                        placeholder="john@example.com"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-white/60 font-medium">Message</label>
                    <textarea 
                        id="message"
                        required
                        rows={4}
                        disabled={status === 'submitting'}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none font-light"
                        placeholder="Tell me about your project..."
                    />
                </div>
                
                <button 
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className="mt-2 w-full group/btn relative px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-cyan-200 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"/>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                        {status === 'idle' && (
                            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        )}
                        {status === 'success' && (
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        )}
                    </span>
                </button>
                {status === 'error' && (
                    <p className="text-red-400 text-sm text-center">There was an error sending your message. Please try again.</p>
                )}
            </form>
        </motion.div>
      </div>
      
      {/* Footer text */}
      <div className="absolute bottom-8 left-0 w-full text-center text-white/30 text-xs font-mono">
         <p>© {new Date().getFullYear()} Faiz Jihad Al Baihaqi. All rights reserved.</p>
      </div>
    </section>
  );
}
