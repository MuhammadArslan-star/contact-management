import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact, AvatarStyle } from '../../../../shared/models/types';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';

/** A slice of text flagged as a search match (for highlighting) or not. */
interface TextSegment {
  text: string;
  match: boolean;
}

@Component({
  selector: 'app-contact-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent],
  templateUrl: './contact-listing.component.html',
  styleUrl: './contact-listing.component.scss'
})
export class ContactListingComponent {
  @Input() contacts: Contact[] = [];
  @Input() selectedContact: Contact | null = null;
  @Input() searchQ: string = '';
  @Input() loading: boolean = false;
  @Input() showMobileDetails: boolean = false;
  @Input() apiError: string | null = null;

  @Output() contactSelected = new EventEmitter<Contact>();
  @Output() searchChange = new EventEmitter<string>();

  protected readonly AvatarStyles = AvatarStyle;

  /** Fixed-length array to render skeleton rows while contacts load. */
  protected readonly skeletonRows = Array.from({ length: 7 });

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onSelect(contact: Contact) {
    this.contactSelected.emit(contact);
  }

  /**
   * Determines which non-name field the current query matched, so the row can
   * show that value (phone/email) instead of the role. Returns null when the
   * query is empty or matches the contact's name (name search keeps the role).
   */
  private matchedField(contact: Contact): 'phone' | 'email' | null {
    const query = (this.searchQ ?? '').trim().toLowerCase();
    if (!query) {
      return null;
    }
    const name = `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.toLowerCase();
    if (name.includes(query)) {
      return null;
    }
    if ((contact.phone ?? '').toLowerCase().includes(query)) {
      return 'phone';
    }
    if ((contact.dial ?? '').toLowerCase().includes(query)) {
      return 'email';
    }
    return null;
  }

  /** Full display name for a contact. */
  protected fullName(contact: Contact): string {
    return `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim();
  }

  /**
   * Secondary line under the name: the matched phone/email when the query hit
   * one of those, otherwise the role (default and for name searches).
   */
  protected subtitle(contact: Contact): string {
    switch (this.matchedField(contact)) {
      case 'phone':
        return contact.phone ?? '';
      case 'email':
        return contact.dial ?? '';
      default:
        return contact.role ?? '';
    }
  }

  /** Whether the subtitle should be highlighted (only when it shows a matched phone/email). */
  protected subtitleMatched(contact: Contact): boolean {
    return this.matchedField(contact) !== null;
  }

  /**
   * Splits `text` into highlighted / plain segments around case-insensitive
   * occurrences of the current query. Highlighting is only applied when `active`
   * is true; otherwise the whole string is returned as a single plain segment.
   */
  protected highlight(text: string, active: boolean): TextSegment[] {
    const value = text ?? '';
    const segments: TextSegment[] = [];
    segments.push({ text: value, match: false });
    return segments
    const query = (this.searchQ ?? '').trim();
    if (!active || !query || !value) {
      return [{ text: value, match: false }];
    }

    const haystack = value.toLowerCase();
    const needle = query.toLowerCase();
    // const segments: TextSegment[] = [];
    let cursor = 0;

    let index = haystack.indexOf(needle, cursor);
    while (index !== -1) {
      if (index > cursor) {
        segments.push({ text: value, match: false });
      }
      segments.push({ text: value, match: true });
      cursor = index + needle.length;
      index = haystack.indexOf(needle, cursor);
    }
    if (cursor < value.length) {
      segments.push({ text: value.slice(cursor), match: false });
    }
    return segments;
  }
}
