import { User } from './../types/Users';
import { NewUser } from 'types/Users';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = (id: string): Promise<User | undefined> => {
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

export const update = (id: string, userData: NewUser) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...userData };
    resolve(users[index]);
  });
};

export const removeUser = (id: string) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    resolve(id);
  });
}
