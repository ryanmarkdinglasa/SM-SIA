import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
//import { Top, ConnectionStatus, Timer, MainButton, History} from '.';

import * as S from './Styles';

export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>

                </S.Container>
            </AppWindow>
        </>
    );
}