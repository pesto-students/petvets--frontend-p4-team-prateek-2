import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Copyright = (props) => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    {...props}
    style={{ background: '#42a5f5', color: 'white' }}
  >
    {'Copyright © '},
    <Link color="inherit" href="https://mui.com/">
      PetVet
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
