import {SFC} from 'system/types';
import * as S from './Styles';

export const History: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Heading>History</S.Heading>
                <S.Table>
                    <thead>
                        <S.Th>Account</S.Th>
                        <S.Th>Network</S.Th>
                        <S.Th>Date</S.Th>
                        <S.Th>Speed</S.Th>
                    </thead>
                    <tbody>
                        <S.Tr>
                            <S.Td>Mark Dinglasa</S.Td>
                            <S.Td>192.168.1.00</S.Td>
                            <S.Td>2024/05/09</S.Td>
                            <S.Td>1.765s</S.Td>
                        </S.Tr>
                        <S.Tr>
                            <S.Td>Mark Dinglasa</S.Td>
                            <S.Td>192.168.1.00</S.Td>
                            <S.Td>2024/05/09</S.Td>
                            <S.Td>1.765s</S.Td>
                        </S.Tr>
                    </tbody>
                </S.Table>
            </S.Container>
        </>
    );
}