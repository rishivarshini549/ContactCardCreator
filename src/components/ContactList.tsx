"use client"

import type { Contact } from '@/types';
import ContactCard from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
}

export default function ContactList({ contacts, updateContact, deleteContact }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-16 px-8 bg-card rounded-lg shadow-md flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-2xl font-semibold text-card-foreground">No Contacts Yet</h2>
        <p className="text-muted-foreground mt-2">Add a new contact using the form to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contacts.map(contact => (
        <div key={contact.id} className="motion-safe:animate-[accordion-down_0.5s_ease-out]">
          <ContactCard contact={contact} updateContact={updateContact} deleteContact={deleteContact} />
        </div>
      ))}
    </div>
  );
}
