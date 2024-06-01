import React,{memo} from 'react';
import {FormLabel} from "@chakra-ui/react"

const FormLables =  memo(function FormLabels({children}) {
  return (
    <FormLabel>
       {children}
    </FormLabel>
  )
});

export default FormLables;
