import {GenericFunction} from './generic';
import {LocalElectronStore} from './localElectronStore';

export interface IpcApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  send(channel: string, payload?: any): void;
  get(channel: string, payload?: any): any;
}

export enum IpcChannel {
  clearStore = 'clear-store',
  exportStoreData = 'export-store-data',
  importStoreData = 'import-store-data',
  loadStoreData = 'load-store-data',
  restartApp = 'restart-app',
  setStoreValue = 'set-store-value',
  databaseConnect = 'database-connect',
}

export type SetStoreValuePayload<K extends keyof LocalElectronStore> = {
  key: K;
  state: LocalElectronStore[K];
};
