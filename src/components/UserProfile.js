import { Box, Step, StepButton, Stepper } from '@mui/material';
import 'dayjs/locale/de';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAPI } from '../actions/users.actions';
import '../css/userProfile.css';
import { setStepper } from '../reducers/navigation.reducer';
import BasicDetails from './profile/BasicDetails';
import ClinicDetails from './profile/ClinicDetails';
import EducationalDetails from './profile/EducationalDetails';

export const UserProfile = ({ uid }) => {
  const dispatch = useDispatch();
  const { activeStep } = useSelector((state) => state.navStatus);
  const { userId, userData } = useSelector((state) => state.authStatus);
  const { role } = userData;
  const { data: uidData } = useQuery('getUserDetails', () => {
    if (uid === '') {
      return getUserAPI(userId);
    } else {
      return getUserAPI(uid);
    }
  });

  const getUserProfileData = (uid) => {
    if (uid === '') {
      return {
        0: <BasicDetails userId={userId} userData={userData} />,
        1: <EducationalDetails />,
        2: <ClinicDetails />,
      };
    } else {
      return {
        0: <BasicDetails userId={uid} userData={uidData} />,
        1: <EducationalDetails />,
        2: <ClinicDetails />,
      };
    }
  };

  return (
    <>
      {role === 'user' ? (
        <Box sx={{ width: '100%' }}>{getUserProfileData(uid)[0]}</Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            <Step>
              <StepButton
                color="inherit"
                onClick={() => dispatch(setStepper(0))}
              >
                Basic Details
              </StepButton>
            </Step>

            <Step>
              <StepButton
                color="inherit"
                onClick={() => dispatch(setStepper(1))}
              >
                Educational Details
              </StepButton>
            </Step>
            <Step>
              <StepButton
                color="inherit"
                onClick={() => dispatch(setStepper(2))}
              >
                Clinic Details
              </StepButton>
            </Step>
          </Stepper>
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 5 }}>
            {getUserProfileData(uid)[activeStep]}
          </Box>
        </Box>
      )}
    </>
  );
};
