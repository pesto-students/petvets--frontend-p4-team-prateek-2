import { Box, Step, StepButton, Stepper } from '@mui/material';
import 'dayjs/locale/de';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/userProfile.css';
import { setStepper } from '../reducers/navigation.reducer';
import BasicDetails from './profile/BasicDetails';
import ClinicDetails from './profile/ClinicDetails';
import EducationalDetails from './profile/EducationalDetails';

export const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state) => state.navStatus);
  const profileComponents = {
    0: <BasicDetails />,
    1: <EducationalDetails />,
    2: <ClinicDetails />,
  };

  console.log(userId);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        <Step>
          <StepButton color="inherit" onClick={() => dispatch(setStepper(0))}>
            Basic Details
          </StepButton>
        </Step>
        <Step>
          <StepButton color="inherit" onClick={() => dispatch(setStepper(1))}>
            Educational Details
          </StepButton>
        </Step>
        <Step>
          <StepButton color="inherit" onClick={() => dispatch(setStepper(2))}>
            Clinic Details
          </StepButton>
        </Step>
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 5 }}>
        {profileComponents[activeStep]}
      </Box>
    </Box>
  );
};
