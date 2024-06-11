import {SFC} from 'system/types';
import * as S from './Styles';

export const Identification: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
               <S.Img src="https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/446944190_988103256000178_8828364043859648520_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_aid=0&_nc_ohc=Pu4IPD5D7WAQ7kNvgHTj2ru&_nc_ht=scontent.fmnl4-2.fna&oh=00_AYC17EVM0npxW6clWBGa3LHZ0r-fYYJ9PPtd89WlTGImWA&oe=666DC9F2" alt="image"/>
                <S.Text>
                    <S.TopText> { 'Mark Dinglasa' } </S.TopText>
                    <S.BottomText> { 'ryanmark.dinglasa' } </S.BottomText>
                </S.Text>
            </S.Container>
        </>
    );
}