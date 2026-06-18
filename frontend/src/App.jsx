import { Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Suspense fallback='loading...'><Dashboard /></Suspense>} />
          <Route path="/user" element = {<Suspense fallback='loading...'><UserInfo /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App
