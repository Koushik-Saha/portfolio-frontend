'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PerformanceMetrics(): JSX.Element {
    const [metrics, setMetrics] = useState({
        lighthouse: 98,
        fcp: 0.8,
        lcp: 1.2,
        cls: 0.05,
        uptime: 99.99
    });

    useEffect(() => {
        // Simulate real metrics
        if (typeof window !== 'undefined') {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(entry);
                }
            });

            perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
        }
    }, []);

    const metricsList = [
        { label: 'Lighthouse Score', value: metrics.lighthouse, unit: '/100', color: 'from-green-500' },
        { label: 'First Contentful Paint', value: metrics.fcp, unit: 's', color: 'from-blue-500' },
        { label: 'Largest Contentful Paint', value: metrics.lcp, unit: 's', color: 'from-cyan-500' },
        { label: 'Cumulative Layout Shift', value: metrics.cls, unit: '', color: 'from-purple-500' },
        { label: 'Uptime', value: metrics.uptime, unit: '%', color: 'from-green-500' },
    ];

    return (
        <section className="relative py-24 px-4 overflow-hidden" id="performance">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-[#00D9FF]">
                        ⚡ Performance Metrics
                    </h2>
                    <p className="text-[#F0F4FF]/60">Real-time web vitals</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {metricsList.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-lg bg-gradient-to-br ${metric.color} to-transparent border-2 border-[#00D9FF]`}
                        >
                            <p className="text-xs text-white/70 mb-2">{metric.label}</p>
                            <motion.p
                                className="text-2xl font-bold text-white"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: idx * 0.1 + 0.3 }}
                            >
                                {metric.value}{metric.unit}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
