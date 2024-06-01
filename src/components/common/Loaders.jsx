import React, { memo } from 'react';
import { Flex, CircularProgress } from '@chakra-ui/react';

const Loaders = memo(function Loaders() {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  );
});

export default Loaders;
