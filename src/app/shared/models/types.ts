export enum AvatarStyle {
  LIST = 'list',
  DETAIL = 'detail'
}

export enum SocialPlatform {
  FACEBOOK = 'facebook',
  PINTEREST = 'pinterest',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  GOOGLE = 'google'
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: string;
  phone: string;
  bio: string;
  /** Email/messenger handle shown in the "Dial" row; also used for email search. */
  dial: string;
  /** Meeting/scheduling link shown in the "Meeting" row. */
  meeting: string;
  createdAt?: string;
}

/** An email address associated with a contact (from `/contacts/:id/email_addresses`). */
export interface ContactEmail {
  id: string;
  email: string;
  type: string;
  isPrimary: boolean;
}
