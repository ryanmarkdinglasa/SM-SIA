/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : APPLICATION CONFIGURATIONS
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes'
import storage from 'node-persist';
import path from 'path';

// Get the absolute path to the 'storage' directory within your application folder
const storageDir = path.join(__dirname, 'storage');
const app:any = express();

//app.use(express.static(path.join(__dirname, "public", "images")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((_req: any, res: any, next:any) => {
  res.setHeader("Permissions-Policy", "autoplay=(*)");
  next();
});

// Use CORS middleware
app.use(cors({ 
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

//  NO CACHE, (optional)
app.use((_req:any, res: any, next: any) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

async function initializeStorage() {
  await storage.init({
    dir: storageDir,
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    ttl: false,
  });
  console.log('Node-persist initialized');
};

initializeStorage().catch(err => {
  console.error('Error initializing node-persist:', err);
});

// Routes
app.use('/', routes);


// Handle preflight requests
app.options('/*', (_req: any, res: any) => {
  res.status(204).end();
});


export default app;