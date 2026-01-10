import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Features from './pages/Features.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

function App() {

  return (
    <>
    <ScrollToTop/>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
