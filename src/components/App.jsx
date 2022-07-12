import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contacts/contacts-actions';
import { setFilter } from 'redux/filter/filter-actions';
import { getFilteredContacts } from 'redux/filtered-contacts-selector';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export const App = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(getFilteredContacts);

  function addContactToGlobalStore(contact) {
    dispatch(addContact(contact));
  }

  function deleteClickHandler(id) {
    dispatch(deleteContact(id));
  }

  function setGlobalFilter(letter) {
    dispatch(setFilter(letter));
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactToGlobalStore} />
      <h2>Contacts</h2>
      <Filter onChange={setGlobalFilter} />
      <ContactList
        contacts={filteredContacts}
        deleteClickHandler={deleteClickHandler}
      />
    </div>
  );
};
