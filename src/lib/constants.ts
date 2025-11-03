export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    },
};

export const GRADIENT_COLORS = [
    'from-blue-400 to-purple-600',
    'from-cyan-400 to-blue-600',
    'from-pink-400 to-red-600',
];
