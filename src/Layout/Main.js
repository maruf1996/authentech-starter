import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AuthProvider from '../contexts/AuthProvider';

const Main = () => {
    return (
        <AuthProvider>
           <Navbar></Navbar>
           <Outlet></Outlet>
        </AuthProvider>
    );
};

export default Main;