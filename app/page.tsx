'use client';

import { usePortfolio } from '@/src/hooks/usePortfolio';
import Hero from '@/src/components/sections/Hero';
import DynamicSection from '@/src/components/DynamicSection';
import Loading from '@/src/components/Loading';
import { PortfolioData } from '@/src/types';

export default function Home(): JSX.Element {
    const { data, loading, error } = usePortfolio();

    if (loading) return <Loading />;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    if (!data) return <div className="text-center py-20">No data</div>;

    const typedData = data as PortfolioData;

    return (
        <main className="bg-black">
            <Hero profile={typedData.profile} />

            {typedData.sections
                ?.sort((a, b) => a.order - b.order)
                .map((section) => {
                    const sectionData = typedData[section.id as keyof PortfolioData];

                    return (
                        <DynamicSection
                            key={section.id}
                            section={section}
                            items={Array.isArray(sectionData) ? sectionData : []}
                            sectionId={section.id}
                        />
                    );
                })}
        </main>
    );
}
