'use client';

import { motion } from 'framer-motion';
import { Experience } from '@/src/types';
import {JSX} from "react";

interface ExperienceCardProps {
    data: Experience;
}

export default function ExperienceCard({ data }: ExperienceCardProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 hover:border-blue-500 transition-colors"
        >
            <h3 className="text-2xl font-bold mb-1 text-blue-400">{data.title}</h3>
            <p className="text-purple-400 font-semibold mb-1">{data.company}</p>
            <p className="text-gray-400 text-sm mb-4">{data.duration}</p>
            <p className="text-gray-300 text-sm mb-4">{data.description}</p>

            {/* Achievements */}
            <ul className="space-y-2 mb-4">
                {data.achievements?.slice(0, 3).map((achievement: string, idx: number) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-gray-400 text-sm flex items-start gap-2"
                    >
                        <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                        {achievement}
                    </motion.li>
                ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {data.technologies?.map((tech: string) => (
                    <span key={tech} className="text-xs bg-blue-900 text-blue-300 px-3 py-1 rounded-full">
            {tech}
          </span>
                ))}
            </div>
        </motion.div>
    );
}
