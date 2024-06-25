import { SFC} from 'system/types';
import { LicenseCardHeader, LicenseCardBody, LicenseCardFooter } from '../../components/LicenseCard';

import * as S from './Styles';

export const LicenseContent: SFC = ({className}) => {
    return (
        <>
            <S.Container className={className}>
                <LicenseCardHeader />
                <LicenseCardBody />
                <LicenseCardFooter />
            </S.Container>
        </>
    );
}