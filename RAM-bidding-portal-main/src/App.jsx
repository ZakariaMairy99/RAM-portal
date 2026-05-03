import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import HotelDashboard from './pages/HotelDashboard'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/portal" element={<Layout />}>
        <Route index element={<HotelDashboard />} />
      </Route>
      <Route path="/login" element={<Navigate to="/portal" replace />} />
      <Route path="/oauth/callback" element={<Navigate to="/portal" replace />} />
    </Routes>
  )
}

export default App
