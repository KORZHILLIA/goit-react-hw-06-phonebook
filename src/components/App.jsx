import { nanoid } from 'nanoid';
import { Component } from 'react';
import { save, load } from '../shared/services/local-storage';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageContacts = load('contacts');
    if (localStorageContacts) {
      this.setState({ contacts: localStorageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevFilter = prevState.filter;
    const { filter: currentFilter } = this.state;
    const { contacts } = this.state;
    if (prevFilter !== currentFilter) {
      return;
    }
    save('contacts', contacts);
  }

  addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => {
      const requiredIdx = prevState.contacts.findIndex(
        contact => contact.name === newContact.name
      );
      if (requiredIdx === -1) {
        return {
          contacts: [...prevState.contacts, newContact],
        };
      }
      alert(`${newContact.name} is already in contacts`);
      return;
    });
  };

  filterChangeHandler = value => {
    this.setState({ filter: value });
  };

  deleteClickHandler = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const preparedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(preparedFilter)
    );
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterChangeHandler} />
        <ContactList
          contacts={filteredContacts}
          deleteClickHandler={this.deleteClickHandler}
        />
      </div>
    );
  }
}
