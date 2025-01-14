import React from 'react';
import Profile from './components/Profile';
import MainFeed from './components/MainFeed';
import { Routes, Route, Link } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Link to="/s">MainFeed</Link>
      <Routes>
        <Route path="/" element={<Profile />}></Route>
        <Route path="s" element={<MainFeed />}></Route>
      </Routes>
    </div>
  );
}

export default AppLayout;
