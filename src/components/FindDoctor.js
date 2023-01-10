import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api-client';

import { cities } from '../utils/cities';
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from '@mui/material';

import '../css/findDoctor.css';

export const FindDoctor = () => {
  const [doctor, setDoctor] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const navigate = useNavigate();

  const searchDoctor = async (e) => {
    if (e.code === 'Enter') {
      const doctors = await axiosClient.get(
        'es/results?doctor=' + e.target.value
      );
      setDoctor(doctors.data);
    }
  };

  const SearchCity = async (e) => {
    if (e.code === 'Enter') {
      const city = cities.filter((x) =>
        x.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCity(city);
    }
  };

  React.useEffect(() => {
    const getDoctor = async () => {
      const doctors = await axiosClient.get('api/users?role=doctor');
      setDoctor(doctors.data);
    };
    getDoctor();
  }, []);

  const showDoctor = (id) => {
    console.log(id);
    navigate('/findDoctor/' + id);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Autocomplete
            freeSolo
            autoComplete
            autoHighlight
            options={doctor.length ? doctor.map((doc) => doc.firstName) : []}
            onKeyDown={(e) => searchDoctor(e)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Find Doctor" />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            freeSolo
            autoComplete
            autoHighlight
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="City" />
            )}
            options={city.map((c) => c)}
            onKeyDown={(e) => SearchCity(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {doctor.length ? (
          doctor.map((doc) => (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }} key="doc._id" className="card">
                <CardMedia
                  sx={{ height: 140 }}
                  image={doc.image}
                  title={doc.firstName}
                  src=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doc.firstName} {doc.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.yearsOfExperience} years of experience
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.services}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => showDoctor(doc.userId)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="h6">
            No results found
          </Typography>
        )}
      </Grid>
    </>
  );
};
