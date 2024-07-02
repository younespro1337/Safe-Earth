import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemIcon
} from '@mui/material';
import Logo from './Logo.png'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Photo as PhotoIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveTvIcon,
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Assignment as BlogIcon,
  MonetizationOn as DonateIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Feedback as FeedbackIcon,
  Help as HelpIcon,
  PictureAsPdf as PdfIcon,
} from "@mui/icons-material";
import { Link, useLocation } from 'react-router-dom';
import { PersonAdd as PersonAddIcon, LockOpen as LockOpenIcon } from '@mui/icons-material';

function Menu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  return (
    
    <>

      {/* start menu items  */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <img src={Logo} alt="Logo" style={{ width: '100px', height: '100px' , margin:'10px'}} />

        <List>
          
        <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <HomeIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

 

          
<ListItem button component={Link} to="/blog">
  <ListItemIcon>
    <BlogIcon color='primary'/>
  </ListItemIcon>
  <ListItemText primary="Blog" />
</ListItem>



<ListItem button component={Link} to="/CheckOut" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <DonateIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Donate" />
        </ListItem>



        <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <PersonIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
          

        <ListItem button component={Link} to="/notifications" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <NotificationsIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>


        <ListItem button component={Link} to="/Settings" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <SettingsIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>


        <ListItem button component={Link} to="/help" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <HelpIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        <ListItem button component={Link} to="/learn-more" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <InfoIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Learn More" />
        </ListItem>


        <ListItem button component={Link} to="/feedback" onClick={toggleDrawer(false)}>
          <ListItemIcon>
            <FeedbackIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>

        <ListItem button component={Link} to="/PdfGenerator" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                    <PdfIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="PdfGenerator" />
            </ListItem>
            <ListItem button component={Link} to="/Mariana" onClick={toggleDrawer(false)}>
                <ListItemIcon>
                    {/* <PdfIcon color='primary' /> */}
                    Mariana
                </ListItemIcon>
                <ListItemText primary="Code Your Future" />
            </ListItem>

<ListItem>
            <Button component={Link} to="/SignUp" color="primary" startIcon={<PersonAddIcon />}>
              Signup
            </Button>
          </ListItem>

<ListItem>
  <Button component={Link} to="/SignIn" color="primary" startIcon={<LockOpenIcon />}>
    Signin
  </Button>
</ListItem>

        </List>
      </Drawer>

      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
    </>
  );
}



export default Menu;