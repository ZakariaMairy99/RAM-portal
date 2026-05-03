import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import HotelDashboard from './pages/HotelDashboard'
import Layout from './components/Layout'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/portal" element={<Layout />}>
        <Route index element={<HotelDashboard />} />
      </Route>
      <Route path="/oauth/callback" element={<Navigate to="/portal" replace />} />
    </Routes>
  )
}

export default App
