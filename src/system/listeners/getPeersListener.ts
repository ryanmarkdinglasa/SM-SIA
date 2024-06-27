import store from '../store';
import {setNetworkAccountOnlineStatuses} from '../store/networkAccountOnlineStatuses';
import {setPeerRequestDetails} from '../store/peerRequestManager';
import {
  AccountOnlineStatuses,
  AppDispatch,
  Dict,
  OnlineStatus,
  PeerOnlineStatus,
  PeerRequestMethod,
  SocketDataInternal,
  SocketDataInternalMethod,
} from '../types';
import {displayErrorToast} from '../utils/toast';
import {validateCorrelationIdMatchesLastRequestId} from '../validators/common';
import {getPeersValidator} from '../validators/getPeersValidators';

const getAccountOnlineStatuses = (returnValue: Dict<PeerOnlineStatus>): AccountOnlineStatuses => {
  return Object.entries(returnValue).reduce((acc, [key, value]) => {
    return {...acc, [key]: value.is_online ? OnlineStatus.online : OnlineStatus.offline};
  }, {});
};

const getPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {peerRequestManager},
      } = store.getState();

      const {correlation_id, return_value} = await getPeersValidator.validate(socketData);
      validateCorrelationIdMatchesLastRequestId(
        correlation_id,
        networkId,
        peerRequestManager,
        PeerRequestMethod.getPeers,
      );

      dispatch(
        setPeerRequestDetails({
          networkId,
          peerRequestDetails: {
            lastResponseId: correlation_id,
          },
          peerRequestMethod: PeerRequestMethod.getPeers,
        }),
      );

      dispatch(
        setNetworkAccountOnlineStatuses({
          accountOnlineStatuses: getAccountOnlineStatuses(return_value),
          networkId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.get_peers} response received`);
    }
  })();
};

export default getPeersListener;
