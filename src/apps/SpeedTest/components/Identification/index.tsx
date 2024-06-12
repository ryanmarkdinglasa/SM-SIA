import {SFC} from 'system/types';
import * as S from './Styles';

export interface IdentificationProps {
    topText: string;
    bottomText: string;
    displayImage: string;
}

export const Identification: SFC<IdentificationProps> = ({className, topText, bottomText, displayImage}) => {
    return (
        <>
            <S.Container className={className}>
               <S.Img src={ displayImage } alt="image"/>
                <S.Text>
                    <S.TopText> { topText } </S.TopText>
                    <S.BottomText> { bottomText } </S.BottomText>
                </S.Text>
            </S.Container>
        </>
    );
}