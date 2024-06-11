import {SFC} from 'system/types';
import * as S from './Styles';

export const MainButton: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <h1>MainButton</h1>
            </S.Container>
        </>
    );
}