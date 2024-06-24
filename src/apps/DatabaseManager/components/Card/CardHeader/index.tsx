import {SFC} from 'system/types';
import * as S from './Styles';
import {mdiDatabase} from '@mdi/js';

export const CardHeader: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Icon path={mdiDatabase} size="40px"/>
                <S.CardTitle> Database Configuration</S.CardTitle>
            </S.Container>
        </>
    );
}