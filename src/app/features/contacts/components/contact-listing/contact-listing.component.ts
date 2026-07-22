import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact, AvatarStyle } from '../../../../shared/models/types';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';
import { ContactSearchPipe } from '../../../../shared/pipes/contact-search.pipe';
import { ContactSubtitlePipe } from '../../../../shared/pipes/contact-subtitle.pipe';
import { SearchHighlightPipe } from '../../../../shared/pipes/search-highlight.pipe';

@Component({
  selector: 'app-contact-listing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserAvatarComponent,
    ContactSearchPipe,
    ContactSubtitlePipe,
    SearchHighlightPipe
  ],
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

  /** Full display name for a contact. */
  protected fullName(contact: Contact): string {
    return `${contact.firstName ?? ''} ${contact.lastName ?? ''}`.trim();
  }

}
