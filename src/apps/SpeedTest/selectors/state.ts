import { RootState } from 'system/types';
import { Runs } from '../'

export const getActiveAccountNumber = (state: RootState): string | null => state.speedTest.manager.getActiveAccountNumber;
export const getActiveAccountNetworkId = (state: RootState): string | null => state.speedTest.manager.getActiveNetworkId;
export const getRuns = (state: RootState): Runs => state.speedTest.runs;