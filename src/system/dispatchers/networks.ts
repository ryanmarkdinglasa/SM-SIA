import {_deleteBalance, _initializeBalance} from '../store/balances';
import {_deleteNetwork} from '../store/networks';
import {_deleteSocketStatus, _initializeSocketStatus} from '../store/socketStatuses';
import {AppDispatch} from '../types';

export const deleteNetwork = (networkId: string) => async (dispatch: AppDispatch) => {
  dispatch(_deleteNetwork(networkId));
  dispatch(_deleteBalance(networkId));
  dispatch(_deleteSocketStatus(networkId));
};

export const initializeNetworkRelatedObjects = (networkId: string) => async (dispatch: AppDispatch) => {
  dispatch(_initializeBalance(networkId));
  dispatch(_initializeSocketStatus(networkId));
};
