'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThemeToggle(): JSX.Element {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.style.setProperty('--bg-primary', '#0A0E27');
            document.documentElement.style.setProperty('--text-primary', '#F0F4FF');
        } else {
            document.documentElement.style.setProperty('--bg-primary', '#F0F4FF');
            document.documentElement.style.setProperty('--text-primary', '#0A0E27');
        }
    }, [isDark]);

    return (
        <motion.button
            onClick={() => setIsDark(!isDark)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all"
        >
            {isDark ? '☀️' : '🌙'}
        </motion.button>
    );
}
