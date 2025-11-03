'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Profile } from '@/src/types';

interface ContactProps {
    profile: Profile;
}

export default function Contact({ profile }: ContactProps): JSX.Element {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Send email via backend
            const response = await fetch('http://localhost:5100/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setStatus('success');
            setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });

            // Reset after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setStatusMessage('');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setStatusMessage('Failed to send message. Please try again or email directly.');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = 'http://localhost:5100/resume.pdf';
        link.download = 'Koushik_Saha_Resume.pdf';
        link.click();
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="contact">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F52BA]/5 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]">
                        Let's Connect
                    </h2>
                    <p className="text-[#F0F4FF]/60 text-lg">
                        Have a project in mind? Let's talk about it.
                    </p>
                </motion.div>

                {/* Contact Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-12"
                >
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Email */}
                        <motion.a
                            href={`mailto:${profile.email}`}
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all"
                        >
                            <div className="text-3xl">📧</div>
                            <div>
                                <h3 className="text-lg font-bold text-[#00D9FF] mb-1">Email</h3>
                                <p className="text-[#F0F4FF]/80">{profile.email}</p>
                                <p className="text-sm text-[#F0F4FF]/60 mt-1">I'll respond within 24 hours</p>
                            </div>
                        </motion.a>

                        {/* Phone */}
                        <motion.a
                            href={`tel:${profile.phone}`}
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all"
                        >
                            <div className="text-3xl">📱</div>
                            <div>
                                <h3 className="text-lg font-bold text-[#00D9FF] mb-1">Phone</h3>
                                <p className="text-[#F0F4FF]/80">{profile.phone}</p>
                                <p className="text-sm text-[#F0F4FF]/60 mt-1">Available for calls</p>
                            </div>
                        </motion.a>

                        {/* Location */}
                        <motion.div
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border border-[#00D9FF]/30"
                        >
                            <div className="text-3xl">📍</div>
                            <div>
                                <h3 className="text-lg font-bold text-[#00D9FF] mb-1">Location</h3>
                                <p className="text-[#F0F4FF]/80">{profile.location}</p>
                                <p className="text-sm text-[#F0F4FF]/60 mt-1">Open to remote & relocation</p>
                            </div>
                        </motion.div>

                        {/* Resume Download */}
                        <motion.button
                            onClick={downloadResume}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0F52BA] text-[#0A0E27] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/40 transition-all flex items-center justify-center gap-2"
                        >
                            <span>📥 Download Resume</span>
                        </motion.button>
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-[#00D9FF] mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-3 rounded-lg bg-[#0F52BA]/20 border border-[#00D9FF]/30 focus:border-[#00D9FF] text-[#F0F4FF] placeholder-[#F0F4FF]/40 outline-none transition-all focus:shadow-lg focus:shadow-[#00D9FF]/20"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-[#00D9FF] mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-[#0F52BA]/20 border border-[#00D9FF]/30 focus:border-[#00D9FF] text-[#F0F4FF] placeholder-[#F0F4FF]/40 outline-none transition-all focus:shadow-lg focus:shadow-[#00D9FF]/20"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-bold text-[#00D9FF] mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell me about your project..."
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg bg-[#0F52BA]/20 border border-[#00D9FF]/30 focus:border-[#00D9FF] text-[#F0F4FF] placeholder-[#F0F4FF]/40 outline-none transition-all focus:shadow-lg focus:shadow-[#00D9FF]/20 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#00D9FF] text-[#0A0E27] font-bold rounded-lg hover:shadow-lg hover:shadow-[#7C3AED]/40 transition-all disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </motion.button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm"
                            >
                                ✅ {statusMessage}
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm"
                            >
                                ❌ {statusMessage}
                            </motion.div>
                        )}

                        {/* Social Links */}
                        <div className="pt-4 border-t border-[#00D9FF]/20">
                            <p className="text-sm text-[#F0F4FF]/60 mb-3">Or connect with me on:</p>
                            <div className="flex gap-3">
                                {profile.socials?.map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2 }}
                                        className="w-10 h-10 rounded-full border-2 border-[#00D9FF] text-[#00D9FF] flex items-center justify-center hover:bg-[#00D9FF]/10 transition-all text-lg"
                                    >
                                        {social.name === 'GitHub' && '🐙'}
                                        {social.name === 'LinkedIn' && '💼'}
                                        {social.name === 'Twitter' && '𝕏'}
                                        {social.name === 'Email' && '✉️'}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
}
