import { db } from '../config/FireBaseConfig'; // Adjust the import according to your project structure
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';


/**
 * 
 * @param {*} products 
 * @returns data
 */
export const addSkuOfProduct = async (products) => {
    if (!Array.isArray(products)) {
        console.error("Expected an array of products.");
        return;
    }
    try {
        for (const product of products) {
            const docRef = doc(collection(db, "sku"), product.sku_id.toString());
            const docSnap = await getDoc(docRef); // Use getDoc for a single document

            if (docSnap.exists()) {
                console.log("Document with ID", product.sku_id, "already exists.");
            } else {
                await setDoc(docRef, product);
                console.log("Document written with ID", product.sku_id);
            }
        }
    } catch (error) {
        console.error("Error occurred while adding product SKUs:", error);
    } finally {
        console.log("Operation completed.");
    }
};

/**
 * 
 * @param {*} product 
 */
export const updateSkuProduct = async (product) => {
    try {
        const docRef = doc(collection(db, "sku"), product.sku_id.toString());
        const docSnap = await getDoc(docRef);

        if(docSnap.exists){
            await setDoc(docRef, product);
            console.log("sku data has been updated successfully", product.sku_id);
        }
        else{
            console.log("Selected Product does not exist");
        }
    }
    catch (error) {
        console.error("Error While Updating the Data")
    }
    finally {
        console.log("Update Sku Method has been Invoked");
    }
}