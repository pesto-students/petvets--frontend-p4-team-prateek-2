import { Edit } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useFormik, Formik, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
// import styles from '../css/user-profile.module.css';
import '../css/userProfile.css';
import { degrees, states, weeks } from '../utilities/constants';

const steps = ['Basic Details', 'Educational Details', 'Service Details'];

const ServiceDetails = () => {
  const validationSchema = Yup.object({});
  const [editMode, setEditMode] = useState(true);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      zipcode: '',
      city: '',
      state: '',
      gender: '',
      mobile: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 5 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <IconButton onClick={() => setEditMode(!editMode)}>
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          {editMode ? (
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="clinicName"
              name="clinicName"
              label="Clinic Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          ) : (
            <span>First Name: {formik.values.firstName}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {editMode ? (
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="address1"
              name="address1"
              label="Street/Colony Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          ) : (
            <span>Last Name: {formik.values.lastName}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {editMode ? (
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="address2"
              name="address2"
              label="Area Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          ) : (
            <span>Last Name: {formik.values.lastName}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {editMode ? (
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="city"
              name="city"
              label="City"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          ) : (
            <span>Last Name: {formik.values.lastName}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={states}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {editMode ? (
            <TextField
              autoComplete="given-name"
              required
              fullWidth
              id="zipcode"
              name="zipcode"
              label="Zipcode"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          ) : (
            <span>Last Name: {formik.values.lastName}</span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={weeks}
            multiple={true}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Days Off" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const UserProfile = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const StepperSteps = {
    1: <BasicDetails />,
    2: <EducationalDetails />,
    3: <ServiceDetails />,
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {StepperSteps[activeStep + 1]}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: 'inline-block' }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};
