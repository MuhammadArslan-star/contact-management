/** Relative API paths. The API interceptor resolves these against environment.apiUrl. */
export const API_ENDPOINTS = {
  contacts: '/contacts',
  contactEmails: (id: string) => `/contacts/${id}/email_addresses`
} as const;
