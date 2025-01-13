import React from 'react';
// import {
//   RouterProvider,
//   createBrowserRouter,
// } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './Profile';

function MainFeed() {
  return <div>MainFeed</div>;
}

function SecondaryFeed() {
  return <div>SecondaryFeed</div>;
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainFeed />,
//   },
// ]);

function Home() {
  // return <RouterProvider router={router} />;
  return (
    <div>
      Ma che cazz
      <Link to="/public-blog/s">SecondaryFeed</Link>
      <Routes>
        <Route path="/" element={<Profile />}></Route>
        <Route
          path="public-blog/s"
          element={<SecondaryFeed />}
        ></Route>
      </Routes>
    </div>
  );
}

export default Home;
