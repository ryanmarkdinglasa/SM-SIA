import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import { CardHeader, CardBody, CardFooter } from '.';

import * as S from './Styles';

export const DatabaseManager: SFC<AppProps> = ({className, display}) => {
    return (
        <>
            <AppWindow className={className} display={display}>
                <S.Container>
                    <CardHeader/>
                    <CardBody/>
                    <CardFooter/>
                </S.Container>
            </AppWindow>
        </>
    );
}