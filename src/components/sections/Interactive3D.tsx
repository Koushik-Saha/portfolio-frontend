'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project3D {
    id: number;
    title: string;
    description: string;
    icon: string;
    metrics: string;
    color: string;
}

const projects3D: Project3D[] = [
    {
        id: 1,
        title: 'Powerley PWA',
        description: 'Scaled to 1M+ users',
        icon: '🚀',
        metrics: '99.9% Uptime',
        color: 'from-blue-500'
    },
    {
        id: 2,
        title: 'Micro-Frontend',
        description: '30% cost reduction',
        icon: '🏗️',
        metrics: '25% Faster',
        color: 'from-purple-500'
    },
    {
        id: 3,
        title: 'SVG Editor',
        description: '$500K contracts',
        icon: '✏️',
        metrics: '98 Lighthouse',
        color: 'from-cyan-500'
    },
    {
        id: 4,
        title: 'E-Commerce',
        description: '$2M+ transactions',
        icon: '🛒',
        metrics: '35% Conversion↑',
        color: 'from-pink-500'
    }
];

export default function Interactive3D(): JSX.Element {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - rect.top) / rect.height - 0.5;
        const y = (e.clientX - rect.left) / rect.width - 0.5;
        setRotation({ x: x * 20, y: y * 20 });
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="3d-projects">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]">
                        🌀 3D Project Universe
                    </h2>
                    <p className="text-[#F0F4FF]/60">Hover to rotate • Click to explore</p>
                </motion.div>

                {/* 3D Grid */}
                <div
                    onMouseMove={handleMouseMove}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 perspective"
                >
                    {projects3D.map((project) => (
                        <motion.div
                            key={project.id}
                            style={{
                                rotateX: rotation.x,
                                rotateY: rotation.y,
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotateZ: 5,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedId(selectedId === project.id ? null : project.id)}
                            className={`h-64 rounded-2xl bg-gradient-to-br ${project.color} to-transparent p-6 border-2 border-[#00D9FF] cursor-pointer relative overflow-hidden group`}
                        >
                            {/* Animated Background */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%'],
                                }}
                                transition={{ duration: 20, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
                            />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-5xl mb-2">{project.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-white/80">{project.description}</p>
                                </div>

                                <motion.div
                                    animate={selectedId === project.id ? { y: 0 } : { y: 20 }}
                                    className={`text-sm font-bold text-white ${
                                        selectedId === project.id ? 'block' : 'hidden group-hover:block'
                                    }`}
                                >
                                    {project.metrics}
                                </motion.div>
                            </div>

                            {/* Glow Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    boxShadow: `0 0 30px ${project.color.match(/\w+/)?.[0]}`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
