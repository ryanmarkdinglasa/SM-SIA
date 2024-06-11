import {SFC} from 'system/types';
import * as S from './Styles';
import { mdiCircle } from '@mdi/js';

export const ConnectionStatus: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Icon path={mdiCircle} size="15px" />
                <S.Text> Connected </S.Text>
            </S.Container>
        </>
    );
}