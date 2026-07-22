import { Contact } from './types';

/** Offline/error fallback used when the contacts API is unreachable. */
export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    firstName: 'Roland',
    lastName: 'Torp',
    avatar: 'https://avatars.githubusercontent.com/u/91216485',
    role: 'Customer Support Representative',
    phone: '+1 202-555-0101',
    bio: 'Customer Support Representative with experience in handling customer queries, resolving issues, and providing excellent support services.',
    dial: 'roland.torp@company.com',
    meeting: 'https://meet.example.com/roland.torp-1'
  },
  {
    id: '2',
    firstName: 'Eileen',
    lastName: 'Crona',
    avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/44.jpg',
    role: 'Sales Manager',
    phone: '+1 202-555-0132',
    bio: 'Sales Manager focused on building long-term client relationships and driving revenue growth across regional accounts.',
    dial: 'eileen.crona@company.com',
    meeting: 'https://meet.example.com/eileen.crona-2'
  },
  {
    id: '3',
    firstName: 'Salvador',
    lastName: 'Shields',
    avatar: 'https://avatars.githubusercontent.com/u/21585288',
    role: 'Product Designer',
    phone: '+1 202-555-0177',
    bio: 'Product Designer crafting intuitive interfaces and design systems with a focus on accessibility and user delight.',
    dial: 'salvador.shields@company.com',
    meeting: 'https://meet.example.com/salvador.shields-3'
  }
];
