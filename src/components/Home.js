import React from 'react';

import { Navbar } from '../muiComponents/Navbar';
import { Sidebar } from '../muiComponents/Sidebar';

export const Home = () => (
  <>
    <Navbar />
    <Sidebar />
    <div>You are logged in</div>
  </>
);
