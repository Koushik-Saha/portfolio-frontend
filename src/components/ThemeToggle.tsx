'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThemeToggle(): JSX.Element {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage on mount
    useEffect(() => {
        setMounted(true);

        // Check localStorage for saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            const isDarkTheme = savedTheme === 'dark';
            setIsDark(isDarkTheme);
            applyTheme(isDarkTheme);
        } else {
            // Default to dark theme
            setIsDark(true);
            applyTheme(true);
        }
    }, []);

    // Apply theme changes
    const applyTheme = (isDarkTheme: boolean) => {
        const root = document.documentElement;
        const main = document.querySelector('main');

        if (isDarkTheme) {
            // DARK THEME
            // Set html and body background
            root.style.backgroundColor = '#0A0E27';
            document.body.style.backgroundColor = '#0A0E27';

            // Set main content background
            if (main) {
                main.style.backgroundColor = '#0A0E27';
            }

            // Remove light mode classes, add dark mode
            root.classList.remove('light-theme');
            root.classList.add('dark-theme');

            // Set all text to light
            document.body.style.color = '#F0F4FF';

            // Set CSS variables
            root.style.setProperty('--bg-primary', '#0A0E27');
            root.style.setProperty('--bg-secondary', '#0F0F23');
            root.style.setProperty('--text-primary', '#F0F4FF');
            root.style.setProperty('--text-secondary', '#F0F4FF');

            // Change all section backgrounds
            document.querySelectorAll('section').forEach(section => {
                section.style.backgroundColor = 'transparent';
            });

            // Change all divs with specific background
            document.querySelectorAll('[class*="bg-\\["]').forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.backgroundColor = 'inherit';
                }
            });
        } else {
            // LIGHT THEME
            // Set html and body background
            root.style.backgroundColor = '#F5F5F5';
            document.body.style.backgroundColor = '#F5F5F5';

            // Set main content background
            if (main) {
                main.style.backgroundColor = '#F5F5F5';
            }

            // Remove dark mode classes, add light mode
            root.classList.remove('dark-theme');
            root.classList.add('light-theme');

            // Set all text to dark
            document.body.style.color = '#1a1a1a';

            // Set CSS variables
            root.style.setProperty('--bg-primary', '#F5F5F5');
            root.style.setProperty('--bg-secondary', '#EFEFEF');
            root.style.setProperty('--text-primary', '#1a1a1a');
            root.style.setProperty('--text-secondary', '#333333');

            // Change all section backgrounds
            document.querySelectorAll('section').forEach(section => {
                section.style.backgroundColor = '#F5F5F5';
            });
        }

        // Save theme preference
        localStorage.setItem('portfolio-theme', isDarkTheme ? 'dark' : 'light');
    };

    // Handle toggle click
    const handleToggle = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        applyTheme(newTheme);
    };

    // Don't render until mounted to prevent hydration issues
    if (!mounted) {
        return <div className="fixed top-24 right-6 z-50 w-14 h-14" />;
    }

    return (
        <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="fixed top-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#00D9FF]/50"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
        >
            <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {isDark ? '☀️' : '🌙'}
            </motion.span>
        </motion.button>
    );
}
