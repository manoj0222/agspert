import { useState, useEffect } from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/pages/login/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/pages/Home/HomePage';
import Redirect from "./components/auth/Redirect.jsx"
import NavBar from './components/common/NavBar.jsx';
import { ThemeProvider } from './components/context/ThemeProvider.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load the login state from local storage when the component mounts
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <ThemeProvider requiredcolor={"#2e3c3ff1"}>
      <ChakraProvider>
        <Router>
          {isLoggedIn && <NavBar onLogout={handleLogout} />}
          <Routes>
            <Route path="/agspert/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/agspert/homepage" element={<ProtectedRoute element={<HomePage />} isLoggedIn={isLoggedIn} />} />
            <Route path="*" element={<Redirect to="/agspert/login" />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
