import { SFC} from 'system/types';
import { CardHeader, CardBody, CardFooter } from '..';

import * as S from './Styles';

export const Content: SFC = ({className}) => {
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