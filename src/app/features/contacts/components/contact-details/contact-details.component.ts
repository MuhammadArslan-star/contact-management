import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact, ContactEmail, AvatarStyle, SocialPlatform } from '../../../../shared/models/types';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { SocialIconsComponent } from '../../../../shared/components/social-icons/social-icons.component';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, PrimaryButtonComponent, SocialIconsComponent],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  @Input() contact: Contact | null = null;
  @Input() emails: ContactEmail[] = [];
  @Input() loading: boolean = false;
  @Input() detailsError: string | null = null;
  @Input() showMobileDetails: boolean = false;

  @Output() backToList = new EventEmitter<void>();

  protected readonly AvatarStyles = AvatarStyle;

  /** Fixed-length array to render skeleton rows (Email, Dial, Meeting, Phone, Social) while details load. */
  protected readonly skeletonRows = Array.from({ length: 5 });

  /**
   * Static social strip shown in the details pane. The API provides no per-contact
   * social links, so these are generic platform links matching the reference design.
   */
  protected readonly socials: ReadonlyArray<{ platform: SocialPlatform; url: string }> = [
    { platform: SocialPlatform.FACEBOOK, url: 'https://facebook.com' },
    { platform: SocialPlatform.PINTEREST, url: 'https://pinterest.com' },
    { platform: SocialPlatform.TWITTER, url: 'https://twitter.com' },
    { platform: SocialPlatform.LINKEDIN, url: 'https://linkedin.com' },
    { platform: SocialPlatform.GOOGLE, url: 'https://google.com' }
  ];

  onBack() {
    this.backToList.emit();
  }
}
