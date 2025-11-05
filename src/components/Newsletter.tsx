'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Newsletter(): JSX.Element {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setStatus('success');
            setEmail('');

            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-[#0F52BA] to-[#7C3AED] rounded-full px-6 py-4 shadow-2xl"
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-[#0F52BA] to-[#7C3AED] rounded-full px-6 py-4 shadow-2xl"
        >
            <div className="flex flex-col items-center gap-4">
                <form onSubmit={handleSubscribe} className="flex gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-[#0A0E27] text-[#F0F4FF] px-4 py-2 rounded-full outline-none text-sm"
                        required
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-[#00D9FF] text-[#0A0E27] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#7C3AED] transition-all disabled:opacity-50"
                    >
                        {status === 'loading' ? '⏳' : status === 'success' ? '✅' : '→'}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
