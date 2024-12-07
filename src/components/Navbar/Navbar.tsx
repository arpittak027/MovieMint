import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserMenuAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Typography
          variant="h6"
          onClick={() => handleNavigation('/')}
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontFamily: 'Poppins',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          MovieMint
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleNavigation('/movies')}>Movies</MenuItem>
              {isAuthenticated ? (
                [
                  <MenuItem key="account" onClick={() => handleNavigation('/account')}>My Account</MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="login" onClick={() => handleNavigation('/login')}>Login</MenuItem>,
                  <MenuItem key="signup" onClick={() => handleNavigation('/signup')}>Sign Up</MenuItem>
                ]
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => handleNavigation('/movies')}
            >
              Movies
            </Button>
            {isAuthenticated ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleUserMenu}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleNavigation('/account')}>My Account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleNavigation('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
