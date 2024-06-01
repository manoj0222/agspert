// hooks/useAddSku.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSkuOfProduct } from "../api/SkuApi"; // Adjust the path accordingly

/**
 * 
 * @returns useMutation Hook's and calls the useActiveSales in order to fetch the latest dat.
 */
export const useSaveSkus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:(products) => addSkuOfProduct(products),
    onSuccess:  () => {
      queryClient.invalidateQueries('activeSaleSKUofProducts');
      console.log("SKU Posted and tab updated Successfully");
    },
    onerror:(error)=>{
        console.log(`Error Ocuured while Posting the Sku`,error)
    }
  })

};
