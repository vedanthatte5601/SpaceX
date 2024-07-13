import { Routes, Route, Router } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import Header from './components/Header'

function App() {
  return (
    <div className='App'>
      <Header />

      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
      </Routes>
    </div>
  )
}

export default App
