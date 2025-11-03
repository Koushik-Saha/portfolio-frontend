'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Profile } from '@/src/types';

interface NavbarProps {
    profile: Profile;
}

export default function Navbar({ profile }: NavbarProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation links
    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Blog', href: '#blog' },
    ];

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = 'http://localhost:5100/resume.pdf';
        link.download = 'Koushik_Saha_Resume.pdf';
        link.click();
    };

    return (
        <>
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#0A0E27]/95 backdrop-blur-md border-b border-[#00D9FF]/20 shadow-lg shadow-[#0F52BA]/10'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="#hero" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center">
                                    <span className="font-bold text-[#0A0E27] text-lg">KS</span>
                                </div>
                                <span className="hidden sm:inline font-bold text-[#00D9FF] text-lg">
                  Koushik Saha
                </span>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    whileHover={{ color: '#00D9FF' }}
                                    className="text-[#F0F4FF]/70 hover:text-[#00D9FF] transition-colors font-medium"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>

                        {/* Desktop CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Resume Download */}
                            <motion.button
                                onClick={handleDownloadResume}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 text-[#F0F4FF] border-2 border-[#00D9FF] rounded-lg hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all font-medium flex items-center gap-2"
                            >
                                <span>📥</span>
                                <span>Resume</span>
                            </motion.button>

                            {/* Let's Connect Button */}
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#0F52BA] text-[#0A0E27] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00D9FF]/40 transition-all"
                            >
                                Let's Connect →
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.95 }}
                            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
                        >
                            <motion.div
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-[#00D9FF]"
                            />
                            <motion.div
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-0.5 bg-[#00D9FF]"
                            />
                            <motion.div
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-6 h-0.5 bg-[#00D9FF]"
                            />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-16 left-0 right-0 z-40 md:hidden ${
                    isOpen ? 'block' : 'hidden pointer-events-none'
                }`}
            >
                <div className="bg-[#0A0E27]/95 backdrop-blur-md border-b border-[#00D9FF]/20 px-4 py-6 space-y-4">
                    {/* Mobile Navigation Links */}
                    {navLinks.map((link, idx) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => setIsOpen(false)}
                            className="block text-[#F0F4FF]/70 hover:text-[#00D9FF] transition-colors font-medium py-2"
                        >
                            {link.name}
                        </motion.a>
                    ))}

                    {/* Mobile CTA Buttons */}
                    <div className="space-y-3 pt-4 border-t border-[#00D9FF]/20">
                        {/* Resume Download */}
                        <motion.button
                            onClick={() => {
                                handleDownloadResume();
                                setIsOpen(false);
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-4 py-3 text-[#F0F4FF] border-2 border-[#00D9FF] rounded-lg hover:border-[#7C3AED] transition-all font-medium flex items-center justify-center gap-2"
                        >
                            <span>📥</span>
                            <span>Download Resume</span>
                        </motion.button>

                        {/* Let's Connect Button */}
                        <motion.a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#0F52BA] text-[#0A0E27] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00D9FF]/40 transition-all text-center"
                        >
                            Let's Connect →
                        </motion.a>
                    </div>

                    {/* Social Links in Mobile Menu */}
                    <div className="flex justify-center gap-4 pt-4 border-t border-[#00D9FF]/20">
                        {profile.socials?.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: navLinks.length * 0.1 + idx * 0.1 }}
                                whileHover={{ scale: 1.2 }}
                                className="w-10 h-10 rounded-full border-2 border-[#00D9FF] text-[#00D9FF] flex items-center justify-center hover:bg-[#00D9FF]/10 transition-all text-lg"
                                title={social.name}
                            >
                                {social.name === 'GitHub' && '🐙'}
                                {social.name === 'LinkedIn' && '💼'}
                                {social.name === 'Twitter' && '𝕏'}
                                {social.name === 'Email' && '✉️'}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Spacer to prevent content overlap */}
            <div className="h-16" />
        </>
    );
}
