import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './slices';
import {listenerMiddleware, loadPersistedState} from './mmkvStorage';

const preloadedState = loadPersistedState();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
  preloadedState,
});

export {store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
