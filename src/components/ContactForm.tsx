
"use client";

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import type { Contact } from '@/types';
import { Upload } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
});

interface ContactFormProps {
  addContact: (contact: Omit<Contact, 'id'>) => void;
}

export default function ContactForm({ addContact }: ContactFormProps) {
  const { toast } = useToast();
  const [profilePicture, setProfilePicture] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    addContact({ ...values, profilePicture: profilePicture || `https://placehold.co/80x80.png` });
    form.reset();
    setProfilePicture('');
    toast({
      title: "Contact Added",
      description: `${values.name} has been added to your contacts.`,
    });
  }

  return (
    <Card className="sticky top-8 shadow-lg">
      <CardHeader>
        <CardTitle>Add New Contact</CardTitle>
        <CardDescription>Fill in the details to create a new contact card.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex items-center gap-4">
                  <Image
                    src={profilePicture || `https://placehold.co/80x80.png`}
                    alt="Profile preview"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary object-cover"
                    data-ai-hint="profile avatar"
                  />
                  <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            <Button type="submit" className="w-full">Add Contact</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
