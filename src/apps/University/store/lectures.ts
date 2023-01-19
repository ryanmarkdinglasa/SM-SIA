import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_LECTURES} from 'apps/University/store/constants';
import {Lecture, Lectures} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Lectures = {};

const lectures = createSlice({
  initialState,
  name: UNIVERSITY_LECTURES,
  reducers: {
    setLecture: (state: Lectures, {payload: lecture}: PayloadAction<Lecture>) => {
      const {lectureId} = lecture;
      state[lectureId] = lecture;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    setLectureList: (state: Lectures, {payload}: PayloadAction<Lecture[]>) => {
      for (const lecture of payload) {
        const {lectureId} = lecture;
        state[lectureId] = lecture;
      }
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    setLectures: setLocalAndStateReducer<Lectures>(UNIVERSITY_LECTURES),
    unsetLecture: (state: Lectures, {payload: lectureId}: PayloadAction<string>) => {
      delete state[lectureId];
      const lectureList = Object.values(state);
      let position = 0;

      for (const lecture of lectureList) {
        state[lecture.lectureId].position = position;
        position += 1;
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    updateLecturePositions: (state: Lectures, {payload}: PayloadAction<{lectureId: string; position: number}[]>) => {
      for (const item of payload) state[item.lectureId].position = item.position;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
  },
});

export const {setLecture, setLectureList, setLectures, unsetLecture, updateLecturePositions} = lectures.actions;
export default lectures.reducer;