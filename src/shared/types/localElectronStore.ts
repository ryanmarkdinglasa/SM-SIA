import {
  SYSTEM_ACCOUNTS,
  SYSTEM_BALANCES,
  SYSTEM_MANAGER,
  SYSTEM_NETWORKS,
  SYSTEM_SELF,
} from '../../system/store/constants';
import {Accounts, Balances, Manager, Networks, Self} from '../../system/types';

// TODO: export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  [SYSTEM_ACCOUNTS]: Accounts;
  [SYSTEM_BALANCES]: Balances;
  [SYSTEM_MANAGER]: Manager;
  [SYSTEM_NETWORKS]: Networks;
  [SYSTEM_SELF]: Self;
}
