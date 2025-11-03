'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Project } from '@/src/types';

interface ProjectCardProps {
    data: Project;
}

export default function ProjectCard({ data }: ProjectCardProps): JSX.Element {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            className="h-full cursor-pointer perspective"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' } as React.CSSProperties}
                className="relative w-full h-full"
            >
                {/* Front */}
                <motion.div
                    style={{ backfaceVisibility: 'hidden' } as React.CSSProperties}
                    className="w-full p-8 bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 rounded-xl border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all h-full flex flex-col"
                >
                    {data.image && (
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                    )}
                    <h3 className="text-2xl font-bold mb-3 text-[#00D9FF]">
                        {data.title}
                    </h3>
                    <p className="text-[#F0F4FF]/70 text-sm mb-4 line-clamp-3 flex-grow">
                        {data.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {data.technologies?.slice(0, 3).map((tech: string) => (
                            <span
                                key={tech}
                                className="text-xs bg-gradient-to-r from-[#0F52BA] to-[#7C3AED] text-[#F0F4FF] px-3 py-1 rounded-full"
                            >
                {tech}
              </span>
                        ))}
                    </div>
                    {data.metrics && (
                        <div className="flex gap-4 text-xs text-[#00D9FF]/80 mb-4">
                            <span>⭐ {data.metrics.rating}</span>
                            <span>👁️ {data.metrics.views.toLocaleString()}</span>
                            <span>❤️ {data.metrics.likes}</span>
                        </div>
                    )}
                    <p className="text-xs text-[#00D9FF]/60">Click to see details →</p>
                </motion.div>

                {/* Back */}
                <motion.div
                    style={{
                        backfaceVisibility: 'hidden',
                        rotateY: 180
                    } as React.CSSProperties}
                    className="absolute w-full h-full p-8 bg-gradient-to-br from-[#7C3AED]/30 to-[#0F52BA]/20 rounded-xl border border-[#7C3AED]/60 flex flex-col justify-between"
                >
                    <div>
                        <h4 className="text-xl font-bold mb-3 text-[#00D9FF]">Project Details</h4>
                        <p className="text-[#F0F4FF]/80 text-sm mb-4">{data.fullDescription}</p>
                    </div>
                    <div className="flex gap-3">
                        {data.liveUrl && (
                            <a
                                href={data.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0F52BA] text-[#0A0E27] rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-[#00D9FF]/30 transition"
                            >
                                Live Demo ↗
                            </a>
                        )}
                        {data.githubUrl && (
                            <a
                                href={data.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 border-2 border-[#00D9FF] text-[#00D9FF] rounded-lg text-sm font-bold hover:border-[#7C3AED] hover:text-[#7C3AED] transition"
                            >
                                View Code ↗
                            </a>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
