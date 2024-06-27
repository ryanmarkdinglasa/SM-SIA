import {fetchAccount} from '../core/accounts';
import store from '../store';
import {setBalance} from '../store/balances';
import {setSocketStatus} from '../store/socketStatuses';
import {AppDispatch, SocketDataInternal, SocketDataInternalMethod, SocketStatus} from '../types';
import {displayErrorToast} from '../utils/toast';
import {authenticateValidator} from '../validators/authenticateValidators';

const authenticateListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      await authenticateValidator.validate(socketData);
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.authenticated}));

      try {
        const {balance} = await fetchAccount(self.accountNumber, networkId);
        dispatch(setBalance({balance, networkId}));
      } catch (error) {
        dispatch(setBalance({balance: 0, networkId}));
      }
    } catch (error) {
      console.error(error);
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.error}));
      displayErrorToast(`Invalid ${SocketDataInternalMethod.authenticate} response received`);
    }
  })();
};

export default authenticateListener;
