import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  CardContent,
  DialogContent, 
  DialogActions,
  Snackbar,
  InputAdornment,
  TextField,
  FormHelperText,

} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { uploadCsvDataToServer , downloadCsvFile, saveSettingsAdmin } from '../../actions/userAction'
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';
import { Country, State, City }  from 'country-state-city';
import { settingsSchema  } from '../Auth/validationShemas';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import{ DarkModeSwitch } from './DarkModeSwitch'
import { OpenCycleMap } from '../../utils/MapLooksLike';



const leafletMapStyles = [
  { title: 'Cycle', value: 'Cycle' },
  { title: 'Transport', value: 'Transport' },
  { title: 'Landscape', value: 'Landscape' },
  { title: 'Outdoors', value: 'Outdoors' },
  { title: 'Transport Dark', value: 'Transport-dark' },
  { title: 'Spinal Map', value: 'Spinal-map' },
  { title: 'Pioneer', value: 'Pioneer' },
  { title: 'Mobile Atlas', value: 'Mobile-atlas' },
  { title: 'Neighbourhood', value: 'Neighbourhood' },
  { title: 'Atlas', value: 'Atlas' }
];

const languageOptions = [
  { title: 'English', firstLetter: 'E' },
  { title: 'French', firstLetter: 'F' },
  { title: 'Arabic', firstLetter: 'A' },
];



const SettingsPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [csvData, setCsvData] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading ,setLoading ] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName:'',
      email:'',
      associationNumber: '', 
      selectedCountry: '',
      selectedState: '',
      selectedCity: '',
      mapStyle:'Streets',
      selectedLanguage:''
    },
    validationSchema: settingsSchema,
    onSubmit: async (values) => {
      sendformIkToServer(values); 
    },
  });
  
  const sendformIkToServer = async (formIkData) => {
    try {
      const response = await saveSettingsAdmin(formIkData);
      setSnackbarSeverity('success');
      setSnackbarMessage(response.message); 
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating details:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('😔 Error saving settings. Please try again later.');
      setSnackbarOpen(true);
    }
  }
  
  

  React.useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = await Country.getAllCountries();
      setCountries(countriesData);
    };

    fetchCountries();
  }, []);


  const handleCountryChange = async (event, value) => {
    setSelectedCountry(value);
    formik.setFieldValue('selectedCountry', value); 
    formik.setFieldValue('selectedState', '');
    setStates([]);
    setCities([]);
    try {
      const statesData = await State.getStatesOfCountry(value);
      setStates(statesData);
      setSelectedState(''); 
    } catch (error) {
      console.error('Error fetching states:', error);
      
    }
  };
  

  const handleStateChange = (event, value) => {
    setSelectedState(value);
    formik.setFieldValue('selectedState', value);
    setCities([])
    const fetchCities = async () => {
      const citiesData = await City.getCitiesOfState(selectedCountry,value);
      setCities(citiesData);
    };

    fetchCities();
  };

 


  const handleFileUpload = async () => {
    setLoading(true);

    // Convert the CSV data to an array of lines
    const lines = csvData.split('\n');
 
    // Prepare the data for uploading to the server
    const dataToSend = lines.map((line) => {
        const [lat, lon, name] = line.split(',');

        // Check if the line has valid data (not empty and contains latitude, longitude, and name)
        if (lat.trim() !== '' && lon.trim() !== '' && name.trim() !== '') {
            return { lat: lat.trim(), lon: lon.trim(), name: name.trim() };
        } else {
            return null; // Return null for lines with missing or empty data
        }
    }).filter(item => item !== null); // Filter out null values (empty lines or lines with missing data)

    
    try {
      const res = await uploadCsvDataToServer(dataToSend);
      setSnackbarSeverity('success');
      setSnackbarMessage('🎉 Data saved successfully! 🎉 Your villages data is ready for download.');
      setSnackbarOpen(true);
      setCsvData('')
    } catch (error) {
      console.error('Error saving villages:', error);
      // Show error snackbar
      setSnackbarSeverity('error');
      setSnackbarMessage('😔 Internal Server Error', error); 
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
};


const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) { 
      const reader = new FileReader(); 
      reader.onload = (e) => {
        setCsvData(e.target.result);
      };
      reader.readAsText(file);
    }
  };


  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value); // Update formik state with the new value
  };
  


  return (
    <>
      <Box
        sx={{
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          width: '90%',
          m: 1,
          left: '10%',
          overflowY: 'auto',  
          maxHeight: 'calc(100vh - 120px)',
        }}
      >
        
        <Card
      sx={{
        p: 1,
        border: '1px solid #ddd',
        borderRadius: 8,
        width: '90%',
        m: '5%',
        color:'#fff',
        backgroundImage:'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center'
      }}
    >
         <Typography variant="h5" mb={3}>
          <AccountCircleIcon sx={{ m:1}} />
          Profile Settings
        </Typography>

      <CardContent>
        <FormGroup sx={{ mb: 3 }}>
          {/* Add more switches here */}
          <FormControlLabel
          control={<DarkModeSwitch checked={darkMode} onChange={handleDarkModeToggle} />}
          label="Dark Mode"
        />
        </FormGroup>
      </CardContent>
    </Card>
    
        

      <Box display="flex" flexDirection="column" mb={2}>

<Box mb={2} display="flex" alignItems="center" width='90%'>
  <MapIcon sx={{ mr: 2 }} />
  <Select
  label="Map Styles"
  labelId="map-style-label"
  id="map-style"
  name="mapStyle"
  value={formik.values.mapStyle}
  onChange={handleChange} 
  style={{ width: '100%' }}
>
  {leafletMapStyles.map((style) => (
    <MenuItem key={style.value} value={style.title}>
      {style.title}
    </MenuItem>
  ))}
</Select>

</Box>

    <Box mb={2} display="flex" alignItems="center" width='90%'>
  <LanguageIcon sx={{ mr: 2 }} />
  <FormControl sx={{ minWidth: 200 }}>
    <InputLabel id="language-label">Language</InputLabel>
    <Select
      label='Language'
      labelId="language-label"
      id="language"
      name="selectedLanguage"
      value={formik.values.selectedLanguage}
      onChange={formik.handleChange} 
    >
      {languageOptions.map((language) => (
        <MenuItem key={language.title} value={language.title}>
          {language.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>



<Box marginBottom={'5%'}>


  <FormControl sx={{ minWidth: 200, width: '90%' }}>
  <InputLabel id="country-label">Country</InputLabel>
    <Select
      label="Country"
      labelId="country-label"
      id="country"
      value={formik.values.selectedCountry}
      onChange={(e) => handleCountryChange(e, e.target.value)}
      error={formik.touched.selectedCountry && Boolean(formik.errors.selectedCountry)}
    >
      {countries.map((country) => (
        <MenuItem key={country.isoCode} value={country.isoCode}>
          {country.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedCountry && formik.errors.selectedCountry && (
      <FormHelperText error>{formik.errors.selectedCountry}</FormHelperText>
    )}
  </FormControl>

  <FormControl sx={{ minWidth: 200, width: '90%', marginTop: 2 }}>
    <InputLabel id="state-label">State</InputLabel>
    <Select
      label='State'
      labelId="state-label"
      id="state"
      value={formik.values.selectedState}
      onChange={(e) => handleStateChange(e, e.target.value)}
      disabled={!formik.values.selectedCountry}
      error={formik.touched.selectedState && Boolean(formik.errors.selectedState)}
    >
      {states.map((state) => (
        <MenuItem key={state.isoCode} value={state.isoCode}>
          {state.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedState && formik.errors.selectedState && (
      <FormHelperText error>{formik.errors.selectedState}</FormHelperText>
    )}
  </FormControl>

  <FormControl sx={{ minWidth: 200, width: '90%', marginTop: 2 }}>
    <InputLabel id="city-label">City</InputLabel>
    <Select
      label="City"
      labelId="city-label"
      id="city"
      value={formik.values.selectedCity}
      onChange={(e) => formik.setFieldValue('selectedCity', e.target.value)}
      disabled={!formik.values.selectedState}
      error={formik.touched.selectedCity && Boolean(formik.errors.selectedCity)}
    >
      {cities.map((city) => (
        <MenuItem key={city.name} value={city.name}>
          {city.name}
        </MenuItem>
      ))}
    </Select>
    {formik.touched.selectedCity && formik.errors.selectedCity && (
      <FormHelperText error>{formik.errors.selectedCity}</FormHelperText>
    )}
  </FormControl>
</Box>


<Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

<Box mb={2} display="flex"  alignItems='center' sx={{width:'90%'}} >
            <PersonIcon sx={{ mr: 2 }} />
            <TextField
  label="Full Name"
  name="fullName" 
  value={formik.values.fullName}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
  helperText={formik.touched.fullName && formik.errors.fullName}
  style={{ width: '100%' }}
/>
</Box>


<Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
  <TextField
    label="Association Number"
    name="associationNumber"
    value={formik.values.associationNumber}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.associationNumber && Boolean(formik.errors.associationNumber)}
    helperText={formik.touched.associationNumber && formik.errors.associationNumber}
    style={{ width: '100%' }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <BusinessIcon />
        </InputAdornment>
      ),
    }}
  />
</Box>



<Box mb={2} display="flex" alignItems="center" sx={{ width: '90%' }}>
<EmailIcon sx={{ mr: 2 }} />
<TextField
  type="email"
  label="Email"
  name="email" 
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.email && Boolean(formik.errors.email)}
  helperText={formik.touched.email && formik.errors.email}
  style={{ width: '100%' }}
/>
</Box>

        <Box mb={2} display="flex" alignItems="center" sx={{ width: '100%' }}>

        <TextField
          label="CSV Data"
          multiline
          rows={10}
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          fullWidth
          disabled={loading} //disable text enter when data loading to prevent error interval
        />
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple={false}
          type="file"
          onChange={handleFileSelect}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
<label htmlFor='contained-button-file'>
  <IconButton component="span">
    <CloudUploadIcon />
  </IconButton>
</label>

  <IconButton onClick={() => setOpenDialog(true)}>
    <HelpOutlineIcon />
  </IconButton>

  </Box>

  </Box>




      <Typography variant="body1">
        Example format:lat, lon, name, London Town etc.
      </Typography>






      <Box
  sx={{
    p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          width: '90%',
          m: 1,
          left: '10%',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-evenly'

  }}
>
  <Box >
  <Button variant="contained" disabled={loading} onClick={handleFileUpload} startIcon={loading ? <CircularProgress size={24}  /> : <CloudUploadIcon />}>
    Upload CSV File
  </Button>
  </Box>
  <Box sx={{ mr: 1 }}>
  <Button variant="contained" disabled={loading} onClick={downloadCsvFile} startIcon={loading ? <CircularProgress size={24}  /> : <CloudUploadIcon />}>
    Download Current  CSV Data
  </Button>
  </Box>
</Box>




      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>CSV Data Format</DialogTitle>
        <DialogContent>
  <Typography variant="body1">
    Please enter the CSV data in the following format:
    <br />
    <br />
    Latitude, Longitude, Name, Details if applicable
    <br />
    For example:
    <br />
    51.5074,-0.1278,London,Capital city of the United Kingdom
    <br />
    51.5074,-0.1278,Westminster,Administrative area in central London
  </Typography>
</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

    
      <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>

    </Box>

    <Button
  type="submit"
  variant="contained" 
  color='primary'
  onClick={formik.handleSubmit}
  // disabled={!formik.isValid } 
>
  Save
</Button>


        </Box>
     
     <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </>
  
     
  );
};

export default SettingsPage;
