import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './components/Home/Home';
import SignIn from './components/Auth/SingIn';
import SignUp from './components/Auth/SingUp';
import Menu from './components/Home/Menu';
import Blog from './components/Blogs/Blog';
import Checkout from './components/payments/Checkout.jsx';
import Settings from './components/Layouts/Settings.jsx';
import PdfGenerator from './components/Home/docxGenerator.jsx';
import NavBar from './components/Layouts/NavBar.jsx';
import CodeYourFutureMarianVolunteer from './components/code/CodeyourFuture.jsx';

function App() {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  return (
    <Router>
      {isLoggedIn && <NavBar />}
      <AppContent isLoggedIn={isLoggedIn} />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  // If user is not logged in, and not on sign-in or sign-up page, redirect to sign-in
  if (!isLoggedIn && location.pathname !== '/SignIn' && location.pathname !== '/SignUp') {
    return <Navigate to="/SignIn" />;
  }

  return (
    <>
      {!isHomePage && <Menu />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Blog" element={<Blog />} />    
        <Route path="/Mariana" element={<CodeYourFutureMarianVolunteer />} />
        <Route path="/CheckOut" element={<Checkout />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/PdfGenerator" element={<PdfGenerator />} />
      </Routes>
    </>
  );  
}

export default App;
