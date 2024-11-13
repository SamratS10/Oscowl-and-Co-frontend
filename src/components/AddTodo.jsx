import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './TodoForm'; // Assuming you have the form to add/edit todos
import { Button, colors, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos); // Get todos from Redux
  const activeFilter = useSelector(state => state.active.active);
  const [editingTodo, setEditingTodo] = useState(null); // To track the todo being edited
  const [open, setOpen] = useState(false); // To control the opening/closing of the form
  const filteredTodos = todos.filter(todo => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Completed') return todo.completed;
    if (activeFilter === 'Pending') return !todo.completed;
    return true;
  });
  // Fetch or initialize todos (optional)
  useEffect(() => {
    // You can dispatch an action to fetch todos from an API or localStorage here if needed
    // dispatch(setTodos(fetchedTodos));
  }, [dispatch]);

  // Function to handle adding or editing a todo
  const handleAddOrEditTodo = (todo) => {
    if (editingTodo) {
      dispatch(updateTodo(todo)); // Update todo if editing
    } else {
      dispatch(addTodo({ ...todo, id: uuidv4() })); // Add new todo with uuid
    }
    setOpen(false); // Close the form
    setEditingTodo(null); // Reset editingTodo
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
    setOpen(true); // Open the form dialog
  };

  const handleOpenForm = () => {
    setOpen(true); // Open the form when adding a new todo
  };

  const handleCloseForm = () => {
    setOpen(false); // Close the form
    setEditingTodo(null); // Reset editingTodo
  };

  return (
    <div>
      <Button sx={{backgroundColor:"black",color:"#ffffff",padding:"5px 10px 5px 10px"}} onClick={handleOpenForm}><Typography sx={{marginRight:"5px"}}><AddCircleIcon/></Typography> Add Todo</Button> 
      <TodoList todos={filteredTodos} onEdit={handleEdit} />
      <TodoForm 
        open={open} 
        handleClose={handleCloseForm} 
        todoToEdit={editingTodo} 
        onSubmit={handleAddOrEditTodo} 
      />
    </div>
  );
};

export default TodoApp;


// import React, { useEffect, useState } from 'react';
// import TodoList from './TodoList';
// import { useSelector, useDispatch } from 'react-redux';
// //import { addTodo, updateTodo } from '../redux/todoSlice';
// import { addTodo,updateTodo } from '../slices/todoSlice';
// import { v4 as uuidv4 } from 'uuid';
// import TodoForm from './TodoForm'; // Assuming you have the form to add/edit todos

// const TodoApp = () => {
//   const dispatch = useDispatch();
//   const todos = useSelector(state => state.todos.todos); // Get todos from Redux
//   const [editingTodo, setEditingTodo] = useState(null); // To track the todo being edited
//   const [open, setOpen] = useState(false); // To control the opening/closing of the form

//   // Fetch or initialize todos (optional)
//   useEffect(() => {
//     // You can dispatch an action to fetch todos from an API or localStorage here if needed
//     // dispatch(setTodos(fetchedTodos));
//   }, [dispatch]);

//   // Function to handle adding or editing a todo
//   const handleAddOrEditTodo = (todo) => {
//     if (editingTodo) {
//       dispatch(updateTodo(todo)); // Update todo if editing
//     } else {
//       dispatch(addTodo({ ...todo, id: uuidv4() })); // Add new todo with uuid
//     }
//     setOpen(false); // Close the form
//     setEditingTodo(null); // Reset editingTodo
//   };

//   const handleEdit = (todo) => {
//     setEditingTodo(todo); // Set the todo to be edited
//     setOpen(true); // Open the form dialog
//   };

//   const handleOpenForm = () => {
//     setOpen(true); // Open the form when adding a new todo
//   };

//   const handleCloseForm = () => {
//     setOpen(false); // Close the form
//     setEditingTodo(null); // Reset editingTodo
//   };

//   return (
//     <div>
//       <button onClick={handleOpenForm}>Add Todo</button> {/* Button to open form */}
//       <TodoList todos={todos} onEdit={handleEdit} />
//       <TodoForm open={open} handleClose={handleCloseForm} todoToEdit={editingTodo} onSubmit={handleAddOrEditTodo} />
//     </div>
//   );
// };

