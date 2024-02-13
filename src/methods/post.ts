import http from 'node:http';
import querystring from 'node:querystring';
import { v4 as uuidv4 } from 'uuid';

import { runDefaultBehavior } from '../defaultServerBehavior';
import { User } from '../usersData/userModel';

export interface Body {
  username: string;
  age: number;
  hobbies: string[];
}

export function runPostMethod(
  request: http.IncomingMessage,
  response: http.ServerResponse,
  serverdata: User[],
) {
  const data: Uint8Array[] = [];
  const url = request.url?.split('?')[0];
  const queryParams = request.url?.split('?')[1];

  request.on('data', (chunk) => {
    data.push(chunk);
  });

  request.on('end', () => {
    let body;

    if (queryParams) {
      body = querystring.parse(queryParams);
    }
    if (request.headers['content-type'] === 'application/json' && body) {
      if (typeof body.username !== 'string') {
        response.statusCode = 400;
        response.write('field USERNAME is required and do not repeated');
        response.end();
        return;
      }

      if (typeof body.age !== 'string') {
        response.statusCode = 400;
        response.write('field AGE is required and do not repeated');
        response.end();
        return;
      }

      if (isNaN(+body.age)) {
        response.statusCode = 400;
        response.write('field AGE must be a number');
        response.end();
        return;
      }

      if (!body.hobbies) {
        response.statusCode = 400;
        response.write('field HOBBIES is required');
        response.end();
        return;
      }

      const user: User = {
        id: uuidv4(),
        username: body.username,
        age: +body.age,
        hobbies: Array.isArray(body.hobbies) ? body.hobbies : [body.hobbies],
      };
      switch (url) {
        case '/api/users/':
        case '/api/users':
          serverdata.push(user);
          response.statusCode = 201;
          response.setHeader('Content-Type', 'application/json');
          response.write(JSON.stringify(user));
          response.end();
          break;
        default:
          runDefaultBehavior(
            response,
            404,
            `can not post to ${url}. Please check URL`,
          );
      }
    }
  });
}
