import {ActionType} from 'typesafe-actions';

import * as demoScreen from './demoScreen/actions';

export type DemoScreenAction = ActionType<typeof demoScreen>;

// Should be an union of all actions
export type RootAction = DemoScreenAction;
