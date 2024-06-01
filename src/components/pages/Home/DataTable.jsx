import React, { useState } from "react";
import { getDateandTime } from "../../../utils/Productfilter";
import ActiveSalesModel from "../../modals/ActiveSalesModel";
import { Avatar } from "@chakra-ui/react";
import { updateSkuProduct } from "../../../api/SkuApi";
import PropTypes from 'prop-types';



export default function DataTable({ data,onUpdate}) {

  const [showModal, setshowModal] = useState(false);
  const [selectedsku, setSelectedSku] = useState({});

  const handleClick = (eachrow) => {
    setshowModal(true);
    setSelectedSku(eachrow);
  };

 const handleEditSale = async(saleOrder)=>{
     try {
      await updateSkuProduct(saleOrder);
      console.log('Successfully updated the SKU order');
      onUpdate(); 
      
    } catch (error) {
      console.error('Error updating the SKU order:', error);
    }
 }

 


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th className="name">Customer Name</th>
            <th className="price">Price ₹</th>
            <th className="last">Last Modified</th>
            <th>Edit/View</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eachrow, index) => {
            return (
              <tr key={eachrow.id} data-id={eachrow.id}>
                <td> {index + 1}</td>
                <td data-id={`name-${eachrow.id}`}>
                  <Avatar  size="sm">
                  </Avatar>
                </td>
                <td data-id={`role-${eachrow.id}`}>{eachrow.price}</td>
                <td>{getDateandTime(eachrow.updateon)}</td>
                <td onClick={() => handleClick(eachrow)}>...</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <ActiveSalesModel
          isOpen={showModal}
          closeModal={setshowModal}
          data={selectedsku}
          handleEidtSale={handleEditSale}
        />
      )}
    </>
  );
}


DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      updateon: PropTypes.instanceOf(Date),
    })
  ),
  onUpdate: PropTypes.func,
};