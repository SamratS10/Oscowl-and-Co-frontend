import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../slices/activeSlice'; // import the setActive action

const Sidebar = ({ isOpen, onClose, isSmallScreen, drawerWidth }) => {
  const active = useSelector((state) => state.active.active); // get active from Redux
  const dispatch = useDispatch(); // dispatch action to update active state

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={isOpen || !isSmallScreen}
      onClose={onClose}
      sx={{
        width: { sm: drawerWidth },
        flexShrink: 0,
        backgroundColor: '#ffffff',
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        marginTop: 0,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Toolbar />
      <List>
        {['All', 'Completed', 'Pending'].map((text) => (
          <ListItem
            sx={{
              backgroundColor: active === text ? 'black' : 'white',
              '&:hover': active !== text ? { backgroundColor: 'transparent' } : undefined,
            }}
            button
            key={text}
            onClick={() => {
              if (isSmallScreen) onClose();
              dispatch(setActive(text)); // update active state in Redux
            }}
          >
            <ListItemText
              primary={text}
              sx={{
                color: active === text ? 'white' : 'black',
                '&hover': 'hidden',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

// const Sidebar = ({ isOpen, onClose, isSmallScreen, drawerWidth }) => {
//     const [active,setActive] = useState("All")
//   return (
//     <Drawer
//       variant={isSmallScreen ? 'temporary' : 'permanent'}
//       open={isOpen || !isSmallScreen}
//       onClose={onClose}
//       sx={{
//         width: { sm: drawerWidth },
//         flexShrink: 0,
//         backgroundColor:'#ffffff',
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//         },
//         marginTop:0      }}
//       ModalProps={{
//         keepMounted: true,
//       }}
//     >
//       <Toolbar />
//       <List>
//         {['All', 'Completed', 'Pending', 'Overdue'].map((text) => (
//           <ListItem sx={{backgroundColor:active===text? "black" : "white",'&:hover':active !== text ? { backgroundColor: 'transparent' } : undefined,}} button key={text} onClick={()=>{
//             isSmallScreen ? onClose : undefined
//             setActive(text)
//           }}>
//             <ListItemText primary={text} sx={{color:active===text? "white" : "black","&hover":'hidden'}} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
