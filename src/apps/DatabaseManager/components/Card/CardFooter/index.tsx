import {SFC} from 'system/types';
import * as S from './Styles';

export const CardFooter: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                Card Footer
            </S.Container>
        </>
    );
}