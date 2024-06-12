import {AppDispatch, SFC} from 'system/types';
import { SelectCard, getActiveAccountNumber, Identification } from '../..';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveAccountNumber } from 'apps/SpeedTest/store/manager';
import { useAccountDisplayImage, useAccountDisplayName } from 'system/hooks';
import { truncate } from 'system/utils/strings';

export interface AccountSelectCardProps{
    accountNumber: string;
};

export const AccountSelectCard: SFC<AccountSelectCardProps> = ({accountNumber, className}) => {
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const dispatch = useDispatch<AppDispatch>();
    const displayImage = useAccountDisplayImage(accountNumber);
    const displayName = useAccountDisplayName(accountNumber, 16);

    const handleClick = () => {
        const payload = accountNumber === activeAccountNumber ? null : accountNumber;
        dispatch(setActiveAccountNumber(payload));
    }

    return (
        <>
            <SelectCard className={ className } isSelected={ accountNumber === activeAccountNumber } onClick={ handleClick }>
                <Identification bottomText={truncate(accountNumber, 32)} topText={displayName} displayImage={displayImage} />
            </SelectCard>
        </>
    );
}