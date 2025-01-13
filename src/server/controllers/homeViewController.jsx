const { renderToString } = require('react-dom/server');
const React = require('react');
const path = require('path');
// const Home = require(path.join(__dirname, '../views/Home.jsx'));
const Home = require('../views/Home.jsx');
const { readFileSync } = require('fs');

const homeViewHtml = readFileSync(
  path.join(__dirname, '../src/server/views/index.html'),
  `utf-8`,
);

const jsBundle = readFileSync(
  path.join(__dirname, './jsBundle.js'),
  `utf-8`,
);

exports.getHomeView = (req, res, next) => {
  const renderedReact = renderToString(<Home />);
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
