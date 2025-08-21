import { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



import './App.css'


import Login from './components/auth/Login';
import Home from './pages/Home';
import Cart from './components/cart/Cart';
import Protected from './components/common/Protected';
import Checkout from './components/cart/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Signup from './components/auth/Signup';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/OrderSuccess';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import UserOrders from './pages/UserOrders';
import UserProfile from './pages/UserProfile';
import Loading from './components/common/Loading';


import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from './redux-features/user/userApi';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected></Protected>,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/cart',
        // Component: Cart
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>
      },
      {
        path: '/productDetails/:id',
        element: <ProductDetailsPage></ProductDetailsPage>
      },
      {
        path: '/orderStatus',
        element: <OrderSuccess></OrderSuccess>
      },
      {
        path: '/my-orders',
        element: <UserOrders></UserOrders>
      }, {
        path: '/userprofile',
        element: <UserProfile></UserProfile>
      },
      {
        path: '*',
        element: <NotFound></NotFound>
      }
      
    ] 
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: '/signup',
    Component: Signup
  },
  {
    path: '/forget-password',
    element: <ForgetPassword></ForgetPassword>
  }, {
    path: '/reset-password',
    element: <ResetPassword></ResetPassword>
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);



function App() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.loggedInUser)

  useEffect(() => {
    // to load the user detail again in case of refereshing 
    if (!loggedInUser) {
      dispatch(isLoggedIn())
    }
  }, [])

  const userLoading = useSelector(state => state.user.status)



  if (userLoading == "pending") {
    return <Loading></Loading>
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
