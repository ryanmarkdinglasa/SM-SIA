import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import { Renderer } from '.';

import * as S from './Styles';

export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <Renderer/>
                </S.Container>
            </AppWindow>
        </>
    );
}