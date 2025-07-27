import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import HomePage from './pages/home'
import HashingPage from './pages/hashing'
import EncryptionPage from './pages/encryption'
import SignaturesPage from './pages/signatures'
import CaesarPage from './pages/encryption/caesar'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="hashing" element={<HashingPage />} />
        <Route path="encryption" >
          <Route index element={<EncryptionPage />} />
          <Route path="caesar" element={<CaesarPage />} />
        </Route>
        <Route path="signatures" element={<SignaturesPage />} />
      </Route>
    </Routes>
  )
}

export default App
