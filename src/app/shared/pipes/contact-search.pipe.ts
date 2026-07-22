import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/types';

@Pipe({ name: 'contactSearch', standalone: true, pure: true })
export class ContactSearchPipe implements PipeTransform {
  transform(contacts: Contact[] | null | undefined, term: string | null | undefined): Contact[] {
    const query = (term ?? '').trim().toLocaleLowerCase();
    if (!query) return contacts ?? [];

    return (contacts ?? []).filter((contact) =>
      [contact.firstName, contact.lastName, contact.phone, contact.dial, contact.bio]
        .some((field) => (field ?? '').toLocaleLowerCase().includes(query))
    );
  }
}
