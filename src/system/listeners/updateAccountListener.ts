import store from '../store';
import {setBalance} from '../store/balances';
import {AppDispatch, SocketDataStandard} from '../types';
import {displayErrorToast} from '../utils/toast';
import {validateIsSelfAccountNumber} from '../validators/common';
import {updateAccountValidator} from '../validators/updateAccountValidators';

const updateAccountListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      const {message} = await updateAccountValidator.validate(socketData);
      validateIsSelfAccountNumber(message.account_number, self);

      dispatch(setBalance({balance: message.balance, networkId}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating account data');
    }
  })();
};

export default updateAccountListener;
