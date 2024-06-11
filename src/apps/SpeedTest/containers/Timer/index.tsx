import {SFC} from 'system/types';

import * as S from './Styles';

export const Timer: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <h1>Timer</h1>
            </S.Container>
        </>
    );
}
