import http from 'node:http';

export function runDefaultBehavior(
  response: http.ServerResponse,
  statusCode: number,
  message: string,
) {
  response.statusCode = statusCode;
  response.write(message);
  response.end();
}
