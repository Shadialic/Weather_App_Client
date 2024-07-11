import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserPublic from './protectRoute.jsx/UserPublic';
import LoginPage from '../pages/Layouts/LoginPage/LoginPage';
import SignupPage from '../pages/Layouts/SignupPage/SignupPage';
import HomePage from '../pages/Home/HomePage';

function UserRouter() {
    console.log('ddd');
  return (
    <>
        <Routes>
            <Route path='/login' element={<LoginPage/>  }/>
            <Route path='/signup' element={<SignupPage/>  }/>
            <Route path='/*' element={<HomePage/>  }/>


            {/* <Route path='/login' element={<UserPublic><LoginPage/></UserPublic>}/> */}
            {/* <Route path='/signup' element={<UserPublic><SignupPage/></UserPublic>}/> */}
        </Routes>

    </>
  )
}

export default UserRouter