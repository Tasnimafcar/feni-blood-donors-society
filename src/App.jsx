import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DonorSearch from './pages/DonorSearch'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donors" element={<DonorSearch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App