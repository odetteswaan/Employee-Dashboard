import React, { useState } from 'react'
import { Box,Typography,styled,Button,Grid, TextField,InputAdornment} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { BaseUrl, SignupEndpoint } from '../EmployeeDashboard/Endpoint ';
import { useNavigate } from 'react-router-dom';
const StyledTextfield=styled(TextField)({
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',             
      '& fieldset': {
        borderColor: '#1976d2',         
      },
      '&:hover fieldset': {
        borderColor: '#1565c0',         
      },
      '&.Mui-focused fieldset': {
        borderColor: '#004ba0',         
        borderWidth: '2px',              
      },
    },
})
const Login = () => {
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const body={
            "Ename": name,
           "email": email,
         "password": password
        }
        axios.post(`${BaseUrl}/${SignupEndpoint}`,body).then((res)=>{
                console.log(res.data);
                navigate('/login')

        }).catch((err)=>{
            console.log(err)
            alert("some error Occured")
        })

    }
  return (
    <form style={{ margin: 0, padding: 0, boxsizing: "border-box" }} onSubmit={handleSubmit}>

    <Box sx={{width:"100%", display:"flex",justifyContent:'center',alignItems:'center',height:"100vh"}}>
        <Box sx={{width:"40%",marginTop:'20px'}}>
            <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid size={12}>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                             <Typography sx={{fontFamily:"Zen Kaku Gothic Antique",
                                fontSize:'25px',color:'black',fontWeight:700
                             }}>Become An Exclusive Member </Typography>
                        
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Typography sx={{fontFamily:"Zen Kaku Gothic Antique",
                                fontSize:'25px',color:'#424242',fontWeight:400}}>Signup And Join The Partnership</Typography>
                    </Box>

                </Grid>
                <Grid size={12}>
                    <StyledTextfield fullWidth placeholder='Enter Your Full Name'  required onChange={(e)=>setName(e.target.value)}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position='start'>
                                <PersonIcon color='disabled'/>
                            </InputAdornment>
                        )
                    }}
                    />
                </Grid>
                <Grid size={12}>
                    <StyledTextfield fullWidth placeholder='Enter Your Email'  required onChange={(e)=>setEmail(e.target.value)}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position='start'>
                                <EmailIcon color="disabled"/>
                            </InputAdornment>
                        )
                    }}
                    />
                </Grid>
                <Grid size={12}>
                    <StyledTextfield fullWidth placeholder='Enter your Password'  required onChange={(e)=>setPassword(e.target.value)}
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position='start'>
                                <LockOutlineIcon color="disabled"/>
                            </InputAdornment>
                        )
                    }}
                    />
                </Grid>
                <Grid size={12}>
                    <Button fullWidth type="submit" sx={{height:'70px',color:"white",
                        backgroundColor:"#24243E",display:'flex',justifyContent:"space-around",alignItems:'center'}} endIcon={<ArrowRightAltIcon/>}> 
                        Procced To Account</Button>

                </Grid>
                <Grid size={12}>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                    <Typography sx={{fontSize:"15px",fontColor:'grey',fontFamily:"Zen Kaku Gothic Antique"}}>
                          Already Have Account ,login here 
                    </Typography>

                    </Box>

                </Grid>
                
            </Grid>


        </Box>

    </Box>
    </form>
  )
}

export default Login