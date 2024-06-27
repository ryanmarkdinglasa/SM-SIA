import store from '../store';
import {setPeerRequestDetails} from '../store/peerRequestManager';
import {AppDispatch, PeerRequestMethod, SocketDataInternal, SocketDataInternalMethod} from '../types';
import {displayErrorToast} from '../utils/toast';
import {validateCorrelationIdMatchesLastRequestId} from '../validators/common';
import {setPeersValidator} from '../validators/setPeersValidators';

const setPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {peerRequestManager},
      } = store.getState();

      const {correlation_id} = await setPeersValidator.validate(socketData);
      validateCorrelationIdMatchesLastRequestId(
        correlation_id,
        networkId,
        peerRequestManager,
        PeerRequestMethod.setPeers,
      );

      dispatch(
        setPeerRequestDetails({
          networkId,
          peerRequestDetails: {
            lastResponseId: correlation_id,
          },
          peerRequestMethod: PeerRequestMethod.setPeers,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.set_peers} response received`);
    }
  })();
};

export default setPeersListener;
