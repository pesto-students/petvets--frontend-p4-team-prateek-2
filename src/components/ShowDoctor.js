import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api-client';
import { displayRazorpay } from './razorpay';
import '../css/showDoctor.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useSelector } from 'react-redux';

export const ShowDoctor = () => {
  const params = useParams();
  const [bookNow, setBookNow] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [morningSlots, setMorningSlots] = React.useState([]);
  const [noonSlots, setNoonSlots] = React.useState([]);
  const [eveSlots, setEveSlots] = React.useState([]);
  const [bookedSlots, setBookedSlot] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState();
  const [active, setActive] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: {
      value: '',
      error: false,
      errorMessage: 'Please enter a name',
    },
    petAge: {
      value: '',
      error: false,
      errorMessage: 'Please enter an age',
    },
    petName: {
      value: '',
      error: false,
      errorMessage: `Please enter your pet age`,
    },
    contact: {
      value: '',
      error: false,
      errorMessage: 'Please enter your contact no.',
    },
  });

  const { userData: doctor } = useSelector((state) => state.authStatus);

  const steps = ['Select Date & Time', 'Add Details', 'Booking Confirmation'];
  const [activeStep, setActiveStep] = React.useState(0);

  const showCalendar = () => {
    setBookNow(true);
  };

  const disableWeekends = (date) => {
    const day = date.$d.getDay();
    return doctor.constantDaysOff.includes(day);
  };

  const showSlots = async (date) => {
    const formattedDate = moment(date.$d).format('YYYY-MM-DD');
    setSelectedDate(moment(date.$d).format('LL'));

    setMorningSlots([]);
    setNoonSlots([]);
    setEveSlots([]);
    setBookedSlot([]);

    debugger;
    const bookedAppointments = await axiosClient.get(
      `api/appointments?vetId=${params.id}&date=${formattedDate}`
    );

    setBookedSlot(bookedAppointments?.data);
    console.log(bookedSlots);

    const startTime = moment(doctor.startTime, 'HH:mm');
    const endTime = moment(doctor.endTime, 'HH:mm');
    const slots = [];
    while (startTime < endTime) {
      slots.push(startTime.format('HH:mm'));
      startTime.add('30', 'minutes');
    }

    const findBookedSlot = (slot) => {
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
      return json;
    };

    slots.forEach((slot) => {
      if (moment(slot, 'HH:mm') <= moment('12:00', 'HH:mm')) {
        setMorningSlots((current) => [...current, findBookedSlot(slot)]);
      }

      if (
        moment(slot, 'HH:mm') >= moment('12:30', 'HH:mm') &&
        moment(slot, 'HH:mm') <= moment('16:00', 'HH:mm')
      ) {
        setNoonSlots((current) => [...current, findBookedSlot(slot)]);
      }

      if (moment(slot, 'HH:mm') >= moment('16:30', 'HH:mm')) {
        setEveSlots((current) => [...current, findBookedSlot(slot)]);
      }
    });
  };

  const selectSlot = (e) => {
    setActive(true);
    setSelectedSlot(e.target.textContent);
  };

  const slotButton = (slot) => (
    <>
      <Button
        variant="outlined"
        key={slot.time}
        className="btn"
        style={{
          backgroundColor:
            active && selectedSlot === slot.time ? '#1976d2' : 'white',
          color: active && selectedSlot === slot.time ? 'white' : '',
        }}
        disabled={slot.disabled}
        onClick={(e) => selectSlot(e)}
      >
        {slot.time}
      </Button>
    </>
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formData);
    let newFormValues = { ...formData };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formData[currentField].value;

      if (currentValue === '') {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormData(newFormValues);
  };

  return (
    <>
      <Card className="card">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia
                sx={{ height: 140 }}
                image={doctor.image}
                title={doctor.firstName}
              />
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.yearsOfExperience} years of experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.about}
                </Typography>
                <Typography variant="body2" color="#1976d2">
                  ₹ {doctor.consultationFee} fee
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
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} className="center-content">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <React.Fragment>
              <div className="center-content">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      views={['day']}
                      minDate={new Date()}
                      label="Select a date"
                      value={selectedDate}
                      onChange={(newDate) => showSlots(newDate)}
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
                    {morningSlots.map((slots) => slotButton(slots))}
                  </>
                )}

                {noonSlots.length > 0 && (
                  <>
                    <p>Afternoon Slots:</p>
                    {noonSlots.map((slots) => slotButton(slots))}
                  </>
                )}
                {eveSlots.length > 0 && (
                  <>
                    <p>Evening Slots:</p>
                    {eveSlots.map((slots) => slotButton(slots))}
                  </>
                )}
              </div>
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <Box
                className="center-content"
                sx={{
                  width: '50% !important',
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    helperText=" "
                    label="Name"
                    required
                    value={formData.name.value}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    helperText=" "
                    id="pet-name"
                    label="Pet's Name"
                    required
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    helperText=" "
                    id="pet-age"
                    label="Pet's Age"
                    required
                    value={formData.petAge.value}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    helperText=" "
                    id="contact"
                    label="Contact"
                    required
                    value={formData.contact.value}
                    onChange={handleChange}
                  />
                </form>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 2 && (
            <React.Fragment>
              <Box
                className="center-content"
                sx={{
                  alignItems: 'center',
                  '& > :not(style)': { m: 1 },
                }}
              >
                <Card sx={{ maxWidth: 800 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Appointment Booked for {selectedDate} at {selectedSlot}
                    </Typography>
                    <Typography variant="body2" color="#1976d2">
                      ₹ {doctor.consultationFee} fee
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </React.Fragment>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', ml: 20, mr: 20 }}>
            {activeStep !== 0 && (
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep < 2 && (
              <Button
                onClick={handleNext}
                disabled={activeStep === 0 && !selectedSlot}
                style={{
                  backgroundColor: selectedSlot ? '#1976d2' : 'grey',
                  color: 'white',
                }}
              >
                Next
              </Button>
            )}
            {activeStep === 2 && (
              <Button
                onClick={displayRazorpay}
                style={{
                  backgroundColor: selectedSlot ? '#1976d2' : 'grey',
                  color: 'white',
                }}
              >
                Proceed to Payment
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Card className="card">
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
