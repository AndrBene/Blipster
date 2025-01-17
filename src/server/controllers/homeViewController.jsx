import { renderToString } from 'react-dom/server';
// import React from 'react';
import path from 'path';
// const Home = require(path.join(__dirname, '../views/Home.jsx'));
import AppLayout from '../../views/public-blog/AppLayout.jsx';
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import '../../style/index.css';

const homeViewHtml = readFileSync(
  path.join(__dirname, '../src/views/public-blog/index.html'),
  `utf-8`,
);

const jsBundle = readFileSync(
  path.join(__dirname, './jsBundle.js'),
  `utf-8`,
);

const jsBundleCss = readFileSync(
  path.join(__dirname, './jsBundle.css'),
  `utf-8`,
);

export const getHomeView = (req, res, next) => {
  const renderedReact = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <AppLayout />
    </StaticRouter>,
  );
  const renderedHtml = homeViewHtml.replace(
    '%CONTENT%',
    renderedReact,
  );

  res.status(200).send(renderedHtml);
};

export const getJsBundle = (req, res, next) => {
  res
    .status(200)
    .set('Content-Type', 'application/javascript')
    .end(jsBundle);
};

export const getJsBundleCss = (req, res, next) => {
  res.status(200).set('Content-Type', 'text/css').end(jsBundleCss);
};
