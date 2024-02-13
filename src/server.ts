import http from 'node:http';
import { URL } from 'node:url';

import { runDefaultBehavior } from './defaultServerBehavior';

import { runGetMethod } from './methods/get';
import { runPostMethod } from './methods/post';
import { runPutMethod } from './methods/put';
import { runDeleteMethod } from './methods/delete';

import { UserData } from './usersData/userData';

const PORT = process.env.PORT || 4000;

const myServer = http.createServer();

myServer.on('request', (request, response) => {
  const dataFromServer = UserData;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const query = new URL(request.url!, `http://${request.headers.host}`);
  try {
    switch (request.method) {
      case 'GET':
        runGetMethod(request, response, dataFromServer, query);
        break;
      case 'POST':
        runPostMethod(request, response, dataFromServer);
        break;
      case 'PUT':
        runPutMethod(request, response, dataFromServer);
        break;
      case 'DELETE':
        runDeleteMethod(request, response, dataFromServer);
        break;
      default:
        runDefaultBehavior(response, 400, 'no response');
    }
  } catch (err) {
    response.statusCode = 500;
    response.write('something went wrong');
    response.end();
  }
});

myServer.listen(PORT);

console.log(myServer.listening);
