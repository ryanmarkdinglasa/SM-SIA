  /**
   * AUTHOR       : Mark Dinglasa
   * COMMENT/S    : APPLICATION CONFIGURATIONS
   * CHANGES      : N/A
   * LOG-DATE     : 2024-05-27 11:48PM
  */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
import routes from './routes'

  const app = express();

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

  // Routes
  app.use('/', routes);
  
  // Handle preflight requests
  app.options('/*', (_req: any, res: any) => {
    res.status(204).end();
  });



  export default app;