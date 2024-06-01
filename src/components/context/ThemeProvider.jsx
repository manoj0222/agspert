import React, { createContext, useState,useMemo } from 'react'

const ThemeContext = createContext();
/**
 * 
 * These Component Provide a context of Theme which can access anywhere in throught the applciation to chnage the 
 * component B.G.C based on theme Mode.
 * @returns 
 */
 export const ThemeProvider =({children,color="white",requiredcolor})=>{
    const [theme,setTheme] = useState(color);

    const toggleColorTheme = ()=>{
        setTheme((prevTheme) => (prevTheme === 'white' ? requiredcolor : 'white'));
    }

    const contextValue = useMemo(() => ({ theme, toggleColorTheme }),[theme,toggleColorTheme]);

    return(
       <ThemeContext.Provider value={contextValue} >
         {children}
       </ThemeContext.Provider>
    )
}

export default ThemeContext;