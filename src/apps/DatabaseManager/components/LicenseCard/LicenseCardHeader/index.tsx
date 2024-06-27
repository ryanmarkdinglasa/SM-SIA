import {SFC} from '../../../../../system/types';
import * as S from './Styles';
import {mdiKey} from '@mdi/js';

export const LicenseCardHeader: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <S.Icon path={mdiKey} size="40px"/>
                <S.CardTitle> License Key</S.CardTitle>
            </S.Container>
        </>
    );
}