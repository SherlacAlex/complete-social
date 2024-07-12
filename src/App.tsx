import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite-services/auth-service';
import { Route, Routes } from 'react-router-dom';
import { logIn, logOut } from './store/AuthSlice';
import Header from './components/header/Header';
import Signup from './components/signup/Signup';
import Home from './components/Home/Home';
import AuthLayout from './components/Layout/AuthLayout';
import HomeLayout from './components/Layout/HomeLayout';


function App() {

  return(
    <>
      <main className='flex h-screen'>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout/>}>
            <Route path='/signin' element={<Signup showRegister={false}/>}/>
            <Route path='/signup' element={<Signup showRegister={true}/>}/>
          </Route>

          {/* private routes */}
          <Route element={<HomeLayout/>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App;
