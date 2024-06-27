import trackOnlineStatusListener from '../listeners/trackOnlineStatusListener';
import updateAccountListener from '../listeners/updateAccountListener';
import blockRouter from '../routers/blockRouter';
import {AppDispatch, SocketDataStandard, SocketDataStandardType} from '../types';
import {displayErrorToast} from '../utils/toast';

const socketDataStandardRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  const {type} = socketData;

  const handlers = {
    [SocketDataStandardType.createBlock]: blockRouter,
    [SocketDataStandardType.trackOnlineStatus]: trackOnlineStatusListener,
    [SocketDataStandardType.updateAccount]: updateAccountListener,
  };

  const handler = handlers[type];

  if (!handler) {
    displayErrorToast(`${type} is an unknown type`);
    return;
  }

  handler(dispatch, networkId, socketData);
};

export default socketDataStandardRouter;
