import http from 'node:http';
import querystring from 'node:querystring';
import { validate as uuidValidate } from 'uuid';

import { runDefaultBehavior } from '../defaultServerBehavior';
import { User } from '../usersData/userModel';

export function runDeleteMethod(
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
      response.write(`need to pass user ID`);
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
      switch (url) {
        case '/api/users/':
        case '/api/users':
          const userIndex = serverdata.findIndex((user) => user.id === id);

          if (userIndex === -1) {
            response.statusCode = 404;
            response.write(`user ${id} is not exist`);
            response.end();
            return;
          }

          serverdata.splice(userIndex, 1);
          response.statusCode = 204;
          response.setHeader('Content-Type', 'application/json');
          response.write(`user ${id} was deleted`);
          response.end();
          break;
        default:
          runDefaultBehavior(
            response,
            404,
            `can not delete from ${url}. Please check URL`,
          );
      }
    }
  });
}
