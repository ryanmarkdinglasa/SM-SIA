import { combineReducers } from "@reduxjs/toolkit";

import managerReducer from './manager';
import runsReducer from './runs';

const speedTestReducer = combineReducers({
    manager: managerReducer,
    runs: runsReducer
});

export default speedTestReducer;