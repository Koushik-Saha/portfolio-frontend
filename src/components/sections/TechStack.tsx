'use client';

import { motion } from 'framer-motion';

const techStack = [
    { name: 'React', icon: '⚛️', color: 'from-blue-500' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-600' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-500' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-600' },
    { name: 'GraphQL', icon: '◆', color: 'from-pink-500' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-500' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-400' },
];

export default function TechStack(): JSX.Element {
    return (
        <section className="relative py-24 px-4 overflow-hidden" id="tech-stack">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold mb-12 text-[#00D9FF]"
                >
                    🛠️ Tech Stack
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {techStack.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`p-4 rounded-lg bg-gradient-to-br ${tech.color} to-transparent border-2 border-[#00D9FF] flex flex-col items-center gap-2 cursor-pointer`}
                        >
                            <span className="text-3xl">{tech.icon}</span>
                            <span className="text-xs font-bold text-white">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
