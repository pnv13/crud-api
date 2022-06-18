import { getUserData } from './../utils';
import { NewUser } from 'types/Users';
import { createUser, findById } from './../models/userModel';
import { findAll } from '../models/userModel';
import http from 'http';
import { validate as uuidValidate } from 'uuid';

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
    } else if (!uuidValidate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid ID' }));
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
    const body = await getUserData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const user: NewUser = {
      username,
      age,
      hobbies,
    };

    if (user.username === undefined || user.age === undefined || user.hobbies === undefined) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'body does not contain required fields' }));
    } else {
      const newUser = await createUser(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    console.log(error);
  }
};
