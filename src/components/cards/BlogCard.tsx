'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/src/types';
import {JSX} from "react";

interface BlogCardProps {
    data: BlogPost;
}

export default function BlogCard({ data }: BlogCardProps): JSX.Element {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500 cursor-pointer transition-colors"
        >
            <h3 className="text-xl font-bold mb-2 text-blue-400">{data.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{data.excerpt}</p>

            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                <span>{data.readingTime} min read</span>
                <span>{new Date(data.publishedDate).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {data.tags?.slice(0, 2).map((tag: string) => (
                    <span
                        key={tag}
                        className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>
        </motion.div>
    );
}
