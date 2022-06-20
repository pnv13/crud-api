import http from 'http';
import 'dotenv/config';
import { getUsers, getUser, addUser, updateUser } from './controllers/userController';

export const startServer = () => {
  const PORT = process.env.PORT;
  const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
      const id = req.url.split('/')[3];
      getUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      addUser(req, res);
    } else if (req.url?.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
      const id = req.url.split('/')[3];
      updateUser(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Bad Request' }));
    }
  });
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
