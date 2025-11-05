'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor(): JSX.Element {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            setIsHovering(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.classList.contains('hover-target')
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                animate={{ x: position.x - 12, y: position.y - 12 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="fixed w-6 h-6 rounded-full border-2 border-[#00D9FF] pointer-events-none z-50"
            />

            {/* Glow effect */}
            <motion.div
                animate={{
                    x: position.x - 24,
                    y: position.y - 24,
                    scale: isHovering ? 2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed w-12 h-12 rounded-full bg-[#00D9FF]/20 pointer-events-none z-40 blur-xl"
            />
        </>
    );
}
