import axios from 'axios';


export const sendQueryToDatabase =  async (query) => {
  try {
    const res = await axios.get(`/api/v1/searchVillages?query=${query}`);
return res.data
  } catch (error) {
   console.error('error getting results:', error)
   throw error;
  }
};

export const uploadCsvDataToServer = async (csvData) => {
  try {
    const res = await axios.post('/api/v1/uploadCsvData', csvData );
    // console.log('res:',res);
    return res;
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    throw error; // Rethrow the error to handle it in the caller function if needed
  }
};

export const getAllVillagesData = async (csvData) => {
  try {
    const res = await axios.get('/api/v1/getAllVilagesData');
    console.log('res:',res);
    return res.data;
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    throw error; 
  }
};


export const downloadCsvFile = async () => {
  try {
    const res = await axios.get('/api/v1/downloadCsvFile', {
      responseType: 'blob' // Specify response type as blob to handle binary data
    });

    // Create a blob object from the response data
    const blob = new Blob([res.data], { type: 'text/csv' });

    console.log('type of data: ', typeof blob)
    console.log('blob itself: ',blob)

    // Create a download link element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'villages.csv'; // Set the filename for the downloaded file
    document.body.appendChild(a);

    // Trigger the download by simulating a click on the link
    a.click();

    // Clean up by removing the temporary URL and link element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Log the response data if needed
    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.error('Error downloading CSV file:', error);
    throw error; 
  }
};

export const signUpUser = async (userData) => {
  try {
    const res = await axios.post('/api/v1/signup', userData);
    const { token } = res.data; 
    localStorage.setItem('token', token); 
    return res.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
};

export const signInUser = async (userData) => {
  try {
    const res = await axios.post('/api/v1/signin', userData);
    const { token } = res.data; 
    localStorage.setItem('token', token); 
    return res.data;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};


export const updateDetails = async (imageData) => {
  try {
    // Send the extracted data to the backend
    const res = await axios.post('/api/v1/updatedetails', imageData);
    console.log('Response from backend:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error;
  }
};

export const saveSettingsAdmin = async (formData) => {
  try {
    const token = localStorage.getItem('token');

    // Configure Axios to include the token in the request headers
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
      }
    };

    const res = await axios.post('/api/v1/savesettings', formData, axiosConfig);
    // console.log('Response with 200:', res.data);
        
    // Store the token in localStorage
    // localStorage.setItem('token', res.data.token);
    return res.data 
  } catch (error) {
    console.error('Error sending formSettings to the server side:', error);
    throw error;
  }
};
