import { SFC} from 'system/types';
import * as S from './Styles';

export const Dashboard: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                Dashboard
            </S.Container>
        </>
    );
}