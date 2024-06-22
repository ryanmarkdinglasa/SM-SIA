import { useMemo } from "react";
import { useSelector } from "react-redux";

import { getActiveAccountNumber, getActiveNetworkId } from "../selectors";
import { getNetworkAccountOnlineStatuses } from "system/selectors/state";
import { OnlineStatus } from "system/types";

export const useIsConnected = ():boolean => {
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const activeNetworkId = useSelector(getActiveNetworkId);

    const networkAccountOnlinStatuses = useSelector(getNetworkAccountOnlineStatuses);

    return useMemo( () => {
        if (!activeAccountNumber || !activeNetworkId) return false;
        return networkAccountOnlinStatuses[activeNetworkId]?.[activeAccountNumber] === OnlineStatus.online;
    }, [activeAccountNumber, activeNetworkId, networkAccountOnlinStatuses]);
};

