import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/types';

export interface ContactSubtitle {
  text: string;
  isMatch: boolean;
}

@Pipe({ name: 'contactSubtitle', standalone: true, pure: true })
export class ContactSubtitlePipe implements PipeTransform {
  transform(contact: Contact, term: string | null | undefined): ContactSubtitle {
    const query = (term ?? '').trim().toLocaleLowerCase();
    if (!query) return { text: contact.role ?? '', isMatch: false };

    const name = `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim().toLocaleLowerCase();
    if (name.includes(query)) return { text: contact.role ?? '', isMatch: false };
    if ((contact.phone ?? '').toLocaleLowerCase().includes(query)) return { text: contact.phone ?? '', isMatch: true };
    if ((contact.dial ?? '').toLocaleLowerCase().includes(query)) return { text: contact.dial ?? '', isMatch: true };
    return { text: contact.role ?? '', isMatch: false };
  }
}
