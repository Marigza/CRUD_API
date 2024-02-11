import { User } from './userModel';
import { v4 as uuidv4 } from 'uuid';

export const UserData: User[] = [
  {
    id: uuidv4(),
    username: 'marinell',
    age: 18,
    hobbies: ['skiing', 'cooking', 'reading'],
  },
  {
    id: uuidv4(),
    username: 'marinella',
    age: 18,
    hobbies: ['skate', 'reading'],
  },
];
