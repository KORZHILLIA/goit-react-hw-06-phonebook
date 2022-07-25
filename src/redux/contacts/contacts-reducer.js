import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './contacts-actions';

export const contactsReducer = createReducer([], {
  [addContact]: (store, { payload }) => {
    return [...store, payload];
  },
  [deleteContact]: (store, { payload }) => {
    return store.filter(contact => contact.id !== payload);
  },
});
