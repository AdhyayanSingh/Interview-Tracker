import { createSelector } from 'reselect';

const questionData = (state) => state.question;

export const question = createSelector([questionData], (item) => item.question);

export const isLoadedQuestion = createSelector([questionData], (item) => !!item.question);

export const errorMessage = createSelector([questionData], (item) => item.error);