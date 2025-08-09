"use client";

import { useState } from 'react';
import type { Contact } from '@/types';
import ContactForm from '@/components/ContactForm';
import ContactList from '@/components/ContactList';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: new Date().toISOString() + Math.random() };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };
  
  const updateContact = (updatedContact: Contact) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  }

  const deleteContact = (id: string) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  }

  return (
    <main className="container mx-auto p-4 md:p-8 lg:p-12">
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">ContactCard Creator</h1>
        <p className="text-muted-foreground mt-2 text-lg">Create and manage your contacts with ease.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-1">
          <ContactForm addContact={addContact} />
        </div>
        <div className="lg:col-span-2">
          <ContactList contacts={contacts} updateContact={updateContact} deleteContact={deleteContact} />
        </div>
      </div>
    </main>
  );
}
