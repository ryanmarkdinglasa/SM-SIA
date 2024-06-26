import {useCallback} from 'react';

import {GenericVoidFunction, IpcChannel} from '../../../shared/types';
import {getFailChannel, getSuccessChannel} from '../../../shared/utils/ipc';
import {useIpcEffect} from '../../hooks/ipc/utils';

function useReadIpc({
  channel,
  failCallback,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback?: GenericVoidFunction;
  successCallback?: GenericVoidFunction;
}) {
  useIpcEffect(getFailChannel(channel), failCallback);
  useIpcEffect(getSuccessChannel(channel), successCallback);

  return useCallback(() => window.electron.ipc.send(channel), [channel]);
}

export default useReadIpc;
