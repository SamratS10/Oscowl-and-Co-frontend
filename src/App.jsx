import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ResponsiveSidebar from './components/Layout'
import LoginForm from './components/Login'
import RegisterForm from './components/Register'
import { useSelector } from 'react-redux'
import ProtectRoute from './components/ProtectRoute'
function App() {
  const{user,isAuthenticated} = useSelector((state)=>state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
        {<ProtectRoute user={user} isAuth={isAuthenticated}>
          <ResponsiveSidebar/>
          </ProtectRoute>
        }/>
        <Route path="/login" element={
          <ProtectRoute user={user} isAuth={isAuthenticated}>
        <LoginForm/>
          </ProtectRoute>
        }/>
        <Route path='/register' element={
          <ProtectRoute user={user} isAuth={isAuthenticated}>
            <RegisterForm/>
          </ProtectRoute>
          }/>
      </Routes>
      {/* <h1>hello</h1> */}
    </BrowserRouter>
  )
}

export default App
