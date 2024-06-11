import {SFC} from 'system/types';
import * as S from './Styles';

export const ConnectionStatus: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <h1>ConnectionStatus</h1>
            </S.Container>
        </>
    );
}