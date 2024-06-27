import store from '../store';
import {setNetworkAccountOnlineStatuses} from '../store/networkAccountOnlineStatuses';
import {AppDispatch, OnlineStatus, SocketDataStandard} from '../types';
import {displayErrorToast} from '../utils/toast';
import {
  trackOnlineStatusValidator,
  validateIsKnownAccount,
  validateIsNotSelfAccountNumber,
} from '../validators/trackOnlineStatusValidators';

const trackOnlineStatusListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {accounts, self},
      } = store.getState();

      const {account_number: accountNumber, is_online: isOnline} = await trackOnlineStatusValidator.validate(
        socketData,
      );
      validateIsKnownAccount(accountNumber, accounts);
      validateIsNotSelfAccountNumber(accountNumber, self);

      dispatch(
        setNetworkAccountOnlineStatuses({
          accountOnlineStatuses: {
            [accountNumber]: isOnline ? OnlineStatus.online : OnlineStatus.offline,
          },
          networkId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Error tracking online status');
    }
  })();
};

export default trackOnlineStatusListener;
