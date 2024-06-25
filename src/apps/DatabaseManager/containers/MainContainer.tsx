import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import { Renderer } from '.';
import { useWindowRender } from '../hooks';
import * as S from './Styles';
import { Dashboard } from '../pages';
export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    useWindowRender();

    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <Dashboard />
                </S.Container>
            </AppWindow>
        </>
    );
}