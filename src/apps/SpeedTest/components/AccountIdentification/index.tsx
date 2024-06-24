import { SFC} from 'system/types';
import { Identification } from '../..';
import { useAccountDisplayImage, useAccountDisplayName } from 'system/hooks';
import { truncate } from 'system/utils/strings';

export interface AccountIdentificationProps{
    accountNumber: string;
};

export const AccountIdentification: SFC<AccountIdentificationProps> = ({accountNumber, className}) => {
    const displayName = useAccountDisplayName(accountNumber, 16);
    const displayImage = useAccountDisplayImage(accountNumber);
    
    return (
        <>
            <Identification className={className} bottomText={truncate(accountNumber, 32)} topText={displayName} displayImage={displayImage} />
        </>
    );
}