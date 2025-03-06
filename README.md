<b>Country App</b>

<hr>

This app is a small API with a few endpoints created as a test assignment.
App uses other APIs to generate own responses.

Tech stack used:
- Node.js(Express)
- Typescript
- DB (MySQL)
- Environmental variables
- ESLint/Prettier

Prerequisities (must be installed on a machine):
- Node.js
- MySql server

To run the application: 
- clone the repository
- run <code>npm install</code> to install all dependencies
- for transpiled app version run <code>node dist/app.js</code>
- for re-transpiling the code and then starting the app run <code>npm run setup</code>

To test the app both Postman/similar client is the best option as one endpoint uses body parameters.
Test endpoints:
- <code>/api/v3/AvailableCountries</code>
- <code>/api/v3/CountryInfo/:code</code>, where <code>:code</code> is a country code
- <code>/api/v3/users/:id/calendar/holidays</code>, where <code>:id</code> is a users id in DB

All the endpoints must be preceeded by the origin, which inludes http protocol name, environmental host and port.
