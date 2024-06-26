/* eslint global-require: off, no-console: off, @typescript-eslint/no-var-requires: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { globalShortcut } from 'electron';
import { app } from 'electron';
import { isDevelopment } from '../shared/utils/environment';
import MainWindow from './MainWindow';
import './ipcMain';
import appExpress from './express';
const port = 3500;

// Start the Express server
const startServer = () => {
  return new Promise<void>((resolve, reject) => {
    appExpress.listen(port, (error: any) => {
      if (error) {
        console.error('Failed to start server:', error);
        reject(error);
      } else {
        console.log(`Server is running on port ${port}`);
        resolve();
      }
    });
  });
};

// TODO: Create constants for NODE_ENV states
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (isDevelopment) {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  // Respect the OSX convention of having the application in memory even after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  startServer().then(() => {
    MainWindow.createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other
      // windows open
      if (!MainWindow.exists()) {
        MainWindow.createWindow();
      }
    });
  }).catch((error) => {
    console.error('Error starting server:', error);
  });
}).catch(console.error);
