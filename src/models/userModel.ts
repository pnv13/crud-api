import { User } from './../types/Users';
import { NewUser } from 'types/Users';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((userData) => userData.id === id);
    resolve(user);
  });
};

export const createUser = (user: NewUser): Promise<User> => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
};
