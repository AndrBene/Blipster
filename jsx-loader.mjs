import { readFile } from 'fs/promises';
import * as babel from '@babel/core';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.jsx')) {
    const source = await readFile(new URL(url), 'utf-8');
    const { code } = babel.transformSync(source);
    return { format: 'module', source: code, shortCircuit: true };
  }

  return nextLoad(url, context);
}
