'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ContributionDay {
    date: string;
    count: number;
}

export default function ContributionGraph(): JSX.Element {
    const [contributions, setContributions] = useState<ContributionDay[]>([]);

    useEffect(() => {
        // Generate mock contribution data (52 weeks)
        const data: ContributionDay[] = [];
        const today = new Date();

        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            data.push({
                date: date.toISOString().split('T')[0],
                count: Math.floor(Math.random() * 20) // 0-20 commits per day
            });
        }

        setContributions(data);
    }, []);

    const getColor = (count: number) => {
        if (count === 0) return 'bg-[#0F52BA]/20';
        if (count < 5) return 'bg-[#0F52BA]/40';
        if (count < 10) return 'bg-[#00D9FF]/50';
        if (count < 15) return 'bg-[#7C3AED]/60';
        return 'bg-[#7C3AED]';
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="contributions">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-[#00D9FF]">
                        📊 Contribution Activity
                    </h2>
                    <p className="text-[#F0F4FF]/60">Last 52 weeks of coding</p>
                </motion.div>

                {/* Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="overflow-x-auto pb-6"
                >
                    <div className="grid grid-cols-52 gap-1 min-w-max p-6 rounded-xl bg-[#0F52BA]/10 border border-[#00D9FF]/30">
                        {contributions.map((day, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.5, zIndex: 10 }}
                                title={`${day.date}: ${day.count} contributions`}
                                className={`w-4 h-4 rounded ${getColor(day.count)} cursor-pointer border border-[#00D9FF]/20 hover:border-[#00D9FF] transition-all`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-8 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#0F52BA]/20" />
                        <span className="text-[#F0F4FF]/60">Less</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#7C3AED]" />
                        <span className="text-[#F0F4FF]/60">More</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
