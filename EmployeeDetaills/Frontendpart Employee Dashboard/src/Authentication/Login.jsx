import React, { useState } from "react";
import {
  Box,
  Typography,
  styled,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import { BaseUrl, SigninEndpoint } from "../EmployeeDashboard/Endpoint ";
import { useNavigate } from "react-router-dom";
const StyledTextfield = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: "#1976d2",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#004ba0",
      borderWidth: "2px",
    },
  },
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    axios.post(`${BaseUrl}/${SigninEndpoint}`, body).then((res) => {
      console.log(res.data.access_token);
      localStorage.setItem("token",res.data.access_token);
      navigate('/dashboard')

    }).catch(()=>{
      alert("User Does Not exist please Signup first")
    });
  };

  return (
      <form style={{ margin: 0, padding: 0, boxsizing: "border-box" }} onSubmit={handleSubmit}>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "40%", marginTop: "20px" }}>
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontFamily: "Zen Kaku Gothic Antique",
                  fontSize: "25px",
                  color: "black",
                  fontWeight: 700,
                }}
              >
                Welcome Back Exclusive Member{" "}
              </Typography>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontFamily: "Zen Kaku Gothic Antique",
                  fontSize: "25px",
                  color: "#424242",
                  fontWeight: 400,
                }}
              >
                Login To Continue
              </Typography>
            </Box>
          </Grid>
            <Grid size={12}>
              <StyledTextfield
                fullWidth
                placeholder="Enter Your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={12}>
              <StyledTextfield
                fullWidth
                placeholder="Enter your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlineIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={12}>
              <Button
                fullWidth
                sx={{
                  height: "70px",
                  color: "white",
                  backgroundColor: "#24243E",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                endIcon={<ArrowRightAltIcon />}
                type="submit"
              >
                Procced To Account
              </Button>
            </Grid>
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                    fontSize: "15px",
                    fontColor: "grey",
                    fontFamily: "Zen Kaku Gothic Antique",
                }}
                >
                Don't Have Account Click Here to Create Your Account
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
                  </form>
  );
};

export default Login;
