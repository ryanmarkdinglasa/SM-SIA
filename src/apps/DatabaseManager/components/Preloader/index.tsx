import { SFC} from '../../../../system/types';
import * as S from './Styles';
import './Styles.css';

export const Preloader: SFC = ({className}) => {
    return (
        <>  
            <S.Container className={className}>
                <S.Span className="loader"></S.Span>
            </S.Container>
        </>
    );
};