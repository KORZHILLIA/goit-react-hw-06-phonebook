import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { save, load } from '../shared/services/local-storage';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      try {
        const localStorageContacts = load('contacts');
        if (localStorageContacts) {
          setContacts(localStorageContacts);
        }
      } catch (error) {
        alert(error.message);
      }
      isFirstRender.current = false;
    } else {
      try {
        save('contacts', contacts);
      } catch (error) {
        alert(error.message);
      }
    }
  }, [contacts]);

  const addContact = useCallback(
    ({ name, number }) => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevState => {
        const requiredIdx = prevState.findIndex(
          contact => contact.name === newContact.name
        );
        if (requiredIdx === -1) {
          return [...prevState, newContact];
        }
        alert(`${newContact.name} is already in contacts`);
        return prevState;
      });
    },
    [setContacts]
  );

  function deleteClickHandler(id) {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  }

  const preparedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(preparedFilter)
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={setFilter} />
      <ContactList
        contacts={filteredContacts}
        deleteClickHandler={deleteClickHandler}
      />
    </div>
  );
};
