import {SFC} from 'system/types';
import * as S from './Styles';

export interface AccountModalProps {
    close(): void;

}

export const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
    return (
        <>
            <S.Modal className={className} close={close} header='Select Account'>
                Account cards here
            </S.Modal>
        </>
    );
}
