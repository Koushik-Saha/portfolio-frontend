'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/sections/Hero';
import Contact from '@/src/components/sections/Contact';
import DynamicSection from '@/src/components/DynamicSection';
import { usePortfolio } from '@/src/hooks/usePortfolio';
import Loading from '@/src/components/Loading';

import CustomCursor from '@/src/components/CustomCursor';
import ThemeToggle from '@/src/components/ThemeToggle';
import VisitorCounter from '@/src/components/VisitorCounter';
import FloatingActions from '@/src/components/FloatingActions';
import Newsletter from '@/src/components/Newsletter';
import { useKeyboardShortcuts } from '@/src/hooks/useKeyboardShortcuts';

import GitHubProjects from '@/src/components/sections/GitHubProjects';
import ContributionGraph from '@/src/components/sections/ContributionGraph';
import PerformanceMetrics from '@/src/components/sections/PerformanceMetrics';
import TechStack from '@/src/components/sections/TechStack';
import AIChat from '@/src/components/sections/AIChat';
import Terminal from '@/src/components/sections/Terminal';
import Interactive3D from '@/src/components/sections/Interactive3D';
import Analytics from '@/src/components/sections/Analytics';


export default function Home(): JSX.Element {
    const { data, loading, error } = usePortfolio();


    useKeyboardShortcuts();

    useEffect(() => {
        // Scroll to top immediately
        window.scrollTo(0, 0);

        // Also prevent any elements from auto-focusing
        document.body.style.overflow = 'auto';
    }, []);

    if (loading) return <Loading />;
    if (error || !data) return <div className="text-[#00D9FF] text-center py-20">Error loading portfolio</div>;

    return (
        <main className="bg-[#0A0E27] min-h-screen overflow-x-hidden">

            <CustomCursor />
            <ThemeToggle />
            <VisitorCounter />
            <FloatingActions />
            {/*<Newsletter />*/}


            {/* Navbar */}
            <Navbar profile={data.profile} />

            {/* Hero Section */}
            <Hero profile={data.profile} />


            <Interactive3D />
            <Analytics />
            <TechStack />


            {/* Dynamic Sections from Database */}
            {data.sections
                ?.filter(section => section.isVisible && section.id !== 'hero')
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map(section => {
                    let items: any[] = [];
                    if (section.id === 'projects') items = data.projects || [];
                    else if (section.id === 'skills') items = data.skills || [];
                    else if (section.id === 'experience') items = data.experience || [];
                    else if (section.id === 'blog') items = data.blog || [];
                    else if (section.id === 'testimonials') items = data.testimonials || [];

                    return (
                        items.length > 0 && (
                            <DynamicSection
                                key={section.id}
                                section={section}
                                items={items}
                                sectionId={section.id}
                            />
                        )
                    );
                })}


            <GitHubProjects />
            {/*<ContributionGraph />*/}
            <PerformanceMetrics />



            <Terminal />
            <AIChat />


            {/* Contact Section */}
            <Contact profile={data.profile} />
        </main>
    );
}
