'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GitHubRepo {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
}

export default function GitHubProjects(): JSX.Element {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHubRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Koushik-Saha/repos?sort=stars&per_page=6');
                const data = await response.json();

                const formatted = data.map((repo: any) => ({
                    name: repo.name,
                    description: repo.description || 'No description',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language || 'Unknown',
                    url: repo.html_url
                }));

                setRepos(formatted);
            } catch (error) {
                console.error('GitHub fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubRepos();
    }, []);

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="github">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]">
                        🐙 GitHub Repositories
                    </h2>
                    <p className="text-[#F0F4FF]/60">Live projects from GitHub</p>
                </motion.div>

                {/* Repos Grid */}
                {loading ? (
                    <div className="text-center text-[#00D9FF]">Loading repositories...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, idx) => (
                            <motion.a
                                key={idx}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                className="p-6 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border-2 border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-[#00D9FF]">{repo.name}</h3>
                                    <span className="text-xs bg-[#7C3AED] text-white px-3 py-1 rounded-full">
                    {repo.language}
                  </span>
                                </div>

                                <p className="text-[#F0F4FF]/70 text-sm mb-4 line-clamp-2">
                                    {repo.description}
                                </p>

                                <div className="flex gap-6 text-sm text-[#F0F4FF]/60">
                                    <span>⭐ {repo.stars}</span>
                                    <span>🍴 {repo.forks}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
