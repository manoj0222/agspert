import React,{memo} from 'react';
import { Badge } from '@chakra-ui/react';
import PropTypes from 'prop-types';

 const Badges = memo(function Badges({color,children}) {
  return (
   <Badge colorScheme={color}>{children}</Badge>
  )
});

Badges.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default Badges;
