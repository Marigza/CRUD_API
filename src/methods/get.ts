import http from 'node:http';
import { validate as uuidValidate } from 'uuid';

import { runDefaultBehavior } from '../defaultServerBehavior';
import { User } from '../usersData/userModel';

export function runGetMethod(
  request: http.IncomingMessage,
  response: http.ServerResponse,
  data: User[],
  query: URL,
) {
  const url = request.url?.split('?')[0];

  switch (url) {
    case '/api/users':
      if (query.searchParams.get('id')) {
        const id = query.searchParams.get('id');
        const dataById = data.find((user) => user.id === id);

        if (id && !uuidValidate(id)) {
          response.statusCode = 400;
          response.write(`userId ${id} is invalid`);
          response.end();
          return;
        }

        if (!dataById) {
          response.statusCode = 404;
          response.write(`user ${id} is not exist`);
          response.end();
          return;
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(dataById));
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(data));
        response.end();
      }

      break;
    default:
      runDefaultBehavior(response, 404, `can not get ${request.url}`);
  }
}
