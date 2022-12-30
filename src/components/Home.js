import React from 'react';

import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Home = () => (
  <>
    <Navbar />
    <Sidebar />
    <div>You are logged in</div>
  </>
);
