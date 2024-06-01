// useProducts.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";

/**
 * used to get All the Stock Data with SKU which can further used to place the Sales Order.
 * @returns useQuery
 */
export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const productsRef = collection(db, "products");
            const querySnapshot = await getDocs(productsRef);
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() });
            });
            return products;
        },
    });
};
