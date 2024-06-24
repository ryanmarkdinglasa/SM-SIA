import {SFC} from 'system/types';
import * as S from './Styles';
import { mdiCircle } from '@mdi/js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useIsConnected } from 'apps/SpeedTest/hooks';
import { getActiveAccountNumber, getActiveNetworkId } from 'apps/SpeedTest/selectors';
import { ConnectionStatus as TConnectionStatus } from 'apps/SpeedTest/types';

export const ConnectionStatus: SFC = ({className}) => {
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const activeNetworkId = useSelector(getActiveNetworkId);
    const isConnected = useIsConnected();

    const connectionStatus = useMemo(():TConnectionStatus => {
        if (!activeAccountNumber || !activeNetworkId ) return TConnectionStatus.invalid;
        return isConnected? TConnectionStatus.connected : TConnectionStatus.disconnected;
    }, []);

    const renderText = () => {
        const text = {
            [TConnectionStatus.connected]:'Connected',
            [TConnectionStatus.disconnected]:'Diconnected',
            [TConnectionStatus.invalid]:'Invalid',
        };
        return text[connectionStatus]
    };
    return (
        <>
            <S.Container className={className}>
                <S.Icon path={ mdiCircle } size="15px" status= {connectionStatus} />
                <S.Text> { renderText() } </S.Text>
            </S.Container>
        </>
    );
}