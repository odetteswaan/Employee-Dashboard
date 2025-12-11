import React from 'react'
import { Box,Typography,IconButton,Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate('/login')
    }
  return (
    <Box sx={{width:'100%',height:'50px',backgroundColor:'black',color:'white'
        ,display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'45px'
    }}>
            <Typography>Dashboard Page</Typography>
            <IconButton onClick={handleLogout}>
                    <LogoutIcon sx={{color:'white',height:'30px',width:'30px'}}/>
            </IconButton>
    </Box>
  )
}

export default Navbar