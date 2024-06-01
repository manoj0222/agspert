import React, { createContext } from "react";

//create a context.
const EditContext = createContext();

const isEditedView = (value) => {
  return value ? false : true;
};

//Created the Context Provider which will return a boolean value for Edit View checking.
const EditViewContextProvider = ({ children, value }) => {
  return (
    <EditContext.Provider value={isEditedView(value)}>
      {children}
    </EditContext.Provider>
  );
};

export { EditContext, EditViewContextProvider };
