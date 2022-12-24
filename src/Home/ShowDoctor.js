import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const ShowDoctor = () => {
  const params = useParams();
  const [doctor, setDoctor] = React.useState([]);
  const [bookNow, setBookNow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [availability, setAvailability] = React.useState([{}]);
  const [morningSlots, setMorningSlots] = React.useState([]);
  const [noonSlots, setNoonSlots] = React.useState([]);
  const [eveSlots, setEveSlots] = React.useState([]);
  const [bookedSlots, setBookedSlot] = React.useState([]);

  React.useEffect(() => {
    const url = 'http://localhost:5000/api/users/' + params.id;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDoctor(json))
      .catch((error) => console.log(error));

    const getAvailability = async () => {
      const url = 'http://localhost:5000/api/availability?vetId=' + params.id;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setAvailability(json);
        })
        .catch((error) => console.log(error));
    };
    getAvailability();
  }, [params.id]);

  const showCalendar = () => {
    setBookNow(true);
  };

  const disableWeekends = (date) => {
    const day = date.$d.getDay();
    return availability.constantDaysOff.includes(day);
  };

  const showSlots = (date) => {
    setDate(date);
    const formattedDate = moment(date).format('YYYY-MM-DD');

    console.log(formattedDate);

    setMorningSlots([]);
    setNoonSlots([]);
    setEveSlots([]);

    const url = `http://localhost:5000/api/appointments?vetId=${params.id}&date=${formattedDate}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setBookedSlot(json))
      .catch((error) => console.log(error));

    const startTime = moment(availability.startTime, 'HH:mm');
    const endTime = moment(availability.endTime, 'HH:mm');
    const slots = [];
    while (startTime < endTime) {
      slots.push(startTime.format('HH:mm'));
      startTime.add('30', 'minutes');
    }

    slots.forEach((slot) => {
      if (moment(slot, 'HH:mm') <= moment('12:00', 'HH:mm')) {
        let disabled = false;
        if (
          bookedSlots.find((book) =>
            moment(book.bookedSlot, 'HH:mm').isSame(moment(slot, 'HH:mm'))
          )
        ) {
          disabled = true;
        }
        const json = {
          time: slot,
          disabled: disabled,
        };
        setMorningSlots((current) => [...current, json]);
      }

      if (
        moment(slot, 'HH:mm') >= moment('12:30', 'HH:mm') &&
        moment(slot, 'HH:mm') <= moment('16:00', 'HH:mm')
      ) {
        let disabled = false;
        if (
          bookedSlots.find((book) =>
            moment(book.bookedSlot, 'HH:mm').isSame(moment(slot, 'HH:mm'))
          )
        ) {
          disabled = true;
        }
        const json = {
          time: slot,
          disabled: disabled,
        };
        setNoonSlots((current) => [...current, json]);
      }

      if (moment(slot, 'HH:mm') >= moment('16:30', 'HH:mm')) {
        let disabled = false;
        if (
          bookedSlots.find((book) =>
            moment(book.bookedSlot, 'HH:mm').isSame(moment(slot, 'HH:mm'))
          )
        ) {
          disabled = true;
        }
        const json = {
          time: slot,
          disabled: disabled,
        };
        setEveSlots((current) => [...current, json]);
      }
    });
  };

  const datePickerStyle = {
    marginTop: '30px',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const btnStyle = {
    margin: '10px',
    width: '20%',
  };

  return (
    <>
      <Card>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia
                sx={{ height: 140 }}
                image={doctor.image}
                title={doctor.name}
              />
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.years_of_experience} years of experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.about}
                </Typography>
                <Typography variant="body2" color="#1976d2">
                  ₹ {doctor.consultation_fee} fee
                </Typography>
              </CardContent>
              {!bookNow && (
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={showCalendar}
                  >
                    Book Now
                  </Button>
                </CardActions>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
      {bookNow ? (
        <div style={datePickerStyle}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DatePicker
                views={['day']}
                minDate={new Date()}
                label="Select a date"
                value={date}
                onChange={(newdate) => showSlots(newdate)}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
                shouldDisableDate={disableWeekends}
              />
            </Stack>
          </LocalizationProvider>

          {morningSlots.length > 0 && (
            <>
              <p>Morning Slots:</p>
              {morningSlots.map((slots) => (
                <Button
                  variant="outlined"
                  key={slots.time}
                  style={btnStyle}
                  disabled={slots.disabled}
                >
                  {slots.time}
                </Button>
              ))}
            </>
          )}

          {noonSlots.length > 0 && (
            <>
              <p>Afternoon Slots:</p>
              {noonSlots.map((slots) => (
                <Button
                  variant="outlined"
                  key={slots.time}
                  style={btnStyle}
                  disabled={slots.disabled}
                >
                  {slots.time}
                </Button>
              ))}
            </>
          )}
          {eveSlots.length > 0 && (
            <>
              <p>Evening Slots:</p>
              {eveSlots.map((slots) => (
                <Button
                  variant="outlined"
                  key={slots.time}
                  style={btnStyle}
                  disabled={slots.disabled}
                >
                  {slots.time}
                </Button>
              ))}
            </>
          )}
        </div>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Services
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.services}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};
