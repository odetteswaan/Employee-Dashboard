import { useState, useEffect } from 'react'
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard'
import {BrowserRouter as Router ,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
function App() {
  const[IsAuthenticated,SetAuth]=useState(false)
  useEffect(()=>{
    const token=localStorage.getItem("token")
if(token){
  SetAuth(true)
}
 else {
      SetAuth(false);
    }
  },[])

          
  return (
    <>
           <Router>
            {IsAuthenticated?<Routes>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/Signup' element={<Signup/>}/>
                      <Route path='/dashboard' element={<EmployeeDashboard/>}/>
                      <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
                    </Routes>
            :<Routes>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/Signup' element={<Signup/>}/>
                      <Route path="*" element={<Navigate to="/login" replace />}/>
                    </Routes>}
                  

           </Router>
    </>
  )
}

export default App
