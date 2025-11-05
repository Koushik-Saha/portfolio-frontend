'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function VisitorCounter(): JSX.Element {
    const [visitors, setVisitors] = useState(0);
    const [displayVisitors, setDisplayVisitors] = useState(0);

    useEffect(() => {
        // Get visitors from localStorage or API
        const storedVisitors = localStorage.getItem('portfolio_visitors') || '0';
        const count = parseInt(storedVisitors) + 1;

        setVisitors(count);
        localStorage.setItem('portfolio_visitors', count.toString());

        // Animate counter
        let current = 0;
        const timer = setInterval(() => {
            if (current < count) {
                current += Math.ceil(count / 20);
                setDisplayVisitors(Math.min(current, count));
            }
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-[#0F52BA] to-[#7C3AED] rounded-lg px-6 py-4 shadow-lg"
        >
            <div className="text-sm text-[#F0F4FF]/80 mb-1">Portfolio Visitors</div>
            <motion.div
                className="text-3xl font-bold text-[#00D9FF]"
                key={displayVisitors}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                {displayVisitors.toLocaleString()}
            </motion.div>
        </motion.div>
    );
}
