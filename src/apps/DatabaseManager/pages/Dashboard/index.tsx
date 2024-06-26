import { SFC} from 'system/types';
import * as S from './Styles';

//import { Preloader } from '../../components'
export const Dashboard: SFC = ({className}) => {

    return (
        <>
            <S.Container className={className}>
              
                Dashboard
            </S.Container>
        </>
    );
}