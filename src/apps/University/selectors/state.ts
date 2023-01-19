import {Courses, Enrollments, Lectures, Page} from 'apps/University/types';
import {RootState} from 'system/types';

export const getActiveLearnCourseId = (state: RootState): string => state.university.manager.activeLearnCourseId;
export const getActiveLearnLectureId = (state: RootState): string => state.university.manager.activeLearnLectureId;
export const getActivePage = (state: RootState): Page => state.university.manager.activePage;
export const getActiveTeachCourseId = (state: RootState): string => state.university.manager.activeTeachCourseId;
export const getActiveTeachLectureId = (state: RootState): string => state.university.manager.activeTeachLectureId;
export const getCourses = (state: RootState): Courses => state.university.courses;
export const getEnrollments = (state: RootState): Enrollments => state.university.enrollments;
export const getLectures = (state: RootState): Lectures => state.university.lectures;