import { useState, useEffect } from 'react';
import {PortfolioData} from "@/src/types";


export const usePortfolio = () => {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch('http://localhost:5100/api/portfolio');
                if (!response.ok) throw new Error('Failed to fetch portfolio data');
                const portfolioData: PortfolioData = await response.json();
                setData(portfolioData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                console.error('Error fetching portfolio:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, []);

    return { data, loading, error };
};
