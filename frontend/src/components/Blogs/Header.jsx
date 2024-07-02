import  React, {useState} from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { fetchArticlesByTopic }  from '../../actions/articlesActions'
import Autocomplete from '@mui/material/Autocomplete';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';



function Header(props) {
  const { sections, title } = props;
  const dispatch = useDispatch();
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  
  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleSearch = (value) => {
    // Implement your search logic here
    console.log('Search for:', value);
    // You may dispatch an action to fetch search results
    // dispatch(fetchSearchResults(value));
    handleSearchClose();
  };



  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider'}}>
      <Button component="a" href='/checkOut'>

        Subscribe
        </Button>
        <Typography
          component="h2"
          variant="h5"
          align="center"
          noWrap
          sx={{
            flex: 1,
            color: 'primary.main',  // Primary color for "Safe"
            '& span': {
              color: 'black',  // Default black color for "Earth"
            },
          }}
        >
          <span>{title.split(' ')[0]}</span> {title.split(' ')[1]}
        </Typography>


        <IconButton onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>




        <Popover
          open={Boolean(searchAnchorEl)}
          anchorEl={searchAnchorEl}
          onClose={handleSearchClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              width: '300px', // Adjust the width as needed
            },
          }}
        >
          <Autocomplete
            freeSolo
            options={[]}
            renderInput={(params) => (
              <TextField {...params} label="Search" placeholder="e.g., React tutorials" margin="normal" variant="outlined" />
            )}
            onChange={(event, value) => handleSearch(value)}
          />
        </Popover>






        <Button component="a" href='/SignUp'>
         Sign Up
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
  {sections.map((section) => (
  <Button
    key={section.title}
    color="inherit"
    variant="text"
    sx={{ p: 1, flexShrink: 0 }}
    onClick={async () => {
      const result = await dispatch(fetchArticlesByTopic(section.title));
      // console.log(result);
    }}
  >
    {section.title}
  </Button>
))}

      </Toolbar>
    </React.Fragment>
  );
}


Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};


export default Header;