'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Skill } from '@/src/types';

interface SkillCardProps {
    data: Skill;
}

export default function SkillCard({ data }: SkillCardProps): JSX.Element {
    const [count, setCount] = useState<number>(0);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const end = data.proficiency;
        const duration = 2000;
        const increment = (end / duration) * 50;

        const timer = setInterval(() => {
            start += increment;
            setCount(Math.min(Math.floor(start), end));
        }, 50);

        return () => clearInterval(timer);
    }, [inView, data.proficiency]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all glass-hover"
        >
            {data.icon && (
                <img src={data.icon} alt={data.name} className="w-12 h-12 mb-3" />
            )}
            <h3 className="text-xl font-bold mb-1 text-[#F0F4FF]">{data.name}</h3>
            <p className="text-xs text-[#00D9FF]/70 mb-4 font-medium uppercase tracking-wider">{data.category}</p>

            {/* Progress Bar with Gradient */}
            <div className="mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${data.proficiency}%` } : { width: 0 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    className="h-3 bg-gradient-to-r from-[#00D9FF] via-[#0F52BA] to-[#7C3AED] rounded-full shadow-lg shadow-[#00D9FF]/40"
                />
            </div>

            <div className="flex justify-between items-center">
                <span className="text-[#F0F4FF]/60 text-sm font-medium">{data.yearsOfExperience} yrs</span>
                <span className="text-[#00D9FF] font-bold text-lg">{count}%</span>
            </div>
        </motion.div>
    );
}
