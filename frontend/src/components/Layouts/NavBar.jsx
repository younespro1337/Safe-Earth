import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  InputBase,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  ClickAwayListener,
  Paper as SuggestionsPaper,
  Snackbar,
  Alert as MuiAlert

} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, CloudUpload as Upload , CloudDownload as Download, }  from "@mui/icons-material";
import axios from 'axios';
import { sendQueryToDatabase, downloadCsvFile  } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSuggestion } from '../../actions/mapActions';

function NavBar() {
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [isHovered, setIsHovered ] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [openSuggestions, setOpenSuggestions ] = useState(false);
const bingMapsApiKey = process.env.BING_MAP_API_KEY;
    const anchorRef = useRef(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
    const dispatch = useDispatch();
  
  

    const fetchSuggestions = async (query) => {
      try {
        // Fetch suggestions from Bing Maps API
        const bingMapsResponse = await axios.get(
          `http://dev.virtualearth.net/REST/v1/Autosuggest`,
          {
            params: {
              query: query,
              key: bingMapsApiKey,
            },
          }
        );
        const bingMapsData = bingMapsResponse.data;
        // console.log('Bing Maps data:', bingMapsData);
    
        // Fetch suggestions from your database
        const databaseResponse = await sendQueryToDatabase(query);
        const databaseData = databaseResponse.data;
        // console.log('Database data:', databaseData);
    
        // Combine suggestions from both sources
        let combinedSuggestions = [];
        if (bingMapsData.resourceSets && bingMapsData.resourceSets[0].resources[0].value) {
          combinedSuggestions = [...bingMapsData.resourceSets[0].resources[0].value];
        }
        if (databaseData.length > 0) {
          combinedSuggestions = [...combinedSuggestions, ...databaseData];
        }
    
        // Update state based on combined suggestions
        if (combinedSuggestions.length > 0) {
          setSuggestions(combinedSuggestions);
          setOpenSuggestions(true);
        } else {
          setOpenSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setOpenSuggestions(false);
      }
    };
    
    
    
    useEffect(() => {
      if (query.trim() !== '') {
        fetchSuggestions();
      } else {
        setSuggestions([]);
        setOpenSuggestions(false);
      }
    }, [query]);
  


    const handleListItemClick = (suggestion) => {
      console.log('Clicked suggestion:', suggestion);
      dispatch(addSuggestion(suggestion)); 
    };
    
  
    
  const handleFilterClick = () => {
    console.log("Filter icon clicked");
    setIsFilterDialogOpen(true);
  }
  
  const handleOnmousEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
  }

  const  paperWidth = isHovered ? '60%' : '40%';

  const inputPlaceHolderStyle = {
    '::placeholder': {
      color: 'red',
      fontStyle: 'italic',
      top:'-5%'
    },
  };

  const handleDownloadCsv = async () => {
    try {
      await downloadCsvFile();
      setIsDownloadSuccess(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('🎉 CSV file downloaded successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error handling CSV file download:', error);
      setIsDownloadSuccess(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('😔 Error downloading CSV file');
      setSnackbarOpen(true);
    }
  };

  return (
    <>




    <AppBar position="static" sx={{ height: '40px', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">

          <Paper 
          component="form" 
          sx={{ 
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            ml: 2, 
            borderRadius: '50px', 
            width: paperWidth,
            height:'50px',
            position: 'absolute', 
            top:'5px',
            transition: 'width 0.3s ease-in-out',
          }}
          onMouseEnter={handleOnmousEnter}
          onMouseLeave={handleMouseLeave}
          >
            <IconButton sx={{ p: '5px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
  placeholder="Search for Village people and more......"
  fullWidth
  onChange={(event) => fetchSuggestions(event.target.value)}
  sx={{ textAlign: "center", paddingLeft: "10%", ...inputPlaceHolderStyle }}
  ref={anchorRef}
/>

          </Paper>
          
          <IconButton sx={{ p: '5px', left: '50%' }} aria-label="filter" onClick={handleFilterClick}>
            <FilterIcon sx={{color:"white", width:"50px"}} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>



      <Popper
        open={openSuggestions}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-start"
        style={{zIndex:999, maxHeight:'300px', overflow:'auto'}}
      > 
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpenSuggestions(false)}>
                <SuggestionsPaper>
                  <List>
                  {suggestions.map((suggestion, index) => (

                    suggestion && suggestion.name && (
                  <ListItem
                  key={index}
                  onClick={() => handleListItemClick(suggestion)}
                  sx={{
                    backgroundColor: suggestion._id ? '#f0f0f0' : 'inherit',
                    cursor: 'pointer',
                    marginBottom: '8px', 
                    padding: '8px 16px', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#e0e0e0', 
                    },
                  }}
                >
                  <ListItemText primary={suggestion.name} />
                </ListItem>
                    )
              ))}
                  </List>
                </SuggestionsPaper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>




<Dialog open={isFilterDialogOpen} onClose={handleCloseFilterDialog}>
<DialogTitle>Filter Options</DialogTitle>
<DialogContent>
  
<List>
  <ListItem button component={Link} to="/Settings">
    <ListItemIcon>
      <Upload color='primary' />
    </ListItemIcon>
    <ListItemText primary="Upload CSV or Follow Instructions for Data Entry" />
  </ListItem>
  <ListItem button onClick={handleDownloadCsv}>
    <ListItemIcon>
      <Download color='primary'/>
    </ListItemIcon>
    <ListItemText primary="Download Data Update as CSV From Database" />
  </ListItem>
</List>






</DialogContent>
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
</>





  );
}

export default NavBar;
