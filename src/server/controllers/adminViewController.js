import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

let adminViewHtml;

if (process.env.JUST_API === 'true') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  adminViewHtml = readFileSync(
    path.join(__dirname, '../../../build/admin/browser/index.html'),
    `utf-8`,
  );
} else {
  adminViewHtml = readFileSync(
    path.join(__dirname, './admin/index.html'),
    `utf-8`,
  );
}

export const getAdminView = (req, res) => {
  console.log('getAdminView');
  res.status(200).send(adminViewHtml);
};
