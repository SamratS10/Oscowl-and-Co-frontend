import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './Cards';
//import AddTask from './AddTask';
//import AddTaskDialog from './AddTaskDialog';

const ResponsiveSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const drawerWidth = 240;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to toggle sidebar on small screens
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={handleSidebarToggle} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarToggle}
        isSmallScreen={isSmallScreen}
        drawerWidth={drawerWidth}
      />
      <MainContent drawerWidth={drawerWidth} />
    </Box>
  );
};

export default ResponsiveSidebar;
