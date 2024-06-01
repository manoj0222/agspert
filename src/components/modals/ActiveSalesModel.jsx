import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  Input,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import Btn from "../common/Btn";
import PropTypes from "prop-types";
import { EditContext } from "../context/EditViewContextProvider";
import FormLables from "../common/FormLabels";

export default function ActiveSalesModel({
  isOpen,
  closeModal,
  data,
  handleEidtSale,
}) {
  const [sellItmes, setSellingItems] = useState();
  const [sellPrice, setPrice] = useState();
  const [errorPrice, setErrorPrice] = useState("");
  const [errorItems, setErrorItems] = useState("");
  const value = useContext(EditContext)

  // console.log(value);

  const handleSellingPriceChange = (value) => {
    if (value === "") {
      setErrorPrice("Enter a Value");
    } else if (Number.isNaN(value)) {
      setErrorPrice("Please Enter an Number");
    } else if (value <= 0) {
      setErrorPrice("Price can't be Negative or zero");
    } else {
      setErrorPrice("");
    }
    setPrice(value);
  };

  const handletotalItemsChange = (value) => {
    if (value === "") {
      setErrorItems("Enter a Value");
    } else if (Number.isNaN(value)) {
      setErrorItems("Please Enter an Number");
    } else if (value <= 0) {
      setErrorItems("Price can't be Negative or zero");
    } else {
      setErrorItems("");
    }
    setSellingItems(value);
  };

  const handleClick = (isEdit) => {
    if(errorPrice==""&&errorItems==""){
      data.price=sellPrice||data.price;
      data.quantity=sellItmes||data.quantity;
      data.isPaid=isEdit;
      handleEidtSale(data)
      console.log(data)
    }
    closeModal(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => closeModal(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell Order Details</ModalHeader>
          <FormLables></FormLables>
          <ModalCloseButton />
          <ModalBody>
            <FormLables>Selling Rate</FormLables>
            <Input
              type="text"
              min="0"
              defaultValue={data.price}
              value={sellPrice}
              onChange={(e) => {
                handleSellingPriceChange(e.target.value);
              }}
              readOnly={value}
            />
            <Text color="red.500">{errorPrice}</Text>
            <FormLables>Total No of Items</FormLables>
            <Input
              type="text"
              min="0"
              defaultValue={data.quantity}
              value={sellItmes}
              onChange={(e) => {
                handletotalItemsChange(e.target.value);
              }}
              readOnly={value}
            />
            <Text color="red.500">{errorItems}</Text>
          </ModalBody>
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {!value ? (
              <>
                <Btn
                  color="teal"
                  variant="ghost"
                  size="md"
                  onClick={()=>{handleClick(false)}}
                >
                  Edit
                </Btn>
                <Btn type="submit" color="teal" size="md" onClick={()=>{handleClick(true)}}>
                  Paid
                </Btn>
              </>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

ActiveSalesModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    isPaid: PropTypes.bool,
  }).isRequired,
  handleEidtSale: PropTypes.func.isRequired,
};