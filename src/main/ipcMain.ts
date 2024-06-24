import {dialog, ipcMain, OpenDialogOptions, SaveDialogOptions} from 'electron';
import fs from 'fs';

import {IpcChannel, LocalElectronStore, SetStoreValuePayload} from '../shared/types';
import {getFailChannel, getSuccessChannel} from '../shared/utils/ipc';
import MainWindow from './MainWindow';
import Store from './Store';

//import { DatabaseConnection, Connection } from './functions/connection';
//import { ConnectionPool } from 'mssql';

ipcMain.on(IpcChannel.clearStore, (event) => {
  try {
    Store.clear();
    event.reply(getSuccessChannel(IpcChannel.clearStore));
  } catch (error: any) {
    console.log('Failed to clear store', error);
    event.reply(getFailChannel(IpcChannel.clearStore), error.toString());
  }
});

ipcMain.on(IpcChannel.exportStoreData, async (event) => {
  const options: SaveDialogOptions = {
    buttonLabel: 'Export',
    defaultPath: 'store-data.json',
    filters: [
      {extensions: ['json'], name: 'json'},
      {extensions: ['*'], name: 'All Files'},
    ],
    title: 'Export Store Data',
  };

  try {
    const {canceled, filePath} = await dialog.showSaveDialog(options);
    if (canceled || !filePath) return;
    const data = JSON.stringify(Store.getStore());
    fs.writeFileSync(filePath, data);
    event.reply(getSuccessChannel(IpcChannel.exportStoreData));
  } catch (error: any) {
    console.log(`Failed to save file: ${IpcChannel.exportStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.exportStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.importStoreData, async (event) => {
  const options: OpenDialogOptions = {
    buttonLabel: 'Import',
    filters: [
      {extensions: ['json'], name: 'json'},
      {extensions: ['*'], name: 'All Files'},
    ],
    title: 'Import Store Data',
  };

  try {
    const {canceled, filePaths} = await dialog.showOpenDialog(options);
    if (canceled || !filePaths.length) return;
    const filePath = filePaths[0];

    fs.readFile(filePath, 'utf-8', (err, jsonData) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(jsonData);

      if (data.__internal__) {
        delete data.__internal__;
      }

      Store.clear();
      Store.setStore(data);

      event.reply(getSuccessChannel(IpcChannel.importStoreData), data);
    });
  } catch (error: any) {
    console.log(`Failed to read file: ${IpcChannel.importStoreData}`, error);
    event.reply(getFailChannel(IpcChannel.importStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.loadStoreData, (event) => {
  try {
    const state = Store.getStore();
    event.reply(getSuccessChannel(IpcChannel.loadStoreData), state);
  } catch (error: any) {
    console.log(`Failed to load store`, error);
    event.reply(getFailChannel(IpcChannel.loadStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.restartApp, (event) => {
  try {
    console.log('Trying to restart app');
    MainWindow.getWebContents()?.reloadIgnoringCache();
    setTimeout(() => {
      event.reply(getSuccessChannel(IpcChannel.restartApp));
    }, 1000);
  } catch (error: any) {
    console.log('Failed to restart app', error);
    setTimeout(() => {
      event.reply(getFailChannel(IpcChannel.restartApp), error.toString());
    }, 1000);
  }
});

ipcMain.on(IpcChannel.setStoreValue, (event, {key, state}: SetStoreValuePayload<keyof LocalElectronStore>) => {
  try {
    Store.set(key, state);
    event.reply(getSuccessChannel(IpcChannel.setStoreValue));
  } catch (error: any) {
    console.log(`Failed to set Store of key ${key}`, error);
    event.reply(getFailChannel(IpcChannel.setStoreValue), error.toString());
  }
});

/*
ipcMain.on(IpcChannel.databaseConnect, async (event, {key}: SetStoreValuePayload<keyof LocalElectronStore>) => {
  try {
    let pool: ConnectionPool | null = null;
    let isConnected = false;
    const config = Store.get(key);
    const connectionResult: DatabaseConnection = await Connection(config);
    pool = connectionResult.pool;
    isConnected = connectionResult.isConnected;
    if (!isConnected) { 
        console.log(`DatabaseError: Database is not connected`);
        event.reply(getFailChannel(IpcChannel.databaseConnect), `DatabaseError: Database is not connected`.toString());
    }
    event.reply(getSuccessChannel(IpcChannel.databaseConnect));
  } catch (error: any) {
    console.log(`Failed to set Store of key ${key}`, error);
    event.reply(getFailChannel(IpcChannel.databaseConnect), error.toString());
  }
});*/