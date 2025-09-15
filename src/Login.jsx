// LoginPage.jsx
import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, TextField, Typography, Grid, Link, MenuItem
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserType }) => {
  const [users, setUsers] = useState([
    { fullName: "Admin User", email: "admin@test.com", username: "admin", password: "admin123", role: "admin" },
    { fullName: "Normal User", email: "user@test.com", username: "user", password: "user123", role: "user" }
  ]);

  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const initialLoginValues = { username: '', password: '' };
  const initialSignUpValues = { fullName: '', email: '', username: '', password: '', confirmPassword: '', role: 'user' };

  const loginValidationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const signUpValidationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (isSignUp) {
      const newUser = {
        fullName: values.fullName,
        email: values.email,
        username: values.username,
        password: values.password,
        role: values.role.toLowerCase(),
      };
      setUsers([...users, newUser]);
      alert("Account created successfully!");
    } else {
      const found = users.find(u => u.username === values.username && u.password === values.password);
      if (found) {
        alert("Login successful!");
        setUserType(found.role);
        if (found.role === "admin") navigate("/admin/dashboard");
        else navigate("/"); // normal user → back to home
      } else {
        alert("Invalid credentials!");
      }
    }
    resetForm();
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '90vh', padding: '30px' }}>
      <Grid item xs={11} sm={8} md={4}>
        <Card elevation={6} sx={{ width: '100%', maxWidth: 500, p: 2 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
              {isSignUp ? 'Create Account' : 'Login'}
            </Typography>

            <Formik
              initialValues={isSignUp ? initialSignUpValues : initialLoginValues}
              validationSchema={isSignUp ? signUpValidationSchema : loginValidationSchema}
              onSubmit={handleSubmit}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ errors }) => (
                <Form>
                  {isSignUp && (
                    <>
                      <Box mb={2}>
                        <Field as={TextField} label="Full Name" name="fullName" fullWidth error={Boolean(errors.fullName)} helperText={errors.fullName} />
                      </Box>
                      <Box mb={2}>
                        <Field as={TextField} label="Email" name="email" type="email" fullWidth error={Boolean(errors.email)} helperText={errors.email} />
                      </Box>
                      <Box mb={2}>
                        <Field as={TextField} select label="Role" name="role" fullWidth error={Boolean(errors.role)} helperText={errors.role}>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Field>
                      </Box>
                    </>
                  )}

                  <Box mb={2}>
                    <Field as={TextField} label="Username" name="username" fullWidth error={Boolean(errors.username)} helperText={errors.username} />
                  </Box>
                  <Box mb={2}>
                    <Field as={TextField} label="Password" name="password" type="password" fullWidth error={Boolean(errors.password)} helperText={errors.password} />
                  </Box>
                  {isSignUp && (
                    <Box mb={2}>
                      <Field as={TextField} label="Confirm Password" name="confirmPassword" type="password" fullWidth error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword} />
                    </Box>
                  )}

                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {isSignUp ? 'Sign Up' : 'Login'}
                  </Button>
                </Form>
              )}
            </Formik>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Link component="button" variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? 'Login' : 'Sign Up'}
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
