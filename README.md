# Intro




# How to run
For a release execution:
```
 
```
For a development execution (hot-reload enabled):
```
 
```

# How to test
Open in your browser at:
- http://localhost : the application (http://localhost:3000 for development execution, with hot-reload)
- http://localhost:4000/api-docs : the server API documentation

# Stack
- MERN ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [ReactJS](https://reactjs.org/), [Node](https://nodejs.org/en/))
- JWT authentication (with [express-jwt](https://github.com/auth0/express-jwt#readme) and [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme))
- [material-ui](https://material-ui.com/) for UI skeleton (based on [templates](https://material-ui.com/getting-started/templates/#react-templates))
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) to hash passwords



# Roadmap
- [x] JWT token renew.
- [] Improve properties management, based on environments (consider running from docker services).
- [] Add Swagger for API documentation.
- [] Improve docker-compose to allow hotreload for development.
- [ ] Unit and integration tests.
- [ ] Improve UI error messages.



# License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
