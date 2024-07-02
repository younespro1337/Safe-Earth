import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUpUser } from '../../actions/userAction'
import { useFormik } from 'formik';
import { signUpSchema } from './validationShemas';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/younes-Raymond/Safe-Earth/">
        SafEarth
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignUp() {
  const [alert, setAlert] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const navigate = useNavigate();

  // Inside the SignUp component...

const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    receiveUpdates: false,
  },
  validationSchema: signUpSchema,
  onSubmit: async (values) => {
    try {
      const res = await signUpUser(values);
      // console.log(res);
      // Show success message
      setAlert('Signup successful!');
      setAlertSeverity('success');
      navigate('/settings');
    } catch (error) {
      console.error('Error signing up user:', error);
      // Show alert for duplicate email address
      setAlert('Email address is already in use.');
      setAlertSeverity('error');
    }
  },
});




 
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
     <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid item xs={12}>
  <FormControlLabel
    control={<Checkbox 
      name="receiveUpdates" 
      color="primary" 
      checked={formik.getFieldProps('receiveUpdates').value}
      onChange={formik.handleChange} 
    />}
    label="I want to receive inspiration, marketing promotions and updates via email."
  />
</Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {alert && (
  <Alert severity={alertSeverity} sx={{ mt: 2 }} onClose={() => setAlert(null)}>
    {alert}
  </Alert>
)}

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}