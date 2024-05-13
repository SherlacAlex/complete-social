import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite-services/auth-service';
import { logIn, logOut } from './store/AuthSlice';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { UserAuth } from './models/UserAuth';
import { BrowserRouter } from 'react-router-dom';
import PostCard from './components/post-card/PostCard';


function App() {

  const [ loading, setLoading ] = useState<boolean>(true);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state:UserAuth) => state.loggedStatus);
  

  useEffect(() => {
    authService.getCurrentUser().then((userDetails) => {
        if(userDetails) {
          dispatch(logIn({userDetails}));
        }
        else {
          dispatch(logOut());
        }
      }
    )
    .catch((error) => {
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  if(loading) {
    return(
      <>
        <div className='bg-red-300'>
          loading
        </div>
      </>
    )
  }
  else {
    return(
      <>
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn}/>
          <PostCard $id='1'title="hi" featuredImage="./assets/logo.jpg"/>
        </BrowserRouter>
        <Footer/>
      </>
    )
  }
}

export default App;
