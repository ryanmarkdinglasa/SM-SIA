import socketDataInternalRouter from '../routers/socketDataInternalRouter';
import socketDataStandardRouter from '../routers/socketDataStandardRouter';
import {AppDispatch, SocketData, SocketDataInternal, SocketDataStandard} from '../types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent, networkId: string) => {
  const socketData: SocketData = JSON.parse(event.data);

  if (socketData.hasOwnProperty('correlation_id')) {
    socketDataInternalRouter(dispatch, networkId, socketData as SocketDataInternal);
  } else {
    socketDataStandardRouter(dispatch, networkId, socketData as SocketDataStandard);
  }
};

export default rootRouter;
