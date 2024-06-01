import React,{memo} from "react";
import { Button} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const Btn = memo(function Btn({color,variant,size,children,onClick}) {
  return (
    <Button  onClick={onClick} colorScheme={color} size={size} variant={variant} >
      {children}
    </Button>
  );
});


Btn.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};



export default Btn;