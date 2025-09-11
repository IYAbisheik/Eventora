import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {storage} from './slices';
import {logout} from './slices/userSlice';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    storage.clearAll();
  },
});

export const loadPersistedState = () => {
  try {
    const userState = storage.getString('user');
    if (userState) {
      return {
        user: JSON.parse(userState),
      };
    }
  } catch (e) {
    console.error('Failed to load persisted state', e);
  }
  return undefined;
};
