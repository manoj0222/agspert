import React from 'react'
import { useCompletedSales } from '../../../../Hooks/useCompletedSales';
import DataTable from '../DataTable';
import Loaders from '../../../common/Loaders';
import { EditViewContextProvider } from "../../../context/EditViewContextProvider";

export default function CompletedSaleOrders() {
  
  const { data,isLoading,error,refetch } =  useCompletedSales(true);

  if (isLoading) return <Loaders/>;
  if (error) return <div>Error fetching active sales</div>;

  const completedReftech =()=>refetch();

return (
  <div>
    <EditViewContextProvider value={false}>
    <DataTable data={data} completedSalesReftech={completedReftech} isEdit={true}/>
    </EditViewContextProvider>
  </div>
)
}
 