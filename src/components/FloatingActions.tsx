'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const actions = [
    { icon: '💼', label: 'Resume', href: '#', action: 'download' },
    { icon: '💬', label: 'Chat', href: '#', action: 'chat' },
    { icon: '📧', label: 'Email', href: 'mailto:Koushik.saha666@gmail.com', action: 'email' },
    { icon: '🔝', label: 'Top', href: '#hero', action: 'scroll' },
];

export default function FloatingActions(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div className="fixed right-6 bottom-32 z-30">
            {/* Main button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-2xl shadow-lg hover:shadow-xl"
            >
                {isOpen ? '✕' : '+'}
            </motion.button>

            {/* Action buttons */}
            {actions.map((action, idx) => (
                <motion.a
                    key={idx}
                    href={action.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#0F52BA] border-2 border-[#00D9FF] flex items-center justify-center text-xl shadow-lg hover:shadow-xl transition-all"
                    style={{
                        transform: isOpen
                            ? `rotate(${(idx * 360) / actions.length}deg) translateY(-80px)`
                            : 'rotate(0deg) translateY(0px)',
                    }}
                    title={action.label}
                >
                    {action.icon}
                </motion.a>
            ))}
        </motion.div>
    );
}
