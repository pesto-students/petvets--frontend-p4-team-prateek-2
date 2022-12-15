import React from 'react';

import { Navbar } from '../MuiComponents/Navbar';
import { Sidebar } from '../MuiComponents/Sidebar';

export const Home = () => (
  <>
    <Navbar />
    <Sidebar />
    <div>You are logged in</div>
  </>
);
