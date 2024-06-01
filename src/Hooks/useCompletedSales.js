import { useQuery } from '@tanstack/react-query';
import { fetchActiveSaleSKUofProducts } from './useActiveSales';

/**
 * It is used to fetch the Completed Sales order which are paid.
 * @param {*} active 
 * @returns useQuery
 */
export const useCompletedSales = (active) => {
    return useQuery({
        queryKey: ["completedSales", active],
        queryFn: () => fetchActiveSaleSKUofProducts(active),
        enabled: active !== undefined, // Only run the query if active is defined
    });
};
