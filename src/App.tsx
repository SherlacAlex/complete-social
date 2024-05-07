import React, { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite-services/auth-service';
import { logIn, logOut } from './store/AuthSlice';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

function App() {

  const [ loading, setLoading ] = useState<boolean>(true);
  const dispatch = useDispatch();

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
        <div>
          <Header/>
          <Footer/>
        </div>
      </>
    )
  }
}

export default App;
