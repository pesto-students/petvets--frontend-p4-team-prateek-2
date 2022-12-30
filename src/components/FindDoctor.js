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
    const url = 'http://localhost:4000/api/users?role=doctor';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDoctor(json))
      .catch((error) => console.log(error));
  }, []);

  const showDoctor = (id) => {
    console.log(id);
    navigate('/findDoctor/' + id);
  };

  return (
    <>
      {doctor.map((doc) => (
        <Card sx={{ maxWidth: 345 }} key="doc._id">
          <CardMedia
            sx={{ height: 140 }}
            image={doc.image}
            title={doc.firstName}
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
      ))}
    </>
  );
};
