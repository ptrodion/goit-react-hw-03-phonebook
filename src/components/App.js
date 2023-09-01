import { Component } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { ContactForm } from './FormContacts/ContactsForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const isThisNameNotUnique = this.state.contacts.some(
      telName => telName.name.toUpperCase() === newContact.name.toUpperCase()
    );

    if (!isThisNameNotUnique) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(5), ...newContact }],
      }));
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  changeContactsFilter = newFilter => {
    this.setState({
      filter: newFilter,
    });
  };

  deleteContact = contact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contactId => contactId.id !== contact
      ),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toUpperCase().includes(this.state.filter.toUpperCase())
    );

    return (
      <Layout>
        <ContactForm onAdd={this.addContact} />
        <Filter
          filter={this.state.filter}
          onFilter={this.changeContactsFilter}
        />
        <ContactsList
          allContacts={filteredContacts}
          onDelete={this.deleteContact}
        />
        <GlobalStyle />
      </Layout>
    );
  }
}
