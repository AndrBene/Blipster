import React from 'react';
// import {
//   RouterProvider,
//   createBrowserRouter,
// } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';

import MainFeed from './MainFeed';
import Signin from './Signin';
import CreatePost from './CreatePost';
import Profile from './Profile';
import Users from './Users';
import SinglePost from './SinglePost';
import Register from './Register';

// function MainFeed() {
//   return <div>MainFeed</div>;
// }

// function SecondaryFeed() {
//   return <div>SecondaryFeed</div>;
// }

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainFeed />,
//   },
// ]);

function Header() {
  return <div>Header</div>;
}

function LeftColumn() {
  return <div>LeftColumn</div>;
}

function Home() {
  // return <RouterProvider router={router} />;
  return (
    <div>
      <Link to="/public-blog/SinglePost">to single post</Link>
      <Routes>
        <Route path="/" element={<MainFeed />} />
        <Route
          path="public-blog/SinglePost"
          element={<SinglePost />}
        />
        <Route path="public-blog/Signin" element={<Signin />} />
        <Route path="public-blog/Register" element={<Register />} />
        <Route
          path="public-blog/CreatePost"
          element={<CreatePost />}
        />
        <Route path="public-blog/Profile" element={<Profile />} />
        <Route path="public-blog/Users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default Home;
