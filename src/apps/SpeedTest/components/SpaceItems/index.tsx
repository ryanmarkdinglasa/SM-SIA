import {SFC} from 'system/types';
import * as S from './Styles';
import { Identification } from '../';
import { mdiPencil } from '@mdi/js';

export const SpaceItems: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Left>
                    <Identification/>
                </S.Left>
                <S.Right> <S.Icon path={mdiPencil} size="28px"/></S.Right>
            </S.Container>
        </>
    );
}