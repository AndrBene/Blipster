import { renderToString } from 'react-dom/server';
import React from 'react';
import path from 'path';
// const Home = require(path.join(__dirname, '../views/Home.jsx'));
import Home from '../../views/Home.jsx';
import { readFileSync } from 'fs';

const homeViewHtml = readFileSync(
  path.join(__dirname, '../src/views/index.html'),
  `utf-8`,
);

const jsBundle = readFileSync(
  path.join(__dirname, './jsBundle.js'),
  `utf-8`,
);

export const getHomeView = (req, res, next) => {
  const renderedReact = renderToString(<Home />);
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
