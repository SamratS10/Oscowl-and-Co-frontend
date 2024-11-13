import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slices/authSlice'; // Adjust import according to your file structure
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        navigate('/login'); // Redirect to login page if registration is successful
      })
      .catch((err) => {
        console.error('Registration failed:', err); // Handle error if registration fails
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Black background
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff', // White background for the form
          padding: 4,
          borderRadius: 2,
          boxShadow: 3, // Add shadow
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Register
        </Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: '10px', fontWeight: 'bold' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" sx={{ textAlign: 'center' }}>
                      {error.message || error}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterForm;

// import React, { useState } from 'react';
// import { TextField, Button, Grid, Box, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../slices/authSlice'; // Adjust import according to your file structure
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// // Validation schema using Yup
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// const RegisterForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Use navigate hook
//   const { isLoading, error } = useSelector((state) => state.auth);

//   const handleSubmit = (values) => {
//     dispatch(registerUser(values))
//       .unwrap()
//       .then(() => {
//         // Redirect to login page if registration is successful
//         navigate('/login');
//       })
//       .catch((err) => {
//         // Handle error if registration fails
//         console.error('Registration failed:', err);
//       });
//   };

//   return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Grid container spacing={2} sx={{ maxWidth: 400 }}>
//         <Grid item xs={12}>
//           <Typography variant="h4">Register</Typography>
//         </Grid>
//         <Formik
//           initialValues={{ name: '', email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, handleChange, handleBlur, errors, touched }) => (
//             <Form>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   name="name"
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.name && Boolean(errors.name)}
//                   helperText={touched.name && errors.name}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   name="email"
//                   label="Email"
//                   variant="outlined"
//                   fullWidth
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.email && Boolean(errors.email)}
//                   helperText={touched.email && errors.email}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   name="password"
//                   label="Password"
//                   variant="outlined"
//                   type="password"
//                   fullWidth
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.password && Boolean(errors.password)}
//                   helperText={touched.password && errors.password}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Registering...' : 'Register'}
//                 </Button>
//               </Grid>
//               {error && (
//                 <Grid item xs={12}>
//                   <Typography color="error">{error.message || error}</Typography>
//                 </Grid>
//               )}
//             </Form>
//           )}
//         </Formik>
//       </Grid>
//     </Box>
//   );
// };

// export default RegisterForm;
