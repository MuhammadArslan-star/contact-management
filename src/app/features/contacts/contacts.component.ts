import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { ContactListingComponent } from './components/contact-listing/contact-listing.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { MOCK_CONTACTS } from '../../shared/models/mock-contacts';
import { Contact, ContactEmail } from '../../shared/models/types';
import { ContactsApiService } from '../../core/services/contacts-api.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactListingComponent,
    ContactDetailsComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  private readonly contactsApi = inject(ContactsApiService);

  // Contacts list state
  protected contacts = signal<Contact[]>([]);
  protected contactsLoading = signal<boolean>(true);
  protected contactsLoadError = signal<string | null>(null);
  protected searchQ = signal<string>('');

  // Details state — no contact is selected by default (empty state).
  protected selectedContact = signal<Contact | null>(null);
  protected emails = signal<ContactEmail[]>([]);
  protected detailsLoading = signal<boolean>(false);
  protected detailsError = signal<string | null>(null);

  // Mobile navigation view state
  protected showMobileDetails = signal<boolean>(false);

  constructor() {
    this.contactsApi.getContacts()
      .pipe(catchError((error: Error) => {
        this.contactsLoadError.set(error.message);
        return of(MOCK_CONTACTS);
      }))
      .subscribe((contacts) => {
        this.contacts.set(contacts);
        this.contactsLoading.set(false);
      });
  }

  protected selectContact(contact: Contact) {
    this.selectedContact.set(contact);
    this.showMobileDetails.set(true); // Switch to details view on mobile

    // Load the contact's associated email addresses.
    this.emails.set([]);
    this.detailsError.set(null);
    this.detailsLoading.set(true);

    this.contactsApi.getContactEmails(contact.id)
      .pipe(catchError((error: Error) => {
        this.detailsError.set(error.message);
        return of([] as ContactEmail[]);
      }))
      .subscribe((emails) => {
        this.emails.set(emails);
        this.detailsLoading.set(false);
      });
  }

  protected goBackToList() {
    this.showMobileDetails.set(false); // Switch to list view on mobile
  }
}
