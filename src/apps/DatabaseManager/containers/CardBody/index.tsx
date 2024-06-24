import {SFC} from 'system/types';
import * as S from './Styles';
export const CardBody: SFC =  ({className}: any) => {
    
    return (
        <>
            <S.Container className={className}>
                Card Body
            </S.Container>
        </>
    );
}
