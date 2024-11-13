import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { v4 as uuidv4 } from 'uuid';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().required('Priority is required'),
  dueDate: Yup.date().required('Due date is required').nullable().typeError('Invalid date format'),
  completed: Yup.boolean()
});

const TodoForm = ({ open, handleClose, todoToEdit }) => {
  const dispatch = useDispatch();

  // Initial values for form fields
  const initialValues = {
    title: todoToEdit ? todoToEdit.title : '',
    description: todoToEdit ? todoToEdit.description : '',
    priority: todoToEdit ? todoToEdit.priority : '',
    dueDate: todoToEdit ? todoToEdit.dueDate : new Date().toISOString().split('T')[0],
    completed: todoToEdit ? todoToEdit.completed : false,
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{textAlign:"center",marginTop:"20px",fontSize:"20px",fontWeight:"bold"}}>{todoToEdit ? 'Edit Todo' : 'Create a New Todo'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const todoWithId = { ...values, id: todoToEdit ? todoToEdit.id : uuidv4() };
          if (todoToEdit) {
            dispatch(updateTodo(todoWithId));  // Update todo if editing
          } else {
            dispatch(addTodo(todoWithId));  // Add new todo if creating
          }
          handleClose();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
          <Form>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.priority && Boolean(errors.priority)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
                {touched.priority && errors.priority && (
                  <div style={{ color: 'red' }}>{errors.priority}</div>
                )}
              </FormControl>
              <TextField
                 fullWidth
                 label="Due Date"
                 type="date"
                 name="dueDate"
                 InputLabelProps={{ shrink: true }}
                 value={values.dueDate || ''}
                 onChange={(e) => setFieldValue('dueDate', e.target.value)}
                 onBlur={handleBlur}
                 error={touched.dueDate && Boolean(errors.dueDate)}
                 helperText={touched.dueDate && errors.dueDate}
                 margin="normal"
               />
               <TextField
                 fullWidth
                 select
                 label="Completed"
                 name="completed"
                 value={values.completed ? 'true' : 'false'}
                 onChange={(e) => setFieldValue('completed', e.target.value === 'true')}
                 onBlur={handleBlur}
                 margin="normal"
               >
                 <MenuItem value="false">False</MenuItem>
                 <MenuItem value="true">True</MenuItem>
               </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default TodoForm;


// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { addTodo, updateTodo } from '../slices/todoSlice';
// import { v4 as uuidv4 } from 'uuid';  // Import uuidv4 for generating unique IDs

// // Validation schema using Yup
// const validationSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().required('Description is required'),
//   priority: Yup.string().required('Priority is required'),
//   dueDate: Yup.date().required('Due date is required').nullable().typeError('Invalid date format'),
//   completed: Yup.boolean()
// });

// const TodoForm = ({ open, handleClose, todoToEdit, onSubmit }) => {
//   const dispatch = useDispatch();

//   // Initial values for form fields
//   const initialValues = {
//     title: todoToEdit ? todoToEdit.title : '',
//     description: todoToEdit ? todoToEdit.description : '',
//     priority: todoToEdit ? todoToEdit.priority : '',
//     dueDate: todoToEdit ? todoToEdit.dueDate : new Date().toISOString().split('T')[0], // Default to today's date
//     completed: todoToEdit ? todoToEdit.completed : false,
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>{todoToEdit ? 'Edit Todo' : 'Create a New Todo'}</DialogTitle>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           const todoWithId = { ...values, id: todoToEdit ? todoToEdit.id : uuidv4() };  // Add unique id using uuidv4
//           if (todoToEdit) {
//             dispatch(updateTodo(todoWithId));  // Update todo if editing
//           } else {
//             dispatch(addTodo(todoWithId));  // Add new todo if creating
//           }
//           handleClose();
//         }}
//       >
//         {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
//           <Form>
//             <DialogContent>
//               <TextField
//                 fullWidth
//                 label="Title"
//                 name="title"
//                 value={values.title}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.title && Boolean(errors.title)}
//                 helperText={touched.title && errors.title}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.description && Boolean(errors.description)}
//                 helperText={touched.description && errors.description}
//                 margin="normal"
//               />
//               <FormControl fullWidth margin="normal">
//                 <TextField
//                   select
//                   label="Priority"
//                   name="priority"
//                   value={values.priority}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.priority && Boolean(errors.priority)}
//                 >
//                   <MenuItem value="Low">Low</MenuItem>
//                   <MenuItem value="Medium">Medium</MenuItem>
//                   <MenuItem value="High">High</MenuItem>
//                 </TextField>
//               </FormControl>
//               {touched.priority && errors.priority && (
//                 <div style={{ color: 'red' }}>{errors.priority}</div>
//               )}
//               <TextField
//                 fullWidth
//                 label="Due Date"
//                 type="date"
//                 name="dueDate"
//                 InputLabelProps={{ shrink: true }}
//                 value={values.dueDate || ''}
//                 onChange={(e) => setFieldValue('dueDate', e.target.value)}
//                 onBlur={handleBlur}
//                 error={touched.dueDate && Boolean(errors.dueDate)}
//                 helperText={touched.dueDate && errors.dueDate}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 select
//                 label="Completed"
//                 name="completed"
//                 value={values.completed ? 'true' : 'false'}
//                 onChange={(e) => setFieldValue('completed', e.target.value === 'true')}
//                 onBlur={handleBlur}
//                 margin="normal"
//               >
//                 <MenuItem value="false">False</MenuItem>
//                 <MenuItem value="true">True</MenuItem>
//               </TextField>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose}>Cancel</Button>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Form>
//         )}
//       </Formik>
//     </Dialog>
//   );
// };

// export default TodoForm;


// // import React from 'react';
// // import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
// // import { Formik, Form, Field } from 'formik';
// // import * as Yup from 'yup';
// // import { useDispatch } from 'react-redux';
// // import { addTodo,updateTodo } from '../slices/todoSlice';

// // // Validation schema using Yup
// // const validationSchema = Yup.object().shape({
// //   title: Yup.string().required('Title is required'),
// //   description: Yup.string().required('Description is required'),
// //   priority: Yup.string().required('Priority is required'),
// //   dueDate: Yup.date().required('Due date is required').nullable().typeError('Invalid date format'),
// //   completed: Yup.boolean()
// // });

// // const TodoForm = ({ open, handleClose, todoToEdit, onSubmit }) => {
// //   const dispatch = useDispatch()
// //   const initialValues = {
// //     title: todoToEdit ? todoToEdit.title : '',
// //     description: todoToEdit ? todoToEdit.description : '',
// //     priority: todoToEdit ? todoToEdit.priority : '',
// //     dueDate: todoToEdit ? todoToEdit.dueDate : new Date().toISOString().split('T')[0], // Default to today's date
// //     completed: todoToEdit ? todoToEdit.completed : false,
// //   };
// //   return (
// //     <Dialog open={open} onClose={handleClose}>
// //       <DialogTitle>Create a New Todo</DialogTitle>
// //       <Formik
// //         initialValues={{
// //           title: '',
// //           description: '',
// //           priority: '',
// //           dueDate: new Date().toISOString().split('T')[0],
// //           completed: false,
// //         }}
// //         validationSchema={validationSchema}
// //         onSubmit={(values) => {
// //           if (todoToEdit) {
// //             dispatch(updateTodo(values));  // Update todo if editing
// //           } else {
// //             dispatch(addTodo({ ...values, id: Date.now() }));  // Add new todo
// //           }
// //           handleClose();
// //         }}
// //       >
// //         {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
// //           <Form>
// //             <DialogContent>
// //               <TextField
// //                 fullWidth
// //                 label="Title"
// //                 name="title"
// //                 value={values.title}
// //                 onChange={handleChange}
// //                 onBlur={handleBlur}
// //                 error={touched.title && Boolean(errors.title)}
// //                 helperText={touched.title && errors.title}
// //                 margin="normal"
// //               />
// //               <TextField
// //                 fullWidth
// //                 label="Description"
// //                 name="description"
// //                 value={values.description}
// //                 onChange={handleChange}
// //                 onBlur={handleBlur}
// //                 error={touched.description && Boolean(errors.description)}
// //                 helperText={touched.description && errors.description}
// //                 margin="normal"
// //               />
// //               <FormControl fullWidth margin="normal">
// //                 {/* <InputLabel>Priority</InputLabel> */}
// //                 <TextField
// //                   select
// //                   label="Priority"
// //                   name="priority"
// //                   value={values.priority}
// //                   onChange={handleChange}
// //                   onBlur={handleBlur}
// //                   error={touched.priority && Boolean(errors.priority)}
// //                 >
// //                   <MenuItem value="Low">Low</MenuItem>
// //                   <MenuItem value="Medium">Medium</MenuItem>
// //                   <MenuItem value="High">High</MenuItem>
// //                 </TextField>
// //               </FormControl>
// //               {touched.priority && errors.priority && (
// //                 <div style={{ color: 'red' }}>{errors.priority}</div>
// //               )}
// //               <TextField
// //                 fullWidth
// //                 label="Due Date"
// //                 type="date"
// //                 name="dueDate"
// //                 InputLabelProps={{ shrink: true }}
// //                 value={values.dueDate || ''}
// //                 onChange={(e) => setFieldValue('dueDate', e.target.value)}
// //                 onBlur={handleBlur}
// //                 error={touched.dueDate && Boolean(errors.dueDate)}
// //                 helperText={touched.dueDate && errors.dueDate}
// //                 margin="normal"
// //               />
// //               <TextField
// //                   fullWidth
// //                   select
// //                   label="Completed"
// //                   name="completed"
// //                   value={values.completed ? 'true' : 'false'}
// //                   onChange={(e) => setFieldValue('completed', e.target.value === 'true')}
// //                   onBlur={handleBlur}
// //                   margin="normal"
// //                 >
// //                   <MenuItem value="false">False</MenuItem>
// //                   <MenuItem value="true">True</MenuItem>
// //                 </TextField>
// //             </DialogContent>
// //             <DialogActions>
// //               <Button onClick={handleClose}>Cancel</Button>
// //               <Button type="submit" variant="contained" color="primary">
// //                 Submit
// //               </Button>
// //             </DialogActions>
// //           </Form>
// //         )}
// //       </Formik>
// //     </Dialog>
// //   );
// // };

// // export default TodoForm;


// // // import React, { useState } from 'react';
// // // //import AddTask from './AddTask';// Import the AddTask component
// // // import AddTaskDialog from './AddTaskDialog';
// // // import { Button } from '@mui/material';

// // // const AddTask = () => {
// // //   const [open, setOpen] = useState(false);

// // //   const handleOpen = () => {
// // //     setOpen(true);
// // //   };

// // //   const handleClose = () => {
// // //     setOpen(false);
// // //   };

// // //   const handleSave = (todo) => {
// // //     console.log('Task saved:', todo);
// // //     // Here you can handle saving the task to your database or state
// // //   };

// // //   return (
// // //     <div>
// // //       {/* Button to open the AddTask dialog */}
// // //       <Button variant="contained" color="primary" onClick={handleOpen}>
// // //         Add Task
// // //       </Button>

// // //       {/* AddTask Dialog */}
// // //       <AddTaskDialog open={open} handleClose={handleClose} handleSave={handleSave} />
// // //     </div>
// // //   );
// // // };

// // // export default AddTask;
