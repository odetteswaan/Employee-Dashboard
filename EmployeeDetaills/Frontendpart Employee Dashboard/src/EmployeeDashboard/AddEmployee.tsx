import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction } from 'react';
import { useState ,useEffect} from 'react';
import axios, { Axios } from 'axios';
import { BaseUrl,endpoint } from './Endpoint ';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface EmployeeType{
    eid:String,
    ename:String,
    email:String,
    city:String,
}
interface modal{
  open:boolean,
  close:()=>void,
  setEmployeeData:Dispatch<SetStateAction<EmployeeType[]>>,
  EmployeeData:EmployeeType[],
  edit:boolean
index?:String,
}
 const AddEmployee :React.FC<modal>=({open,close,setEmployeeData,EmployeeData,edit,index}) =>{
  const [eid,setid]=useState('')
  const[ename,setname]=useState('')
  const[email,setmail]=useState('')
  const[city,setCity]=useState('')
if(edit){
useEffect(()=>{
axios.get(`${BaseUrl}/${endpoint}/${index}`).then(res=>{
  console.log(res.data);
  setid(res.data.eid);
  setname(res.data.ename);
  setmail(res.data.email);
  setCity(res.data.city)
})

},[])
}
const handleClose=()=>{
  close();
}
const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()
const emp_datta={
        eid:eid,
        ename:ename,
        email:email,
        city:city,
    }
// setEmployeeData([...EmployeeData,emp_datta])
axios.post(`${BaseUrl}/${endpoint}`,emp_datta).then((res)=>{
console.log(res.data);
window.location.reload()
}).catch(()=>{
  console.log("error while posting data")
})
 close()
}

const handleUpdate=(event: React.FormEvent<HTMLFormElement>)=>{
 event.preventDefault()
  const emp_datta={
        eid:eid,
        ename:ename,
        email:email,
        city:city,
    }
axios.put(`${BaseUrl}/${endpoint}/${index}`,emp_datta).then(()=>{
  console.log("employee data updated Sucessfully");
  window.location.reload()
}).catch(()=>{
  console.log("some error while updaing employing data ")
})
  close();
}
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',alignItems:"center"}}>
            <IconButton onClick={handleClose}>
              <CloseIcon color='error'></CloseIcon>
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit?"Update Employee Detail":'Enter Employee Details'}
          </Typography>
          <form onSubmit={edit?handleUpdate:handleSubmit}>

         <TextField fullWidth required sx={
          { borderRadius:'20px',marginTop:"10px"}
         } placeholder='enter employee id' onChange={(e)=>setid(e.target.value)} value={eid}/>
           <TextField fullWidth required sx={
          { borderRadius:'20px',marginTop:"10px"}
         } placeholder='enter employee name' onChange={(e)=>setname(e.target.value)} value={ename}/>
           <TextField fullWidth required sx={
          { borderRadius:'20px',marginTop:"10px"}
         } placeholder='enter employee email' onChange={(e)=>setmail(e.target.value)} value={email}/>
           <TextField fullWidth required sx={
          { borderRadius:'20px',marginTop:"10px"}
         } placeholder='enter employee city' onChange={(e)=>{setCity(e.target.value)}} value={city}/>
         <Button fullWidth color='success' sx={{marginTop:'10px',backgroundColor:'lightgreen',BorderRadius:'20px'}}
         type='submit'
         >Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default AddEmployee