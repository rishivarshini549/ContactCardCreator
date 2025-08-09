"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, Edit, Trash2, Save, X } from 'lucide-react';
import type { Contact } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactCardProps {
  contact: Contact;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: string) => void;
}

export default function ContactCard({ contact, updateContact, deleteContact }: ContactCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateContact({ ...contact, ...editedDetails });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDetails({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setIsEditing(false);
  };

  return (
    <Card className="flex flex-col h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Image
          src={contact.profilePicture}
          alt={`${contact.name}'s profile picture`}
          width={80}
          height={80}
          className="rounded-full border-2 border-primary object-cover"
          data-ai-hint="profile picture"
        />
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input name="name" value={editedDetails.name} onChange={handleInputChange} className="text-xl font-bold" />
          ) : (
            <CardTitle className="text-2xl font-bold text-primary truncate">{contact.name}</CardTitle>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Mail className="w-5 h-5 text-accent flex-shrink-0" />
          {isEditing ? <Input name="email" type="email" value={editedDetails.email} onChange={handleInputChange} /> : <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors truncate min-w-0">{contact.email}</a>}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Phone className="w-5 h-5 text-accent flex-shrink-0" />
          {isEditing ? <Input name="phone" type="tel" value={editedDetails.phone} onChange={handleInputChange} /> : <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors truncate min-w-0">{contact.phone}</a>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" /> Save</Button>
            <Button onClick={handleCancel} variant="outline" size="sm"><X className="mr-2 h-4 w-4" /> Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the contact for {contact.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => deleteContact(contact.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
