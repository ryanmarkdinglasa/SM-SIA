import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import { Content } from './content';

import * as S from './Styles';

export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <Content/>
                </S.Container>
            </AppWindow>
        </>
    );
}