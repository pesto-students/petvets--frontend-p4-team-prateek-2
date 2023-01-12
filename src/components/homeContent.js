import React from 'react';
import axiosClient from '../api-client';
import { cities } from '../utils/cities';
import '../css/home.css';
import image from '../assets/images/docImage.jpeg';
import {
  Box,
  Container,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';

export const HomeContent = () => {
  const [doctor, setDoctor] = React.useState([]);
  const [city, setCity] = React.useState([]);

  const SearchCity = async (e) => {
    if (e.code === 'Enter') {
      const city = cities.filter((x) =>
        x.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCity(city);
    }
  };
  const searchDoctor = async (e) => {
    if (e.code === 'Enter') {
      const doctors = await axiosClient.get(
        'es/results?doctor=' + e.target.value
      );
      setDoctor(doctors.data);
    }
  };
  return (
    <>
      <div class="home-banner">
        <img src={image} alt="" class="banner-img" />
        <div class="banner__content">
          <h1 class="banner-text">Find the best</h1>
          <h1 class="banner-text">vet near by you</h1>
        </div>
      </div>
      <Card sx={{ display: 'flex' }} class="banner-card">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Autocomplete
                  class="input"
                  freeSolo
                  autoComplete
                  autoHighlight
                  options={
                    doctor.length ? doctor.map((doc) => doc.firstName) : []
                  }
                  onKeyDown={(e) => searchDoctor(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Find Doctor"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  class="input"
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
              <Grid item xs={2}>
                <Button size="small" variant="contained" class="search-btn">
                  Find Now
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};
