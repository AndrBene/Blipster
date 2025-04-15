import { renderToString } from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import AppLayout from '../../client/public-blog/views/AppLayout.jsx';
import { readFileSync } from 'fs';
import { StaticRouter } from 'react-router-dom';
import '../../client/public-blog/style/index.css';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

let homeViewHtml;

if (process.env.JUST_API === 'true') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  homeViewHtml = readFileSync(
    path.join(__dirname, '../../client/public-blog/views/index.html'),
    `utf-8`,
  );
} else {
  homeViewHtml = readFileSync(
    path.join(
      __dirname,
      '../src/client/public-blog/views/index.html',
    ),
    `utf-8`,
  );
}

export const getHomeView = (req, res) => {
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
