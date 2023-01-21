import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      alignItems: 'center',
    }}
  >
    <BounceLoader color="#36d7b7" />
  </div>
);

export default Loader;
