'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './cards/ProjectCard';
import BlogCard from './cards/BlogCard';
import SkillCard from './cards/SkillCard';
import TestimonialCard from './cards/TestimonialCard';
import { Section, Project, BlogPost, Skill } from '@/src/types';
import ExperienceCard from "@/src/components/cards/ExperienceCard";

interface DynamicSectionProps {
    section: Section;
    items: any[];
    sectionId: string;
}

type CardComponentType = React.ComponentType<{ data: any }>;

const cardComponents: Record<string, CardComponentType> = {
    projects: ProjectCard,
    blog: BlogCard,
    skills: SkillCard,
    testimonials: TestimonialCard,
    experience: ExperienceCard
};

export default function DynamicSection({ section, items, sectionId }: DynamicSectionProps): JSX.Element {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const gridColsClass = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    }[section.gridCols || 3] || 'lg:grid-cols-3';

    // Don't render if no items
    if (!items || items.length === 0) {
        return <></>;
    }

    return (
        <section ref={ref} className="relative py-24 px-4 overflow-hidden bg-black" id={section.id}>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#7C3AED]">
                        {section.title}
                    </h2>
                    {section.description && (
                        <p className="text-[#F0F4FF]/60 mb-4">{section.description}</p>
                    )}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] rounded"
                        initial={{ width: 0 }}
                        animate={inView ? { width: 100 } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}
                >
                    {items.map((item: any) => {
                        const CardComponent = cardComponents[sectionId];
                        return (
                            <motion.div key={item.id} variants={itemVariants}>
                                {CardComponent ? <CardComponent data={item} /> : null}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
