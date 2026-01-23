import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextProvider from './Context/ContextProvider';
import Resumeupload from './Pages/Resumeupload';
import Resumeresult from './Pages/Resumeresult';
import JobMatches from './Pages/JobMatches';
import Chat from './Components/Chat';
import Studyplan from './Components/Studyplan';
import Profile from './Components/Profile';
export default function App() {
  return (
    <div className=''>
      <ContextProvider>
     <ToastContainer/>
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/JobMatches' element={<JobMatches/>} />
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/Profile' element={<Profile/>} />
      <Route path='/Studyplan' element={<Studyplan/>} />
      <Route path='/Resumeresult' element={<Resumeresult/>}/>
      <Route path='/Resumeupload' element={<Resumeupload/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      </Routes>
      </ContextProvider>
      
      
    </div>
  )
}
