import {RootState} from '@redux/rootReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
