import { User } from './userModel';
import { v4 as uuidv4 } from 'uuid';

export const UserData: User[] = [
  {
    id: uuidv4(),
    username: 'user1',
    age: 18,
    hobbies: ['skiing', 'cooking', 'reading'],
  },
  {
    id: uuidv4(),
    username: 'user2',
    age: 32,
    hobbies: ['skate', 'swimming'],
  },
  {
    id: uuidv4(),
    username: 'user3',
    age: 45,
    hobbies: ['football', 'hiking'],
  },
];
