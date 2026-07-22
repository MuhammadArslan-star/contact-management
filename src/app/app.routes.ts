import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/contacts',
    pathMatch: 'full'
  },
  {
    path: 'main/contacts',
    loadComponent: () => import('./features/contacts/contacts.component').then(m => m.ContactsComponent)
  },
  {
    path: '**',
    redirectTo: 'main/contacts'
  }
];
