import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Contact, ContactEmail } from '../../shared/models/types';
import { API_ENDPOINTS } from '../api/api-endpoints';

/** Shape of a raw contact record from the API (fields may be missing or auto-generated). */
interface RawContact {
  id?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
  phone?: string;
  bio?: string;
  dial?: string;
  meeting?: string;
  createdAt?: string;
}

interface RawEmail {
  id?: string;
  email?: string;
  type?: string;
  isPrimary?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactsApiService {
  constructor(private readonly http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<RawContact[]>(API_ENDPOINTS.contacts).pipe(
      map((contacts) => contacts.map((contact) => this.toContact(contact))),
      catchError((error) => throwError(() => new Error(this.describeError(error, 'contacts'))))
    );
  }

  getContactEmails(id: string): Observable<ContactEmail[]> {
    return this.http.get<RawEmail[]>(API_ENDPOINTS.contactEmails(id)).pipe(
      // The API mixes in auto-generated junk records with no `email`; keep only real ones.
      map((emails) => emails.filter((e) => !!e.email).map((e) => this.toEmail(e))),
      catchError((error) => {
        // A missing sub-resource (no emails on record) is not a user-facing error.
        if (error?.status === 404) {
          return of([] as ContactEmail[]);
        }
        return throwError(() => new Error(this.describeError(error, 'email addresses')));
      })
    );
  }

  private toContact(raw: RawContact): Contact {
    return {
      id: raw.id ?? crypto.randomUUID(),
      firstName: raw.firstName ?? '',
      lastName: raw.lastName ?? '',
      avatar: raw.avatar ?? null,
      role: raw.role ?? '',
      phone: raw.phone ?? '',
      bio: raw.bio ?? '',
      dial: raw.dial ?? '',
      meeting: raw.meeting ?? '',
      createdAt: raw.createdAt
    };
  }

  private toEmail(raw: RawEmail): ContactEmail {
    return {
      id: raw.id ?? crypto.randomUUID(),
      email: raw.email ?? '',
      type: raw.type ?? '',
      isPrimary: raw.isPrimary === true
    };
  }

  private describeError(error: { status?: number }, resource: string): string {
    return error?.status === 0
      ? `Unable to reach the contacts service. Please check your connection.`
      : `Unable to load ${resource} (request failed with status ${error?.status}).`;
  }
}
