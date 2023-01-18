import React from 'react';
import axiosClient from '../api-client';
import { cities } from '../utils/cities';
import '../css/home.css';
import image from '../assets/images/animal.jpg';
import cowImage from '../assets/images/cow-custom.svg';
import Blog from './Blog';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  TextField,
  Button,
  CardActionArea,
  Typography,
} from '@mui/material';

export const HomeContent = () => {
  const [doctor, setDoctor] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const navigate = useNavigate();
  const category = [
    {
      id: 1,
      name: 'dog',
      icon: <i className="fas fa-dog icon"></i>,
    },
    {
      id: 2,
      name: 'cat',
      icon: <i className="fas fa-cat icon"></i>,
    },
    {
      id: 3,
      name: 'bird',
      icon: <i className="fas fa-dove icon"></i>,
    },
    {
      id: 4,
      name: 'cattle',
      icon: (
        <img
          src={cowImage}
          className="icon"
          style={{ height: '100px' }}
          alt="cow"
        />
      ),
    },
  ];

  const findDoctor = (name) => {
    navigate('/findDoctor/?cat=' + name);
  };

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
      <div className="home-banner">
        <img src={image} alt="" className="banner-img" />
        <div className="banner__content">
          <h1 className="banner-text">Find the best</h1>
          <h1 className="banner-text">vet near by you</h1>
        </div>
      </div>
      <Card sx={{ display: 'flex' }} class="banner-card">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Autocomplete
                  className="input"
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
                  className="input"
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
                <Button size="small" variant="contained" className="search-btn">
                  Find Now
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          marginTop="5%"
        >
          {category.map((cat) => (
            <Grid item xs={12} sm={6} md={3} key={cat.id}>
              <Card
                sx={{ maxWidth: 245 }}
                className="card"
                style={{ backgroundColor: 'white' }}
                onClick={() => findDoctor(cat.name)}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      class="icon-pos"
                    >
                      {cat.icon}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Blog></Blog>
      </Card>
    </>
  );
};
