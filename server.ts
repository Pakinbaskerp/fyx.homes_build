import 'zone.js/node'; // Required for Angular SSR
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server';

// Express server
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index.html';

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Static files
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // Angular SSR handler
  server.get('*', async (req, res, next) => {
    try {
      const html = await renderApplication(bootstrap, {
        document: join(distFolder, indexHtml),
        url: req.originalUrl,
        platformProviders: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }], // FIXED!
      });

      res.send(html);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

// Start the server
function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
