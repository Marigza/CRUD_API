import http from 'node:http';
import querystring from 'node:querystring';
import { validate as uuidValidate } from 'uuid';

import { runDefaultBehavior } from '../defaultServerBehavior';
import { User } from '../usersData/userModel';

export function runPutMethod(
  request: http.IncomingMessage,
  response: http.ServerResponse,
  serverdata: User[],
) {
  const url = request.url?.split('?')[0];
  const queryParams = request.url?.split('?')[1];
  const data: Uint8Array[] = [];

  request.on('data', (chunk) => {
    data.push(chunk);
  });

  request.on('end', () => {
    if (!queryParams) {
      response.statusCode = 404;
      response.write(`need to pass updated user data`);
      response.end();
      return;
    }

    const body = querystring.parse(queryParams);
    const id = body.id;

    if (typeof id !== 'string' || !uuidValidate(id)) {
      response.statusCode = 400;
      response.write(`user is invalid`);
      response.end();
      return;
    }

    if (request.headers['content-type'] === 'application/json' && body) {
      if (typeof body.username !== 'string') {
        body.username = '';
      }

      if (typeof body.age !== 'string') {
        body.age = '';
      }

      if (isNaN(+body.age)) {
        body.age = '0';
      }

      if (!body.hobbies) {
        body.hobbies = [];
      }

      switch (url) {
        case '/api/users':
          const userIndex = serverdata.findIndex((user) => user.id === id);
          console.log('userIndex= ', userIndex);
          if (userIndex === -1) {
            response.statusCode = 404;
            response.write(`user is not exist`);
            response.end();
            return;
          }
          serverdata[userIndex] = {
            id: id,
            username: body.username,
            age: +body.age,
            hobbies: Array.isArray(body.hobbies)
              ? body.hobbies
              : [body.hobbies],
          };
          response.statusCode = 200;
          response.setHeader('Content-Type', 'application/json');
          response.write(`user ${id} was updated`);
          response.end();
          break;
        default:
          runDefaultBehavior(
            response,
            404,
            `${url} is not exist. Please check URL`,
          );
      }
    }
  });
}
