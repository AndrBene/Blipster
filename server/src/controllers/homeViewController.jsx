const { renderToString } = require('react-dom/server');
const React = require('react');
const path = require('path');
const App = require(path.join(__dirname, '../views/App.jsx'));
// const App = require(
//   path.join(__dirname, '../../../client/public-blog/src/App.jsx'),
// );
const { readFileSync } = require('fs');

const homeViewHtml = readFileSync(
  path.join(__dirname, '../views/index.html'),
  `utf-8`,
);

exports.getHomeView = (req, res, next) => {
  const renderedReact = renderToString(<App />);
  const renderedHtml = homeViewHtml.replace(
    '%CONTENT%',
    renderedReact,
  );

  res.status(200).send(renderedHtml);
};
