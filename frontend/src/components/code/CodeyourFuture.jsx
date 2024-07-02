import React from 'react';
import { Grid, Typography, Avatar, Button, Paper} from '@mui/material';
import Data from '../../data.js';
import { Link } from 'react-router-dom'


const CodeYourFutureMarianVolunteer = () => {
const [dataList , setDataList ] = React.useState(Data);
    return (
        <Grid container spacing={3}>
          {dataList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper style={{ padding: '20px', display: 'flex', alignItems: 'center' , flexDirection:'column'}}>
                <Avatar>{item.hiringManager?.name?.charAt(0)}</Avatar>
                <div style={{ marginLeft: '20px' }}>
                  <Typography variant="h6">{item.companyName}</Typography>
                  <Typography variant="subtitle1">{item.position}</Typography>
                  <Typography variant="body2">{item.jobDescriptionSummary}</Typography>
                  <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button component={Link} variant='contained' to={item.hiringManager?.profileLink}>{item.hiringManager?.name}</Button>
                    <Button component={Link} variant='contained' to={item.jobPostLink}>Job Post</Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
};

export default CodeYourFutureMarianVolunteer;
