import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useAppDispatch } from '../../hooks/redux'
import { logoutUser } from '../../store/slices/authSlice'

const Layout: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Box className="min-h-screen">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Box component="main" className="p-4">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout 