import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const addContact = createAction('contacts/add', contact => ({
  payload: { ...contact, id: nanoid() },
}));

const deleteContact = createAction('contacts/delete');

export { addContact, deleteContact };
