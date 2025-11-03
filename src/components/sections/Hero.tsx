'use client';

import { motion } from 'framer-motion';
import { Profile } from '@/src/types';

interface HeroProps {
    profile: Profile;
}

export default function Hero({ profile }: HeroProps): JSX.Element {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8 },
        }),
    };

    const stats = profile.stats || [
        { label: '6+ Years', value: 'Experience' },
        { label: '1M+', value: 'Users Served' },
        { label: '$180K', value: 'Cost Optimized' },
        { label: '8', value: 'Engineers Mentored' }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 pb-20">
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0F52BA]/10 to-[#0A0E27]" />

            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#00D9FF]/20 to-transparent rounded-full blur-3xl"
                animate={{
                    y: [0, 50, 0],
                    x: [0, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-full blur-3xl"
                animate={{
                    y: [0, -50, 0],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="relative z-10 text-center max-w-5xl px-4">
                {/* Profile Image */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative w-fit mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] rounded-full blur-lg opacity-50" />
                        <img
                            src={profile.profileImage}
                            alt={profile.name}
                            className="w-40 h-40 rounded-full border-4 border-[#00D9FF]/50 relative z-10"
                        />
                    </motion.div>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] via-[#0F52BA] to-[#7C3AED]"
                >
                    {profile.name}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="text-3xl md:text-4xl font-semibold mb-6 text-[#F0F4FF]/90"
                >
                    {profile.title}
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="text-lg md:text-xl text-[#00D9FF]/80 mb-8 max-w-3xl mx-auto font-medium"
                >
                    {profile.tagline}
                </motion.p>

                {/* Bio */}
                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="text-base md:text-lg text-[#F0F4FF]/70 mb-12 max-w-4xl mx-auto leading-relaxed"
                >
                    {profile.bio}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                >
                    {stats.map((stat: { label: string; value: string }, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 bg-gradient-to-br from-[#0F52BA]/30 to-[#7C3AED]/20 rounded-lg border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-[#00D9FF] mb-1">
                                {stat.label}
                            </div>
                            <div className="text-[#F0F4FF]/70 text-sm md:text-base">
                                {stat.value}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                    className="flex gap-4 justify-center flex-wrap mb-12"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-[#00D9FF] to-[#0F52BA] rounded-lg font-bold text-[#0A0E27] hover:shadow-lg transition-all"
                    >
                        View My Work →
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, borderColor: '#00D9FF' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 border-2 border-[#00D9FF]/50 rounded-lg font-bold text-[#00D9FF] hover:border-[#00D9FF] transition-all"
                    >
                        Let's Connect ↗
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={6}
                    className="flex justify-center gap-4 flex-wrap"
                >
                    {profile.socials?.map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, color: '#00D9FF' }}
                            className="w-12 h-12 rounded-full border-2 border-[#00D9FF]/40 hover:border-[#00D9FF] text-[#F0F4FF] hover:text-[#00D9FF] flex items-center justify-center transition-all text-lg"
                            title={social.name}
                        >
                            {social.name === 'GitHub' && '🐙'}
                            {social.name === 'LinkedIn' && '💼'}
                            {social.name === 'Twitter' && '𝕏'}
                            {social.name === 'Email' && '✉️'}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-8 h-12 border-2 border-[#00D9FF]/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="w-1.5 h-2 bg-[#00D9FF]/70 rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
