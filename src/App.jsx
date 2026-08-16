import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DonorSearch from './pages/DonorSearch'
import Register from './pages/Register'
import Account from './pages/Account'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donors" element={<DonorSearch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App