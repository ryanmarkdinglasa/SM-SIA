import { SFC} from 'system/types';
import { CardHeader, CardBody, CardFooter } from '../../components/Card';

import * as S from './Styles';

export const DBConfigContent: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <CardHeader />
                <CardBody />
                <CardFooter />
            </S.Container>
        </>
    );
}