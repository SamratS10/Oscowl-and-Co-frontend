import React from 'react';
import { Box, Typography, Toolbar } from '@mui/material';
import AddTodo from './AddTodo';
const MainContent = ({ drawerWidth }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 1,
        ml: { sm: `0px` },
      }}
    >
      <Toolbar />
      {/* <Typography paragraph>
        This is where your main content goes.
      </Typography> */}
      <Box>
        <AddTodo/>
      </Box>
    </Box>
  );
};

export default MainContent;
