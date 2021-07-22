import {RootAction} from '@redux/rootAction';

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
