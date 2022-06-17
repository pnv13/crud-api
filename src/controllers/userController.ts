import { createUser, findById } from './../models/userModel';
import { findAll } from '../models/userModel';
import http from 'http';

export const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const users = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const user = {
      username: 'Jim',
      age: 44,
      hobbies: ['films'],
    };

    const newUser = await createUser(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};
