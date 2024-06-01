/**
 * 
 * This was the just util function which will extract the productName Based on provided stock Data's
 * @param {*} data 
 * @returns productNames Array
 */
export const getProductNames =(data=[])=>{
  let productNames=[];
    for(let i=0;i<data.length;i++){
        productNames.push({id:data[i].id,name:data[i].name,sku:data[i].sku});
    }
    // console.log(productNames)
    return productNames;
}

/**
 * It will extract from the option and also remove the Sku if it was already present this was useful 
 * when we deselect any tag on the auto complete Field.
 * 
 * @param {*} sku 
 * @param {*} option 
 * @returns filteredSku Array
 */
export const filterSKUBasedonTag = (sku=[],option)=>{
  let filteredSku=[];
  let ids=[];
  option=option.sku;
  for(let i=0;i<option.length;i++){
    ids.push(option[i].id);
  }
  console.log(ids)
  for(let i=0;i<sku.length;i++){
    if(ids.indexOf(sku[i].id)==-1){
      filteredSku.push(sku[i]);
    }
    else{
      continue;
    }
  }
  // console.log(filteredSku)
   return filteredSku;
}

/**
 * This format function which will be used while creating SKU order.
 * @param {*} skuItems 
 * @returns sku Array
 */
export const getSkuItems =(skuItems)=>{
  const sku =[];
  for(let i=0;i<skuItems.length;i++){
    sku.push({
        sku_id:skuItems[i].sku.id,
        price:skuItems[i].sellingRate,
        quantity:skuItems[i].totalItems,
        isPaid:false,
        invoicNo:skuItems[i].invoiceNo,
        invoiceDate:skuItems[i].invoiceDate,
        addeddate:new Date().toISOString(),
        updateon:null,

    })
  }
  // console.log(sku)
  return sku;
}

/**
 * As the function name employ's it was to format the Date and Time.
 * @param {*} date 
 * @returns 
 */
export const  getDateandTime =(date)=>{
//  console.log(date)
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes} ${ampm}`;
  
  return `${day}/${month}/${year} (${strTime})`;
}