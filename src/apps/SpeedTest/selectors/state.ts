import { RootState } from 'system/types';
import { Runs } from '../'

export const getActiveAccountNumber = (state: RootState): string | null => state.speedTest.manager.activeAccountNumber;
export const getActiveNetworkId = (state: RootState): string | null => state.speedTest.manager.activeNetworkId;
export const getRuns = (state: RootState): Runs => state.speedTest.runs;