import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Model from './screens/Model'
import PreAuth from './screens/PreAuth'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PreAuth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/model' element={<Model />} />
      </Routes>
        
    </>
  )
}

export default App
