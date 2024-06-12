import {SFC} from 'system/types';
import * as S from './Styles';
import { ReactNode } from 'react'

export interface TopCardProps {
    heading: string;
    children: ReactNode;
};

export const TopCard: SFC<TopCardProps> = ({children, className, heading}) => {
  
    return (
        <>
            <S.Container className={className}>
                <S.Heading> { heading } </S.Heading>
                <S.Content>
                    { children }
                </S.Content>
            </S.Container>
        </>
    );
}