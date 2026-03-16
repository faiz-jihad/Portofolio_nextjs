'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Icon } from '@iconify/react';

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
      setTimeout(() => setStatus('idle'), 5000); 
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
                <a href="https://github.com/faiz-jihad" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 backdrop-blur-md">
                    <Icon icon="mdi:github" width={24} height={24} />
                    <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/faiz-jihad-al-baihaqi-08a947321/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 backdrop-blur-md">
                    <Icon icon="mdi:linkedin" width={24} height={24} />
                    <span className="sr-only">LinkedIn</span>
                </a>

                <a href="https://www.instagram.com/faizalbaihaqi_/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 bg-white/5 border border-white/10 backdrop-blur-md">
                    <Icon icon="mdi:instagram" width={24} height={24} />
                    <span className="sr-only">Instagram</span>
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
                        placeholder="nama kamu"
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
                        placeholder="emalmu@gmail.com"
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
                            <Icon icon="mdi:arrow-right" width={16} height={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                        )}
                        {status === 'success' && (
                            <Icon icon="mdi:check" width={16} height={16} className="text-green-600" />
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
