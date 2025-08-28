import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,createBrowserRouter,createRoutesFromElements,Router,RouterProvider,Route } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import './index.css'
import App from './App.jsx'
import { Outlet } from 'react-router';
import Builder from './components/Builder/Builder.jsx';
import About from './components/About/About.jsx';
import Pricing from './components/Pricing/Pricing.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App />}>
      <Route index element = {<Home />} />
      <Route path = 'builder' element = {<Builder />} />
      <Route path = 'pricing' element = {<Pricing />} />
      <Route path = 'about' element = {<About />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
