import { readFile } from 'fs/promises';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.css')) {
    const source = await readFile(new URL(url), 'utf-8');

    // Convert CSS into a JavaScript module exporting a string
    const code = `export default ${JSON.stringify(source)};`;

    return {
      format: 'module',
      source: code,
      shortCircuit: true,
    };
  }

  // Pass to the next loader for other file types
  return nextLoad(url, context);
}
