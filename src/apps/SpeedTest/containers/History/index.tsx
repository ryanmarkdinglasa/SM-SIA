import {SFC} from 'system/types';
import * as S from './Styles';

export const History: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <h1>History</h1>
            </S.Container>
        </>
    );
}