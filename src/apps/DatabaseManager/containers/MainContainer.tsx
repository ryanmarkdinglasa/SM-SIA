import AppWindow from '../../../system/components/AppWindow';
import {AppProps, SFC} from '../../../system/types';

import { useWindowRender } from '../hooks';
import * as S from './Styles';
import { Renderer } from './Renderer';

export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    useWindowRender();
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <Renderer />
                </S.Container>
            </AppWindow>
        </>
    );
}