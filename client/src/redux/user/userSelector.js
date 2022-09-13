import { createSelector } from 'reselect';

const userSelector = (state) => state.user;

export const getUserSelector = createSelector([userSelector], (data) => data.user);
export const isLoaded = createSelector([userSelector], (data) => !!data);
export const getUserProblemset = createSelector([userSelector], (data) => data.user?.problemsets);