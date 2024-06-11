import {SFC} from 'system/types';
import * as S from './Styles';
import { SpaceItems } from '../';

export const TopCard: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Heading> {'Network'} </S.Heading>
                <S.Content>
                    <SpaceItems />
                </S.Content>
            </S.Container>
        </>
    );
}