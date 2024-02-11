import http from 'node:http';

export function runDefaultBehavior(
  response: http.ServerResponse,
  message: string,
) {
  response.statusCode = 400;
  response.write(message);
  response.end();
}
