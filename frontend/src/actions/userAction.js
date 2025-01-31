import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const sendQueryToDatabase = async (query) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/searchVillages?query=${query}`);
    return res.data;
  } catch (error) {
    console.error('Error getting results:', error);
    throw error;
  }
};

export const uploadCsvDataToServer = async (csvData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/uploadCsvData`, csvData);
    return res;
  } catch (error) {
    console.error('Error uploading CSV data:', error);
    throw error;
  }
};

export const getAllVillagesData = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/getAllVillagesData`);
    return res.data;
  } catch (error) {
    console.error('Error getting villages data:', error);
    throw error;
  }
};

export const downloadCsvFile = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/v1/downloadCsvFile`, {
      responseType: 'blob'
    });

    const blob = new Blob([res.data], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'villages.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return res.data;
  } catch (error) {
    console.error('Error downloading CSV file:', error);
    throw error;
  }
};

export const signUpUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/v1/signup`, userData);
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
    const res = await axios.post(`${API_BASE_URL}/api/v1/signin`, userData);
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
    const res = await axios.post(`${API_BASE_URL}/api/v1/updatedetails`, imageData);
    return res.data;
  } catch (error) {
    console.error('Error sending data to backend:', error);
    throw error;
  }
};

export const saveSettingsAdmin = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.post(`${API_BASE_URL}/api/v1/savesettings`, formData, axiosConfig);
    return res.data;
  } catch (error) {
    console.error('Error sending form settings to the server:', error);
    throw error;
  }
};
