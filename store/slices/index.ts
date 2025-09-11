import {combineReducers} from '@reduxjs/toolkit';
import { useReducer } from 'react';
import {MMKV} from 'react-native-mmkv';

// Create the MMKV instance
export const storage = new MMKV({
  id: 'app-storage',
  // encryptionKey: 'encryption-key',
});

export const rootReducer = combineReducers({
    user: useReducer
  });