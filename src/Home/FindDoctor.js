import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const FindDoctor = () => {
  const [doctor, setDoctor] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const url = 'http://localhost:5000/api/users?role=Doctor';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDoctor(json))
      .catch((error) => console.log(error));
  }, []);

  const showDoctor = (id) => {
    navigate('/findDoctor/' + id);
  };

  return (
    <>
      {doctor.map((doc) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 140 }} image={doc.image} title={doc.name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {doc.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doc.years_of_experience} years of experience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doc.services}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => showDoctor(doc._id)}
            >
              Book Now
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
