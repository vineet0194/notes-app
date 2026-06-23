import { Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo'
import Login from './components/Login';
import Landing from './components/Landing';
import UserProvider from './providers/UserProvider';
import NotesProvider from './providers/NotesProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <NotesProvider>
              <Navbar/>
              <Routes>
                <Route path="/" element={<Suspense fallback='loading...'><Landing /></Suspense>}/>
                <Route path="/dashboard" element={<Suspense fallback='loading...'><Dashboard /></Suspense>} />
                <Route path="/auth/login" element={<Suspense fallback='loading...'><Login /></Suspense>} />
                <Route path="/user" element={<Suspense fallback='loading...'><UserInfo /></Suspense>} />
              </Routes>
          </NotesProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
  
}

export default App
