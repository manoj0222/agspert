import React from "react";
import Loaders from "../../../common/Loaders";
import "../../../../styles/datatable.css";
import DataTable from "../DataTable";
import { useActiveSaleSKUofProducts } from "../../../../Hooks/useActiveSales";
import { EditViewContextProvider } from "../../../context/EditViewContextProvider";
import { useCompletedSales } from '../../../../Hooks/useCompletedSales';

export default function ActiveSaleorders() {
  const { data, isLoading, isError, error,refetch} = useActiveSaleSKUofProducts(false);
  const { refetch:refetchCompleted } =  useCompletedSales(true);
 

  const handleUpdate = () => {
    refetch();
    refetchCompleted();
  };
 

  if (isLoading) return <Loaders />;
  if (error) return <div>Error fetching active sales</div>;
  return (
    <div>
      <EditViewContextProvider value={true}>
        <DataTable data={data}  onUpdate={handleUpdate} />
      </EditViewContextProvider>
    </div>
  );
}
