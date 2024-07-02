import * as Yup from 'yup';

// Define validation schema for sign-in
export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


// Define validation schema for sign-up
export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


// Define validation schema for settings
export const settingsSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  associationNumber: Yup.string().required('Association number is required'),
  selectedCountry: Yup.string().required('Country is required'),
  selectedState: Yup.string().required('State is required'),
  selectedCity: Yup.string().required('City is required'),
});