// export default TodoApp;


// // import React, { useState } from 'react';
// // import { Button } from '@mui/material';
// // import TodoForm from './TodoForm';
// // import { useSelector } from 'react-redux';
// // import TodoList from './TodoList';  

// // const AddTodo = () => {
// //   const todos = useSelector(state => state.todos.todos);
// //   const [open, setOpen] = useState(false);

// //   // Function to handle opening the modal
// //   const handleOpen = () => {
// //     setOpen(true);
// //   };

// //   // Function to handle closing the modal
// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   // Function to handle form submission
// //   const handleSubmit = (values) => {
// //     console.log('Form submitted:', values);
// //     // You can add logic here to handle form submission (e.g., updating state or making an API call)
// //   };

// //   return (
// //     <div>
// //       <Button variant="contained" color="primary" onClick={handleOpen}>
// //         Create New Todo
// //       </Button>

// //       <TodoForm open={open} handleClose={handleClose} onSubmit={handleSubmit} />
// //     </div>
// //   );
// // };

// // export default AddTodo;



// // // import React, { useState } from 'react';
// // // import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox, Grid } from '@mui/material';
// // // import { DesktopDatePicker } from '@mui/x-date-pickers';
// // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns'; // Import the adapter

// // // const AddTaskDialog = ({ open, handleClose, handleSave }) => {
// // //   const [todo, setTodo] = useState({
// // //     title: '',
// // //     description: '',
// // //     priority: 'low',
// // //     dueDate: null, // Initialize as null
// // //     status: false, // false: incomplete, true: completed
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setTodo((prevState) => ({
// // //       ...prevState,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleDateChange = (newDate) => {
// // //     setTodo((prevState) => ({
// // //       ...prevState,
// // //       dueDate: newDate,
// // //     }));
// // //   };

// // //   const handleCheckboxChange = (e) => {
// // //     const { checked } = e.target;
// // //     setTodo((prevState) => ({
// // //       ...prevState,
// // //       status: checked,
// // //     }));
// // //   };

// // //   const handleSubmit = () => {
// // //     handleSave(todo);
// // //     handleClose();
// // //   };

// // //   return (
// // //     <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Wrap with LocalizationProvider */}
// // //       <Dialog open={open} onClose={handleClose}>
// // //         <DialogTitle>Add Todo</DialogTitle>
// // //         <DialogContent>
// // //           <Grid container spacing={2}>
// // //             {/* Title */}
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 label="Title"
// // //                 fullWidth
// // //                 name="title"
// // //                 value={todo.title}
// // //                 onChange={handleChange}
// // //               />
// // //             </Grid>

// // //             {/* Description */}
// // //             <Grid item xs={12}>
// // //               <TextField
// // //                 label="Description"
// // //                 fullWidth
// // //                 name="description"
// // //                 multiline
// // //                 value={todo.description}
// // //                 onChange={handleChange}
// // //               />
// // //             </Grid>

// // //             {/* Priority */}
// // //             <Grid item xs={12}>
// // //               <FormControl fullWidth>
// // //                 <InputLabel>Priority</InputLabel>
// // //                 <Select
// // //                   name="priority"
// // //                   value={todo.priority}
// // //                   onChange={handleChange}
// // //                   label="Priority"
// // //                 >
// // //                   <MenuItem value="low">Low</MenuItem>
// // //                   <MenuItem value="medium">Medium</MenuItem>
// // //                   <MenuItem value="high">High</MenuItem>
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>

// // //             {/* Due Date */}
// // //             <Grid item xs={12}>
// // //               <DesktopDatePicker
// // //                 label="Due Date"
// // //                 inputFormat="MM/dd/yyyy"
// // //                 value={todo.dueDate}
// // //                 onChange={handleDateChange}
// // //                 renderInput={(params) => <TextField {...params} fullWidth />}
// // //               />
// // //             </Grid>

// // //             {/* Status */}
// // //             <Grid item xs={12}>
// // //               <FormControlLabel
// // //                 control={
// // //                   <Checkbox
// // //                     checked={todo.status}
// // //                     onChange={handleCheckboxChange}
// // //                   />
// // //                 }
// // //                 label="Completed"
// // //               />
// // //             </Grid>
// // //           </Grid>
// // //         </DialogContent>

// // //         <DialogActions>
// // //           <Button onClick={handleClose} color="primary">
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmit} color="primary">
// // //             Save
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </LocalizationProvider>
// // //   );
// // // };

// // // export default AddTaskDialog;


// // // // import React, { useState } from 'react';
// // // // import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Checkbox, Grid } from '@mui/material';
// // // // import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// // // // const AddTaskDialog = ({ open, handleClose, handleSave }) => {
// // // //   const [todo, setTodo] = useState({
// // // //     title: '',
// // // //     description: '',
// // // //     priority: 'low',
// // // //     dueDate: null,
// // // //     status: false, // false: incomplete, true: completed
// // // //   });

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setTodo((prevState) => ({
// // // //       ...prevState,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handleDateChange = (newDate) => {
// // // //     setTodo((prevState) => ({
// // // //       ...prevState,
// // // //       dueDate: newDate,
// // // //     }));
// // // //   };

// // // //   const handleCheckboxChange = (e) => {
// // // //     const { checked } = e.target;
// // // //     setTodo((prevState) => ({
// // // //       ...prevState,
// // // //       status: checked,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     handleSave(todo);
// // // //     handleClose();
// // // //   };

// // // //   return (
// // // //     <Dialog open={open} onClose={handleClose}>
// // // //       <DialogTitle>Add Todo</DialogTitle>
// // // //       <DialogContent>
// // // //         <Grid container spacing={2}>
// // // //           {/* Title */}
// // // //           <Grid item xs={12}>
// // // //             <TextField
// // // //               label="Title"
// // // //               fullWidth
// // // //               name="title"
// // // //               value={todo.title}
// // // //               onChange={handleChange}
// // // //             />
// // // //           </Grid>

// // // //           {/* Description */}
// // // //           <Grid item xs={12}>
// // // //             <TextField
// // // //               label="Description"
// // // //               fullWidth
// // // //               name="description"
// // // //               multiline
// // // //               value={todo.description}
// // // //               onChange={handleChange}
// // // //             />
// // // //           </Grid>

// // // //           {/* Priority */}
// // // //           <Grid item xs={12}>
// // // //             <FormControl fullWidth>
// // // //               <InputLabel>Priority</InputLabel>
// // // //               <Select
// // // //                 name="priority"
// // // //                 value={todo.priority}
// // // //                 onChange={handleChange}
// // // //                 label="Priority"
// // // //               >
// // // //                 <MenuItem value="low">Low</MenuItem>
// // // //                 <MenuItem value="medium">Medium</MenuItem>
// // // //                 <MenuItem value="high">High</MenuItem>
// // // //               </Select>
// // // //             </FormControl>
// // // //           </Grid>

// // // //           {/* Due Date */}
// // // //           <Grid item xs={12}>
// // // //             <DesktopDatePicker
// // // //               label="Due Date"
// // // //               inputFormat="MM/DD/YYYY"
// // // //               value={todo.dueDate}
// // // //               onChange={handleDateChange}
// // // //               renderInput={(params) => <TextField {...params} fullWidth />}
// // // //             />
// // // //           </Grid>

// // // //           {/* Status */}
// // // //           <Grid item xs={12}>
// // // //             <FormControlLabel
// // // //               control={
// // // //                 <Checkbox
// // // //                   checked={todo.status}
// // // //                   onChange={handleCheckboxChange}
// // // //                 />
// // // //               }
// // // //               label="Completed"
// // // //             />
// // // //           </Grid>
// // // //         </Grid>
// // // //       </DialogContent>

// // // //       <DialogActions>
// // // //         <Button onClick={handleClose} color="primary">
// // // //           Cancel
// // // //         </Button>
// // // //         <Button onClick={handleSubmit} color="primary">
// // // //           Save
// // // //         </Button>
// // // //       </DialogActions>
// // // //     </Dialog>
// // // //   );
// // // // };

// // // // export default AddTaskDialog;
