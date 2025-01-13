const React = require('react');
const { Routes, Route, Link } = require('react-router-dom');
const { default: MainFeed } = require('./MainFeed');
const { default: SinglePost } = require('./SinglePost');
const { default: Signin } = require('./Signin');
const { default: CreatePost } = require('./CreatePost');
const { default: Profile } = require('./Profile');
const { default: Users } = require('./Users');
const { default: Register } = require('./Register');
// const {
//   StaticRouterProvider,
//   createStaticRouter,
// } = require('react-router-dom');

// function MainFeed() {
//   return <div>MainFeed</div>;
// }

// function SecondaryFeed() {
//   return <div>SecondaryFeed</div>;
// }

// const router = createStaticRouter([
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
  // return <StaticRouterProvider router={router} />;
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

module.exports = Home;
