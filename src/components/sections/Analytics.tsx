'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Stat {
    label: string;
    value: number;
    target: number;
    unit: string;
    icon: string;
    color: string;
}

export default function Analytics(): JSX.Element {
    const [stats, setStats] = useState<Stat[]>([
        { label: 'Portfolio Views', value: 0, target: 15420, unit: '', icon: '👁️', color: 'from-blue-500' },
        { label: 'Code Quality', value: 0, target: 98, unit: '%', icon: '⭐', color: 'from-green-500' },
        { label: 'Projects Built', value: 0, target: 47, unit: '', icon: '🚀', color: 'from-purple-500' },
        { label: 'GitHub Stars', value: 0, target: 3420, unit: '', icon: '⭐', color: 'from-yellow-500' }
    ]);

    useEffect(() => {
        stats.forEach((stat, idx) => {
            let current = stat.value;
            const timer = setInterval(() => {
                if (current < stat.target) {
                    current += stat.target / 50;
                    setStats(prev => {
                        const newStats = [...prev];
                        newStats[idx] = { ...newStats[idx], value: current };
                        return newStats;
                    });
                }
            }, 30);

            return () => clearInterval(timer);
        });
    }, []);

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="analytics">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 text-[#00D9FF]">
                        📊 Live Analytics Dashboard
                    </h2>
                    <p className="text-[#F0F4FF]/60">Real-time portfolio metrics</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} to-transparent border-2 border-[#00D9FF] relative overflow-hidden`}
                        >
                            {/* Animated background */}
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-white opacity-5"
                            />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">{stat.icon}</span>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity }}
                                        className="w-8 h-8 border-2 border-[#00D9FF] border-t-transparent rounded-full"
                                    />
                                </div>

                                <h3 className="text-white font-bold mb-2">{stat.label}</h3>

                                <div className="mb-3">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(stat.value / stat.target) * 100}%` }}
                                        transition={{ duration: 2 }}
                                        className="h-2 bg-white rounded-full"
                                    />
                                </div>

                                <p className="text-2xl font-bold text-white">
                                    {Math.floor(stat.value)}{stat.unit}
                                </p>
                                <p className="text-xs text-white/60">of {stat.target}{stat.unit}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
