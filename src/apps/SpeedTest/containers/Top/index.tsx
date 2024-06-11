import {SFC} from 'system/types';
import { TopCard } from '../..'
import * as S from './Styles';

export const Top: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <TopCard />
                <TopCard />
            </S.Container>
        </>
    );
}