import {SFC} from 'system/types';
import { ReactNode } from 'react';
import * as S from './Styles';

export interface SpaceItemsProps {
    leftContent: ReactNode;
    rightContent: ReactNode;
}

export const SpaceItems: SFC<SpaceItemsProps> = ({className, leftContent, rightContent}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Left> {leftContent} </S.Left>
                <S.Right> {rightContent} </S.Right>
            </S.Container>
        </>
    );
}