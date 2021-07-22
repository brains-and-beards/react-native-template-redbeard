import {RootState} from '@redux/rootReducer';

export const counterSelector = (state: RootState) => state.demoScreen.counter;
