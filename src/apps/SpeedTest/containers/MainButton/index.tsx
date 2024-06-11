import {SFC} from 'system/types';
import * as S from './Styles';

export const MainButton: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                GO
            </S.Container>
        </>
    );
}