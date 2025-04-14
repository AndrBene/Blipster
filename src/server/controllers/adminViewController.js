import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import '../../style/index.css';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

let adminViewHtml;

if (process.env.JUST_API === 'true') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log('***HERE');
  adminViewHtml = readFileSync(
    // path.join(__dirname, '../../views/admin/index.html'),
    path.join(__dirname, '../../../build/admin/index.html'),
    `utf-8`,
  );
} else {
  adminViewHtml = readFileSync(
    // path.join(__dirname, '../src/views/admin/index.html'),
    path.join(__dirname, './admin/index.html'),
    `utf-8`,
  );
}

export const getAdminView = (req, res) => {
  console.log('getAdminView');
  res.status(200).send(adminViewHtml);
};
