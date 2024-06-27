import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {appReducers} from 'apps/registry';
import accountOnlineStatusesReducer from '../store/accountOnlineStatuses';
import accountsReducer from '../store/accounts';
import balancesReducer from '../store/balances';
import internalReducer from '../store/internal';
import managerReducer from '../store/manager';
import networkAccountOnlineStatusesReducer from '../store/networkAccountOnlineStatuses';
import networkBlocksReducer from '../store/networkBlocks';
import networkCorrelationIdsReducer from '../store/networkCorrelationIds';
import networksReducer from '../store/networks';
import notificationCountsReducer from '../store/notificationCounts';
import peerRequestManagerReducer from '../store/peerRequestManager';
import selfReducer from '../store/self';
import socketStatusesReducer from '../store/socketStatuses';

const systemReducer = combineReducers({
  accountOnlineStatuses: accountOnlineStatusesReducer,
  accounts: accountsReducer,
  balances: balancesReducer,
  internal: internalReducer,
  manager: managerReducer,
  networkAccountOnlineStatuses: networkAccountOnlineStatusesReducer,
  networkBlocks: networkBlocksReducer,
  networkCorrelationIds: networkCorrelationIdsReducer,
  networks: networksReducer,
  notificationCounts: notificationCountsReducer,
  peerRequestManager: peerRequestManagerReducer,
  self: selfReducer,
  socketStatuses: socketStatusesReducer,
});

const store = configureStore({
  reducer: {
    ...appReducers,
    system: systemReducer,
  },
});

export default store;
