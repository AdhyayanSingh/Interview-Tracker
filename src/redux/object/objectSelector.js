import { createSelector } from 'reselect';

const objectData = (state) => state.object;

export const object = createSelector([objectData], (data) => {
    return data.object;
});

export const isLoading = createSelector([objectData], (data) => {
    return !!data.object;
});