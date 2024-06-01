import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../config/FireBaseConfig"; // Adjust the import according to your project structure

/**
 * These is used in  ActiveSaleOrder Component in order to fetch the SKU's from DB which are not paid
 * @param {*} active Boolean
 * @returns products Array
 */
export const fetchActiveSaleSKUofProducts = async (active) => {
    try {
        const productsRef = collection(db, 'sku');
        let q = query(productsRef);

        if (active !== undefined) {
            q = query(productsRef, where('isPaid', '==', active));
        }

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

/**
 * These was Custom Hook which was used in ActiveSaleOrder Component . 
 * @param {*} active 
 * @returns useMutate
 */
export const useActiveSaleSKUofProducts = (active) => {
    return useQuery({
        queryKey: ["activeSaleSKUofProducts", active],
        queryFn: () => fetchActiveSaleSKUofProducts(active),
        enabled: active !== undefined, // Only run the query if active is defined
    });
};

