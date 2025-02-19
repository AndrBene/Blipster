import { renderToString } from 'react-dom/server';
// import React from 'react';
import path from 'path';
import { fileURLToPath } from 'url';
// const Home = require(path.join(__dirname, '../views/Home.jsx'));
import AppLayout from '../../views/public-blog/AppLayout.jsx';
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import '../../style/index.css';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

let homeViewHtml;

if (process.env.JUST_API === 'true') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  homeViewHtml = readFileSync(
    path.join(__dirname, '../../views/public-blog/index.html'),
    `utf-8`,
  );
} else {
  homeViewHtml = readFileSync(
    path.join(__dirname, '../src/views/public-blog/index.html'),
    `utf-8`,
  );
}

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
