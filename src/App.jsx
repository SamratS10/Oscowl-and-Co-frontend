import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ResponsiveSidebar from './components/Layout'
import LoginForm from './components/Login'
import RegisterForm from './components/Register'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponsiveSidebar/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
      </Routes>
      {/* <h1>hello</h1> */}
    </BrowserRouter>
  )
}

export default App
