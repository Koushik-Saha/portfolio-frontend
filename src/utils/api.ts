import { PortfolioData } from '@/src/types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio`;

export const getPortfolio = async (): Promise<PortfolioData> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch portfolio');
    return response.json();
};

export const updatePortfolio = async (data: Partial<PortfolioData>): Promise<PortfolioData> => {
    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update portfolio');
    return response.json();
};
