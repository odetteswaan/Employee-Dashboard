import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import axios from 'axios'
import { BaseUrl, endpoint } from "./Endpoint ";
import Navbar from "./Navbar";
interface EmployeeType {
  eid: String;
  ename: String;
  email: String;
  city: String;
}

const EmployeeDashboard = () => {
  const [employeeData, setData] = useState<EmployeeType[]>([]);
  const [Open, SetOpen] = useState(false);
  const[edit,setEdit]=useState(false);
  const[index,setIndex]=useState<String>();
  const[isloading,setLoading]=useState(true)
  const StyledTypography = styled(Typography)({
    fontWeight: 600,
    fontFamily: "Poppins",
    fontSize: "18px",
  });
  const EmployeeDataTypography = styled(Typography)({
    fontWeight: 400,
    fontFamily: "Poppins",
    fontSize: "15px",
  });
  const handleDelete = (id: String) => {
   axios.delete(`${BaseUrl}/${endpoint}/${id}`).then(()=>{
       console.log("employee deleted suceesfully");
       window.location.reload();
   }).catch(()=>{
       console.log("error in deleting the employee data ")
   })
  };
  useEffect(()=>{
          axios.get(`${BaseUrl}/${endpoint}`).then((res)=>{
              console.log("error in fetching data")
              setData(res.data);
              setLoading(false)
              
          }).catch(()=>{
              console.log("Error in Fetching Data")
          })
  },[])
  return (
       <>
       <Navbar/>
       {isloading?<p>loading please wait</p>:
    <>
      {Open ? (
        <AddEmployee
          open={Open}
          close={() => SetOpen(false)}
          setEmployeeData={setData}
          EmployeeData={employeeData}
          edit={edit}
          index={index}
        />
      ) : (
        <Box>
              <Box style={{width:'100%',display:'flex',justifyContent:'center'}}>

          <Button onClick={() => SetOpen(true)} color="success" sx={{
               textTransform:'capitalize',
               backgroundColor:'lightgreen'

          }} endIcon={<AddCircleOutlineIcon color="success"/>}>Add Employee</Button>
              </Box>
          <Grid container spacing={2} sx={{ padding: "20px" }}>
            <Grid size={{ xs: 2.4 }}>
              <StyledTypography>EmployeeId</StyledTypography>
            </Grid>
            <Grid size={{ xs: 2.4 }}>
              <StyledTypography>EmployeeName</StyledTypography>
            </Grid>
            <Grid size={{ xs: 2.4 }}>
              <StyledTypography>Email</StyledTypography>
            </Grid>
            <Grid size={{ xs: 2.4 }}>
              <StyledTypography>City</StyledTypography>
            </Grid>
            <Grid size={{ xs: 2.4 }}>
              <StyledTypography>Action</StyledTypography>
            </Grid>
            {employeeData.map((item) => (
              <>
                <Grid size={{ xs: 2.4 }}>
                  <EmployeeDataTypography>{item.eid}</EmployeeDataTypography>
                </Grid>
                <Grid size={{ xs: 2.4 }}>
                  <EmployeeDataTypography>{item.ename}</EmployeeDataTypography>
                </Grid>
                <Grid size={{ xs: 2.4 }}>
                  <EmployeeDataTypography>{item.email}</EmployeeDataTypography>
                </Grid>
                <Grid size={{ xs: 2.4 }}>
                  <EmployeeDataTypography>{item.city}</EmployeeDataTypography>
                </Grid>
                <Grid size={{ xs: 2.4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <IconButton onClick={() => handleDelete(item.eid)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton>
                      <EditIcon color="success" onClick={()=>{setIndex(item.eid);setEdit(true);SetOpen(true);}}/>
                    </IconButton>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      )}
    </>}
       </>
  );
};

export default EmployeeDashboard;
