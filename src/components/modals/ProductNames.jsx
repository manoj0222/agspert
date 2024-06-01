import React, { useState } from "react";
import {
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

// Autocomplete component
const ProductNames = ({ options,handleOptionClick,handleClearAllproducts,sellOrder }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionClickWrapper = (option) => {
    // console.log(option)
    if (!selectedTags.find(tag => tag.id === option.id)) {
      setSelectedTags([...selectedTags, option]);
      handleOptionClick(option); 
    }
    setInputValue("");
  };

  const handleTagClose = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    handleOptionClick(tag,true);
  };


  const handleClearAll = () => {
    setSelectedTags([]); // Clear selected tags
    handleClearAllproducts(); // Call the parent component function to clear sections
  };

  // Filter options based on selected tags
  const filteredOptions = options.filter(
    (option) =>
      !selectedTags.find((tag) => tag.id === option.id)
  );

  return (
    <VStack spacing={5} align="start" width="100%">
      <Wrap spacing={1} width="100%">
        {selectedTags.map((tag, index) => (
          <WrapItem key={index}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="teal">
              <TagLabel>{tag.name}</TagLabel>
              <TagCloseButton onClick={() => handleTagClose(tag)} />
            </Tag>
          </WrapItem>
        ))}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Select Product"
          formNoValidate 
        />
      </Wrap>
      {inputValue && (
        <Box
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          mt={2}
          p={2}
          bg="white"
          width="100%"
        >
          {filteredOptions
            .filter((option) =>
              option.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option, index) => (
              <Box
                key={index}
                p={2}
                cursor="pointer"
                _hover={{ backgroundColor: "gray.100" }}
                onClick={() => handleOptionClickWrapper(option)}
              >
                {option.name}
              </Box>
            ))}
        </Box>
      )}
      {selectedTags.length > 0 && (
        <Box>
          <Tag
            size="md"
            borderRadius="full"
            variant="solid"
            colorScheme="red"
            cursor="pointer"
            onClick={handleClearAll}
          >
            <TagLabel>Clear All</TagLabel>
          </Tag>
        </Box>
      )}
    </VStack>
  );
};


export default ProductNames;


ProductNames.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  handleOptionClick: PropTypes.func.isRequired,
  handleClearAllproducts: PropTypes.func.isRequired,
  sellOrder: PropTypes.bool, // Adjust type according to your requirement
};