import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, ThemeProvider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../utils/Theme';
import NotReady from '../error/NotReady';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../utils/AuthContext';

function Header() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  }; 

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post("http://localhost:10000/api/users/logout");
      logout();
      console.log("User logged out successfully:", response.data);
      toast.success("Logout Successful");
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Unexpected error occurred:", error);
      toast.error("Login failed");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              variant="regular"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
                bgcolor:
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 40,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow:
                  theme.palette.mode === 'light'
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
              })}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  ml: '-18px',
                  px: 0,
                }}
              >
                <Typography variant='h6' sx={{color: "#000", ml: 3, mr: 3}}>
                  <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>Task Manager</Link>
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <MenuItem
                    component={Link}
                    to='/'
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <IconButton color="primary">
                      <DashboardIcon />
                      <Typography color="text.primary" sx={{marginLeft: "5px"}}>
                        Dashboard
                      </Typography>
                    </IconButton>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="#"
                    sx={{ py: '6px', px: '12px' }}
                    onClick={NotReady}
                  >
                    <IconButton color="primary">
                      <ViewTimelineIcon />
                      <Typography color="text.primary" sx={{marginLeft: "5px"}}>
                        Timeline
                      </Typography>
                    </IconButton>
                  </MenuItem>
                </Box>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 0.5,
                  alignItems: 'center',
                }}
              >
                {isLoggedIn ? (
                  <>
                    <Button onClick={handleClick}>
                      <AccountCircle sx={{marginRight: "5px"}} />
                      {username}
                    </Button>
                    <Menu
                      id="account-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem component={Link} to="/profile" onClick={handleClose}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={logoutHandler}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <IconButton
                      color="primary"
                      aria-label="account menu"
                      aria-controls="account-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <AccountCircle />
                      <Typography color="textPrimary" sx={{textDecoration: "none", marginLeft: "5px"}}>
                        Profile
                      </Typography>
                    </IconButton>
                    <Menu
                      id="account-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose} component={Link} to='/login'>Login</MenuItem>
                      <MenuItem onClick={handleClose} component={Link} to='/register'>Register</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
              <Box sx={{ display: { sm: '', md: 'none' } }}>
                <Button
                  variant="text"
                  bg-color="secondary.dark"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ minWidth: '30px', p: '4px' }}
                >
                  <MenuIcon />
                </Button>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                  <Box
                    sx={{
                      minWidth: '60dvw',
                      p: 2,
                      backgroundColor: 'background.paper',
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        flexGrow: 1,
                      }}
                    >
                    </Box>
                    <MenuItem component={Link} to='/' onClick={handleClose}>
                      <IconButton
                        color="primary"
                        aria-label="account menu"
                        aria-controls="account-menu"
                        aria-haspopup="true"
                      >
                        <DashboardIcon />
                        <Typography variant="body2" color="text.primary" sx={{textDecoration: "none", marginLeft: "5px"}}>
                          Dashboard
                        </Typography>
                      </IconButton>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={NotReady} component={Link} to='#'>
                      <IconButton
                        color="primary"
                        aria-label="account menu"
                        aria-controls="account-menu"
                        aria-haspopup="true"
                      >
                        <ViewTimelineIcon />
                        <Typography variant="body2" color="text.primary" sx={{textDecoration: "none", marginLeft: "5px"}}>
                          Timeline
                        </Typography>
                      </IconButton>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <IconButton
                        color="inherit"
                        aria-label="account menu"
                        aria-controls="account-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <AccountCircle />
                        <Typography variant="body2" color="textPrimary" sx={{textDecoration: "none", marginLeft: "5px"}}>
                          {isLoggedIn ? username : "Profile"}
                        </Typography>
                      </IconButton>
                      <Menu
                        id="account-menu"
                      >
                        <MenuItem component={Link} to='/login'>Login</MenuItem>
                        <MenuItem component={Link} to='/register'>Register</MenuItem>
                      </Menu>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;
