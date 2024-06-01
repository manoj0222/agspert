
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import Loaders from "../common/Loaders";
import {
  getProductNames,
  filterSKUBasedonTag,
  getSkuItems,
} from "../../utils/Productfilter";
import ProductNames from "./ProductNames";
import SKUDetailsSectionModal from "./SaleDetailsSection";
import { useSaveSkus } from "../../Hooks/useSaveSkus";
import PropTypes from 'prop-types';
import FormLables from "../common/FormLabels";

const SaleOrderModal = ({ isOpen, closeModal, data }) => {
  const [selectedProductSKU, setSelectedProductSKU] = useState([]);
  const [sellOrder, setSellOrder] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [productError, setProductError] = useState(false);
  const [text, setErrorText] = useState("");
  const [productName, setProductName] = useState([]);
  const addSkuMutation = useSaveSkus();

  const handleOptionClick = (option, isclosetagselected) => {
    let data = filterSKUBasedonTag(selectedProductSKU, option);
    setSelectedProductSKU([...selectedProductSKU, ...option.sku]);
    if (isclosetagselected) {
      setSelectedProductSKU([...data]);

    }

    setProductError(false);
    console.log(productName);
  };

  const handleInputChanges = (index, field, value) => {
    setErrorText("");
    const updateSellOrder = [...sellOrder];
    if (!updateSellOrder[index]) {
      updateSellOrder[index] = { sku: selectedProductSKU[index] };
    }
    updateSellOrder[index][field] = value;
    setSellOrder(updateSellOrder);
    validateField(index, field, value);
  };

  const validateField = (index, field, value) => {
    const errors = { ...validationErrors };
    switch (field) {
      case "totalItems":
        if (value <= 0) {
          errors[index] = {
            ...errors[index],
            [field]: "Avaialabel stock can't be negative or zero",
          };
        } else if (Number(value) > Number(selectedProductSKU[index].items)) {
          errors[index] = {
            ...errors[index],
            [field]: "Total items exceed available stock.",
          };
        } else {
          if (errors[index]) {
            delete errors[index][field];
            if (Object.keys(errors[index]).length === 0) {
              delete errors[index];
            }
          }
        }
        break;

      case "sellingRate":
        if (value <= 0) {
          errors[index] = {
            ...errors[index],
            [field]: "Selling rate can't be negative or zero",
          };
        } else {
          if (errors[index]) {
            delete errors[index][field];
            if (Object.keys(errors[index]).length === 0) {
              delete errors[index];
            }
          }
        }
        break;

      default:
        if (!value) {
          errors[index] = {
            ...errors[index],
            [field]: `${field} is required.`,
          };
        } else {
          if (errors[index]) {
            delete errors[index][field];
            if (Object.keys(errors[index]).length === 0) {
              delete errors[index];
            }
          }
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      selectedProductSKU.length > 0 &&
      Object.keys(validationErrors).length <= 0 &&
      sellOrder.length > 0
    ) {
      let data = getSkuItems(sellOrder);
      addSkuMutation.mutate(data);
      closeModal(false);
    } else if (sellOrder.length === 0) {
      setErrorText("Please fill the required Fields for submission");
      console.log(selectedProductSKU);
    } else if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors);
    } else if (selectedProductSKU.length === 0) {
      setProductError(true); // Set product error if no product is selected
      return;
    }
  };

  const handleClearAll = () => {
    setProductName([]);
    setSelectedProductSKU([]);
    setSellOrder([]);
    setValidationErrors({});
    setProductError(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => closeModal(false)} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!data || !data ? (
              <Loaders />
            ) : (
              <Box>
                <form onSubmit={handleSubmit} noValidate>
                  <VStack spacing={4}>
                    <FormControl id="products" isRequired>
                      <FormLables>Product</FormLables>
                      <ProductNames
                        options={getProductNames(data)}
                        handleOptionClick={handleOptionClick}
                        handleClearAllproducts={handleClearAll}
                        sellOrder={sellOrder}
                      />
                    </FormControl>
                     {selectedProductSKU.map((sku, index) => {
                        return (
                            <SKUDetailsSectionModal
                              key={sku.id}
                              index={index}
                              id={sku.id}
                              sku={sku}
                              handleInputChanges={handleInputChanges}
                              validationErrors={validationErrors[index] || {}}
                            />
                        )})
                      }
                    <Text color="red.500">{text}</Text>
                    <Button type="submit" colorScheme="teal" size="md">
                      Create Sale Order
                    </Button>
                  </VStack>
                </form>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SaleOrderModal;


SaleOrderModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      sku: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          price: PropTypes.number,
          items: PropTypes.number,
        })
      ),
    })
  ),
};