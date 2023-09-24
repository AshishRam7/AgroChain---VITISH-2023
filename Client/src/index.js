import React from 'react';
import reactDOM from 'react-dom';
//import BlendModeSlider from "./components/BlendModeSlider/BlendModeSlider";

import App from './App';

import Services from './Pages/Services';
import Postdetails from './Pages/Postdetails';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Verify from './Pages/Verify';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    
    {
        path: "Services",
        element: <Services/>,
      },
      {
        path:"Login",
        element:<Postdetails/>
      },
      {
        path:"Verify",
        element:<Verify/>
      }




  ]);

reactDOM.render(

<RouterProvider router = {router}/>
, document.getElementById('root'));