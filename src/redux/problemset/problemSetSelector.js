import { createSelector } from 'reselect';

const problemSetData = (state) => state.problemset;

export const problemset = createSelector([problemSetData], (data) => {
    return data.questions;
});

export const isLoaded = createSelector([problemSetData], (data) => {
    return !!data.questions;
});