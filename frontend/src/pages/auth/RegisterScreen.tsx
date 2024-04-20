import { ThemeProvider, Box, Avatar, Typography, TextField, Grid, Button, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../../components/utils/Theme";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:10000/api/users", formData);
      console.log("User registered successfully:", response.data);
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const { status, data } = axiosError.response;
          if (status === 400) {
            if ((data as ErrorResponse)?.message === "Email already in use") {
              toast.error("Email is already in use");
            } else if ((data as ErrorResponse)?.message === "Username already in use") {
              toast.error("Username is already in use");
            } else {
              toast.error("Registration failed: " + (data as ErrorResponse)?.message);
            }
          } else {
            toast.error("Registration failed: " + (data as ErrorResponse)?.message);
          }
        } else if (axiosError.request) {
          toast.error("No response received");
        } else {
          toast.error("Error occurred: " + axiosError.message);
        }
      } else {
        console.error("Unexpected error occurred:", error);
        toast.error("Registration failed");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: theme.palette.primary.dark,
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                  color: theme.palette.primary.dark,
                },
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
