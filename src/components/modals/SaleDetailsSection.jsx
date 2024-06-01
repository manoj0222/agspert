import React from "react";
import {
    Box,
    FormControl,
    Input,
    Badge,
    Divider,
    Text,
  } from "@chakra-ui/react";
import Badges from "../common/Badges";
import PropTypes from 'prop-types';
import FormLables from "../common/FormLabels";

export default function SKUDetailsSectionModal({
    index,
    invoiceNo=null,
    invoiceDate=null,
    sku,
    handleInputChanges,
    validationErrors
  }) {


  const handleChange = (field) => (event) => {
    handleInputChanges(index, field, event.target.value);
  };


  return (
    <Box
      borderWidth="1px"
      p={3}
      borderRadius="lg"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent={{
        base: "flex-start",
        lg: "space-between",
      }}
      gap={3}
    >
      <FormLables width={"100%"}  display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <>{`${index + 1}. SKU (${sku.id})`}</>
        <Badges>{"Price: ₹"+sku.price}</Badges>
      </FormLables>
      <Divider orientation="horizontal" />
      <FormControl
        id={`sellingRate-${index}`}
        width={{ base: "100%", lg: "calc(50% - 12px)" }}
        isRequired
        isInvalid={validationErrors.sellingRate}
      >
        <FormLables>Selling Rate</FormLables>
        <Input type="number" 
        min="0"
        onChange={handleChange("sellingRate")} />
        {validationErrors.sellingRate && (
          <Text color="red.500">{validationErrors.sellingRate}</Text>
        )}
      </FormControl>
      <FormControl
        id={`totalItems-${index}`}
        isRequired
        width={{ base: "100%", lg: "calc(50% - 12px)" }}
        isInvalid={validationErrors.totalItems}
      >
        <FormLables>Total Items</FormLables>
        <Input
          type="number"
          min="0"
          onChange={handleChange("totalItems")}
        />
        {validationErrors.totalItems && (
          <Text color="red.500">{validationErrors.totalItems}</Text>
        )}
      </FormControl>
      <FormControl
        id={`invoiceNo-${index}`}
        isRequired
        width={{ base: "100%", lg: "calc(50% - 12px)" }}
        isInvalid={validationErrors.invoiceNo}
      >
        <FormLables>Invoice No</FormLables>
        <Input type="text" onChange={handleChange("invoiceNo")} value={invoiceNo} />
        {validationErrors.invoiceNo && (
          <Text color="red.500">{validationErrors.invoiceNo}</Text>
        )}
      </FormControl>
      <FormControl
        id={`invoiceDate-${index}`}
        isRequired
        width={{ base: "100%", lg: "calc(50% - 12px)" }}
        isInvalid={validationErrors.invoiceDate}
      >
        <FormLables>Invoice Date</FormLables>
        <Input type="date" onChange={handleChange("invoiceDate")} value={invoiceDate} />
        {validationErrors.invoiceDate && (
          <Text color="red.500">{validationErrors.invoiceDate}</Text>
        )}
      </FormControl>
        <FormLables width={"100%"}  display={"flex"} justifyContent={"end"}>
          <Badge colorScheme="green"  >
          {sku.items + " Items Remaining"}</Badge>
        </FormLables>
    </Box>
  );
}

SKUDetailsSectionModal.propTypes = {
  index: PropTypes.number,
  invoiceNo: PropTypes.string,
  invoiceDate: PropTypes.string,
  sku: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.number,
    items: PropTypes.number,
  }),
  handleInputChanges: PropTypes.func,
  validationErrors: PropTypes.shape({
    sellingRate: PropTypes.string,
    totalItems: PropTypes.string,
    invoiceNo: PropTypes.string,
    invoiceDate: PropTypes.string,
  }),
};