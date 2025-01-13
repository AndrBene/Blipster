const { renderToString } = require('react-dom/server');
const React = require('react');
const path = require('path');
// const {
//   RouterProvider,
//   createBrowserRouter,
// } = require('react-router-dom');
// const Home = require(path.join(__dirname, '../views/Home.jsx'));
const Home = require('../views/Home.jsx');
const { readFileSync } = require('fs');
const { StaticRouter } = require('react-router-dom');

const homeViewHtml = readFileSync(
  path.join(__dirname, '../src/server/views/index.html'),
  // path.join(__dirname, '../views/index.html'),
  `utf-8`,
);

const jsBundle = readFileSync(
  path.join(__dirname, './jsBundle.js'),
  // path.join(__dirname, '../../../build/jsBundle.js'),
  `utf-8`,
);
// const {
//   StaticRouterProvider,
//   createStaticRouter,
//   createStaticHandler,
// } = require('react-router-dom');

// function MainFeed() {
//   return <div>MainFeed</div>;
// }

// const routes = [
//   {
//     path: '/',
//     element: <MainFeed />,
//     loader: () => {
//       console.log('loader');
//     },
//   },
// ];

exports.getHomeView = async (req, res, next) => {
  // let { query, dataRoutes } = createStaticHandler(routes);
  // // let fetchRequest = createFetchRequest(req);
  // // let context = await query(fetchRequest);
  // console.log('req:', req);
  // let context = await query(req);
  // console.log('context:', context);
  let context = {};

  // // If we got a redirect response, short circuit and let our Express server
  // // handle that directly
  // if (context instanceof Response) {
  //   throw context;
  // }

  // console.log('dataRoutes:', dataRoutes);
  // console.log('context:', context);
  // let router = createStaticRouter(dataRoutes, context);

  console.log('req.url:', req.url);
  const renderedReact = renderToString(
    // <React.StrictMode>
    //   <StaticRouterProvider router={router} context={context} />
    // </React.StrictMode>,
    <StaticRouter location={req.url} context={context}>
      <Home />
    </StaticRouter>,
  );
  const renderedHtml = homeViewHtml.replace(
    '%CONTENT%',
    renderedReact,
  );

  res.status(200).send(renderedHtml);
};

exports.getJsBundle = (req, res, next) => {
  res
    .status(200)
    .set('Content-Type', 'application/javascript')
    .end(jsBundle);
};
