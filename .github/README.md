<h2 align="center">placeholder-title</h2>
<p align="center">
  <a href="https://codecov.io/gh/uptonm/placeholder-title">
    <img src="https://codecov.io/gh/uptonm/placeholder-title/branch/master/graph/badge.svg" />
  </a>
  <a href="https://travis-ci.org/uptonm/placeholder-title">
    <img src="https://travis-ci.org/uptonm/placeholder-title.svg?branch=master">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/uptonm/placeholder-title.svg">
  </a>
  <a href="https://github.com/prettier/prettier">
   <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" />
  </a>
  <br/>
</p>


## Development Setup

### Enviornment Variables

- The use of this project for development purposes requires the setup of a few enviornment variables located in the `./sample.env` file.
- Once setup this file must be renamed to `./.env` to work properly.

```javascript
PORT = xxxxx; // (optional)

DB_URI = xxxxx; // (URI to an accessible MongoDB Server)

JWT_SECRET = xxxxx; // (random string of letters and characters for hashing)
```

### MongoDB Setup

#### Local MongoDB Setup

- [MacOS](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
- [Windows](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)

#### Local Dockerized MongoDB Setup

[Docker Installation/Setup Guide](https://docs.docker.com/install/)

- `docker pull mongo:latest` - To pull the latest docker image of MongoDB server.
- `docker run -p 27017:27017 mongo` - To run the MongoDB container on port 27017 (default for MongoDB). To run without output append the `-d` flag after the `-p 27017:27017`.
- Edit the `DB_URI` enviornment variable to this format:
  - mongodb://localhost:27017/\<`collection name`>

#### Running the Dev Server
- In the root directory of the repo, make the above changes to the `sample.env` file, and then rename the file to `.env`.
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development nodemon server

#### Requirements for contributions
- This project uses Jest and Eslint for code consistency and reliability, so before you open a PR to contribute be sure to run `npm run lint` and `npm run test` to assure that your code doesn't break anything. 



