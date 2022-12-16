import React from 'react';
import { BounceLoader } from 'react-spinners';

const Loader = () => (
  <div style={{ display: 'flex', placeItems: 'center' }}>
    <BounceLoader color="#36d7b7" />
  </div>
);

export default Loader;
