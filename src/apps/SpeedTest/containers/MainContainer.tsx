import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import { Top, ConnectionStatus, Timer, MainButton, History} from '.';

import * as S from './Styles';

export const SpeedTest: SFC<AppProps> = ({className, display}) => {
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <Top />
                    <ConnectionStatus />
                    <MainButton />
                    <Timer />
                    <History />
                </S.Container>
            </AppWindow>
        </>
    );
}