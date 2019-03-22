# placeholder-title

[![codecov](https://codecov.io/gh/uptonm/placeholder-title/branch/master/graph/badge.svg)](https://codecov.io/gh/uptonm/placeholder-title)
[![Build Status](https://travis-ci.org/uptonm/placeholder-title.svg?branch=master)](https://travis-ci.org/uptonm/placeholder-title)

## Development Setup

### Enviornment Variables

- The use of this project for development purposes requires the setup of a few enviornment variables located in the `./sample.env` file.
- Once setup this file must be renamed to `./.env` to work properly.

```javascript
PORT = xxxxx; // (optional)

DB_URI = xxxxx; // (URI to an accessible MongoDB Server)

JWT_SECRET = xxxxx; // (random string of letters and characters for hashing)

GOOGLE_CLIENT= xxxxx; // This is your client id from Google APIs
GOOGLE_SECRET=xxxxx' // This is your client secret from Google APIs
```

### MongoDB Setup

#### Local Dockerized Setup

[Docker Installation/Setup Guide](https://docs.docker.com/install/)

- `docker pull mongo:latest` - To pull the latest docker image of MongoDB server.
- `docker run -p 27017:27017 mongo` - To run the MongoDB container on port 27017 (default for MongoDB). To run without output append the `-d` flag after the `-p 27017:27017`.
- Edit the `DB_URI` enviornment variable to this format:
  - mongodb://localhost:27017/\<`collection name`>
