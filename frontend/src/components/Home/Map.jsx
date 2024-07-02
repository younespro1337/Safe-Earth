// Map.js
import React from 'react';
import { MapContainer, TileLayer , Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L, { latLngBounds } from 'leaflet';
import markerIcon from  './markerIcon.png'
import { Typography, Button , Paper , Box, IconButton, CircularProgress} from '@mui/material';
import MoreInfoIcon from '@mui/icons-material/Info';
import DonateIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getAllVillagesData , updateDetails} from '../../actions/userAction'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from 'react-redux'; 
import { OpenCycleMap } from '../../utils/MapLooksLike';

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map() {
    const [selectedPublicId, setSelectedPublicId] = React.useState(null);
    const [villagesData, setVillagesData] = React.useState([]);
    const [loading, setLoading ] = React.useState(false);
    const [mapCenter, setMapCenter] = React.useState([31.07317457220632, -8.406957080277902]);
    const [mapZoom, setMapZoom] = React.useState(9.5);
    const mapState = useSelector(state => state.map);
    const [selectedVillageId, setSelectedVillageId] = React.useState(null);
    console.log('redux store updates:',mapState)
    
      const customIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 25], // adjust the size as needed
        iconAnchor: [16, 32], // half of the size to center the icon on the marker's position
        popupAnchor: [0, -32], // position the popup above the marker
      });

      
      React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllVillagesData();
                setVillagesData(data);
            } catch (error) {
                console.error('Error fetching village data:', error);
            }
        };
    
        fetchData(); 
    }, []);
    

    React.useEffect(() => {
      setMapCenter(null)
      setMapZoom(null)
      if (mapState.addSuggestion && mapState.addSuggestion.position) {
        const { lat, lon } = mapState.addSuggestion.position;
        setMapCenter([lon, lat]);
        setMapZoom(8);
      }
    }, [mapState.addSuggestion]);


 React.useEffect(() => {
  if (mapState.addSuggestion && mapState.addSuggestion._id ) {
     setSelectedVillageId(mapState.addSuggestion._id)
     console.log('yeah here we go...')
  } else {
    setSelectedVillageId(null)
    console.log('nothing here im else...')
  }
 }, [mapState.addSuggestion])


const handleMoreInfoClick = (id) => {
        console.log("hansssadleMoreInfoClick");
        alert(`hello this is id : ${id}`)      
};


const handleImageClick = (publicId) => {
  setSelectedPublicId(publicId); 
  const fileInput = document.getElementById('fileInput');
  fileInput.click();
};



const uploadFileToCloudinary = async (file, documentId) => {
  setLoading(true);
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'qw4k1xjq');

  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dktkavyr3/image/upload', formData);
    console.log('Cloudinary upload response:', res.data);
    const updatedData = await updateDetails(res.data, documentId);
    setVillagesData(updatedData.villages);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    // Handle error as needed
  } finally {
    setLoading(false);
  }
};



const handleFileChange = (event, documentId) => {
  const files = event.target.files;
  console.log(files);

  // Take only the first selected file
  const selectedFile = files[0];

  if (selectedFile) {
    // Upload the single selected file to Cloudinary
    uploadFileToCloudinary(selectedFile, documentId);
  }
}



return (
  
  <MapContainer
    center={mapCenter}
    zoom={mapZoom}
    style={{ height: '700px', width: '100%' }}
  >
    <ChangeView center={mapCenter || [31.07317457220632, -8.406957080277902]} zoom={mapZoom || 8} />
    <TileLayer
      url={OpenCycleMap.Transport}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    />
    {villagesData.map((details, index) => (
      <Marker
        key={details._id}
        position={[details.position.lon, details.position.lat]} // lon is first and lat seconde always remember this 
        icon={customIcon} 
      >
 <Popup>
 <Paper style={{ width: '100%', padding: '10px', maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
   <Box
     display="flex"
     flexDirection="column"
     alignItems="center"
     position='relative'
     cursor="pointer"
   >
     add images!
     <IconButton color="primary"  
       onClick={() => handleImageClick(details?.publicId)} 
       disabled={loading}
     >
       <AddPhotoAlternateIcon />
     </IconButton> 
     {loading && <CircularProgress />}
     <input
       id="fileInput"
       type="file"
       accept=".jpg,.jpeg,.png"
       style={{ display: 'none' }}
       // multiple
       onChange={(event) => handleFileChange(event, details._id)}
     />
     <Box
       key={details._id}
       sx={{
         border: '1px solid #ccc',
         borderRadius: '5px',
         padding: '10px',
         marginBottom: '20px',
         width:'100%',
         boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
       }}
     >
       <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', width: '80%', height: 'auto', whiteSpace: 'nowrap' }}>
         <LocationOnIcon sx={{ marginRight: '5px' }} color="primary" /> {details.name}
       </Typography>
       
       <Typography variant="body1" sx={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
         <MonetizationOnIcon sx={{ marginRight: '5px' }} color="primary" />
         {details.donate}
       </Typography>


<Box key={details._id}>
{details.moreImages && details.moreImages.length > 0 ? (
<Box >
<Box
 sx={{
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
 }}
>
{details.moreImages && details.moreImages.length > 0 ? (
<Box
sx={{
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'center',
 alignItems: 'center',
 padding: '20px'
}}
>

{details.moreImages.map((image, index) => (
 // Check if the image object exists and has a valid URL
 image && image.url ? (
   <React.Fragment key={index}>
     <img
       src={image.url}
       alt={`${index + 1}`}
       style={{ maxWidth: '90%', borderRadius: '5px', marginBottom: '10px' }}
     />
   </React.Fragment>
 ) : (
   <img
     key={index}
     src='https://res.cloudinary.com/dktkavyr3/image/upload/v1707411973/w3fug2ahr96x9jcesrwp.jpg' // Default image URL
     alt={`Default ${index + 1}`}
     style={{ maxWidth: '90%', borderRadius: '5px', marginBottom: '10px' }}
   />
 )
))}
</Box>
) : (
<img
src='https://res.cloudinary.com/dktkavyr3/image/upload/v1707411973/w3fug2ahr96x9jcesrwp.jpg' // Default image URL
alt='Default Village'
style={{ maxWidth: '100%', borderRadius: '5px' }}
/>
)}

</Box>
</Box>
) : (
<img
src='https://res.cloudinary.com/dktkavyr3/image/upload/v1707411973/w3fug2ahr96x9jcesrwp.jpg' // Default image URL
alt='Default Village'
style={{ maxWidth: '100%', borderRadius: '5px' }}
/>
)}

</Box>


       <Box
         sx={{
           display: 'flex',
           justifyContent: 'space-between',
           marginTop: '10px',
           alignItems: 'center',
           flexDirection:'coulmn',
           width:'100%',
         }}
       >
         <Button
           variant="contained"
           color="primary"
           startIcon={<MoreInfoIcon />}  
           onClick={() => handleMoreInfoClick(details._id)}
         >
           More Info
         </Button>
         <Link to='CheckOut'>
           <Button
             variant="contained"
             color="secondary"
             startIcon={<DonateIcon />}
           >
             Donate
           </Button>
         </Link>
       </Box>
     </Box>
   </Box>
 </Paper>
</Popup>


      </Marker>
    ))}
  </MapContainer>
);




}

export default Map;
