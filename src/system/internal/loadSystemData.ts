import {LocalElectronStore} from '../../shared/types';
import {initialState as accountsInitialState, setAccounts} from '../store/accounts';
import {initializeBalances, initialState as balancesInitialState, setBalances} from '../store/balances';
import {
  SYSTEM_ACCOUNTS,
  SYSTEM_BALANCES,
  SYSTEM_MANAGER,
  SYSTEM_NETWORK_BLOCKS,
  SYSTEM_NETWORKS,
  SYSTEM_SELF,
  SYSTEM_SOCKET_STATUSES,
} from '../store/constants';
import {initialState as managerInitialState, setManager} from '../store/manager';
import {initialState as networkBlocksInitialState, setNetworkBlocks} from '../store/networkBlocks';
import {initialState as networksInitialState, setNetworks} from '../store/networks';
import {initialState as selfInitialState, setSelf} from '../store/self';
import {
  initializeSocketStatuses,
  initialState as socketStatusesInitialState,
  setSocketStatuses,
} from '../store/socketStatuses';
import {AppDispatch, Self} from '../types';

const loadSystemData = (dispatch: AppDispatch, store: LocalElectronStore): Self => {
  // System data
  const accounts = store?.[SYSTEM_ACCOUNTS] || accountsInitialState;
  const balances = store?.[SYSTEM_BALANCES] || balancesInitialState;
  const manager = store?.[SYSTEM_MANAGER] || managerInitialState;
  const networkBlocks = store?.[SYSTEM_NETWORK_BLOCKS] || networkBlocksInitialState;
  const networks = store?.[SYSTEM_NETWORKS] || networksInitialState;
  const self = store?.[SYSTEM_SELF] || selfInitialState;
  const socketStatuses = store?.[SYSTEM_SOCKET_STATUSES] || socketStatusesInitialState;
  dispatch(setAccounts(accounts));
  dispatch(setBalances(balances));
  dispatch(setManager(manager));
  dispatch(setNetworkBlocks(networkBlocks));
  dispatch(setNetworks(networks));
  dispatch(setSelf(self));
  dispatch(setSocketStatuses(socketStatuses));

  // System initialization
  dispatch(initializeBalances());
  dispatch(initializeSocketStatuses());

  return self;
};

export default loadSystemData;
