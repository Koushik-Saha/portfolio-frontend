'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/src/components/Navbar';
import Hero from '@/src/components/sections/Hero';
import Contact from '@/src/components/sections/Contact';
import DynamicSection from '@/src/components/DynamicSection';
import { usePortfolio } from '@/src/hooks/usePortfolio';
import Loading from '@/src/components/Loading';

export default function Home(): JSX.Element {
    const { data, loading, error } = usePortfolio();

    if (loading) return <Loading />;
    if (error || !data) return <div>Error loading portfolio</div>;

    return (
        <main className="bg-[#0A0E27] min-h-screen">
            <Navbar profile={data.profile} />
            <Hero profile={data.profile} />

            {/* Dynamic Sections */}
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

            {/* Contact Section */}
            <Contact profile={data.profile} />
        </main>
    );
}
