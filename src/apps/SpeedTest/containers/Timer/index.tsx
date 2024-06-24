import {SFC} from 'system/types';

import * as S from './Styles';

export const Timer: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.TopText>12.5957</S.TopText>
                <S.BottomText>seconds</S.BottomText>
            </S.Container>
        </>
    );
}
