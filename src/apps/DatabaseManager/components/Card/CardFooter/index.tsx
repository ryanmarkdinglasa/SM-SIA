import {SFC} from '../../../../../system/types';
import * as S from './Styles';

export const CardFooter: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Span> 2024 @ Cebu Innosoft Solution Services Inc.</S.Span>
                <S.Span> Innosoft SIA v1.0</S.Span>
            </S.Container>
        </>
    );
}