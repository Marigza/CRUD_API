# CRUD_API
Implementing simple CRUD API using in-memory database underneath

# For start using application you need

1. Install Node.js. Use 20 LTS version of Node.js
2. Copy this repository 
3. Clone Your newly copied repo locally
4. Go to folder CRUD-API
5. To install all dependencies use *npm install*
6. To run application in dev-mode use *npm run start:dev*
7. Application is running on *localhost:4000*
8. Now You can check endpoints in Postman:
  1. GET localhost:4000/api/users
  2. GET localhost:4000/api/users?id={userId}
  3. POST localhost:4000/api/users
  4. PUT localhost:4000/api/users?id={userId}
  5. DELETE localhost:4000/api/users?id={userId}
9. For creating new user you need following properties:
  1. *username* — user's name (string, required)
  2. *age* — user's age (number, required)
  3. *hobbies* — user's hobbies (array of strings or empty array, required)