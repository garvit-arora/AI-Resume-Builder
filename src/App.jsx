import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Outlet } from 'react-router'
import Footer from './components/Footer/Footer'
function App() {

  return (
    <>
    <div className='overflow-x-hidden'>
    <Header />
    <Outlet />
    <Footer />
    </div>
    </>
  )
}

export default App
