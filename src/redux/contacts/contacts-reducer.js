import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './contacts-actions';

export const contactsReducer = createReducer([], {
  [addContact]: (store, { payload }) => {
    const requiredIdx = store.findIndex(
      contact => contact.name === payload.name
    );
    if (requiredIdx !== -1) {
      alert(`${payload.name} is already in contacts`);
      return;
    }
    return [...store, payload];
  },
  [deleteContact]: (store, { payload }) => {
    return store.filter(contact => contact.id !== payload);
  },
});
