'use client';

import { motion } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    message: string;
    rating: number;
    image: string;
}

interface TestimonialCardProps {
    data: Testimonial;
}

export default function TestimonialCard({ data }: TestimonialCardProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-xl bg-gradient-to-br from-[#0F52BA]/20 to-[#7C3AED]/10 border border-[#00D9FF]/30 hover:border-[#00D9FF]/60 transition-all"
        >
            <div className="flex items-start mb-4">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-12 h-12 rounded-full border-2 border-[#00D9FF] mr-4"
                />
                <div>
                    <h3 className="font-bold text-[#F0F4FF]">{data.name}</h3>
                    <p className="text-sm text-[#00D9FF]">{data.role}</p>
                    <p className="text-xs text-[#F0F4FF]/60">{data.company}</p>
                </div>
            </div>

            <p className="text-[#F0F4FF]/80 mb-4 text-sm leading-relaxed">"{data.message}"</p>

            <div className="flex gap-1">
                {[...Array(data.rating)].map((_, i) => (
                    <span key={i} className="text-[#00D9FF]">⭐</span>
                ))}
            </div>
        </motion.div>
    );
}
