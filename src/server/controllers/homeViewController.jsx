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
