const React = require('react');
const { Routes, Route, Link } = require('react-router-dom');
// const {
//   StaticRouterProvider,
//   createStaticRouter,
// } = require('react-router-dom');
const { Profile } = require('./Profile');
function MainFeed() {
  return <div>MainFeed</div>;
}

function SecondaryFeed() {
  return <div>SecondaryFeed</div>;
}

// const router = createStaticRouter([
//   {
//     path: '/',
//     element: <MainFeed />,
//   },
// ]);

function Home() {
  // return <StaticRouterProvider router={router} />;
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

module.exports = Home;
