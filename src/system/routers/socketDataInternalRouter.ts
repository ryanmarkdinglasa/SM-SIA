import authenticateListener from '../listeners/authenticateListener';
import getPeersListener from '../listeners/getPeersListener';
import setPeersListener from '../listeners/setPeersListener';
import store from '../store';
import {deleteNetworkCorrelationId} from '../store/networkCorrelationIds';
import {AppDispatch, SocketDataInternal, SocketDataInternalMethod} from '../types';
import {displayErrorToast} from '../utils/toast';

const socketDataInternalRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  const {
    system: {networkCorrelationIds},
  } = store.getState();

  const networkDict = networkCorrelationIds[networkId];

  if (!networkDict) {
    displayErrorToast(`No network correlation IDs for ${networkId}`);
    return;
  }

  const {correlation_id} = socketData;
  const method = networkDict[correlation_id];

  if (!method) {
    displayErrorToast(`No method for ${networkId}.${correlation_id}`);
    return;
  }

  const listeners = {
    [SocketDataInternalMethod.authenticate]: authenticateListener,
    [SocketDataInternalMethod.get_peers]: getPeersListener,
    [SocketDataInternalMethod.set_peers]: setPeersListener,
  };

  dispatch(
    deleteNetworkCorrelationId({
      correlation_id,
      networkId,
    }),
  );

  const listener = listeners[method];
  listener(dispatch, networkId, socketData);
};

export default socketDataInternalRouter;
