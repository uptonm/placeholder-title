<h2 align="center">placeholder-title</h2>
<p align="center">
  <a href="https://codecov.io/gh/placeholdertitle/placeholder-title-api">
    <img src="https://codecov.io/gh/placeholdertitle/placeholder-title-api/branch/master/graph/badge.svg" />
  </a>
  <a href="https://travis-ci.org/placeholdertitle/placeholder-title-api">
    <img src="https://travis-ci.org/placeholdertitle/placeholder-title-api.svg?branch=master">
  </a>
  <a href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/uptonm/placeholder-title.svg">
  </a>
  <a href="https://github.com/prettier/prettier">
   <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" />
  </a>
  <a href="https://allcontributors.org/">
    <img src="https://img.shields.io/badge/all_contributors-1-orange.svg" />
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




## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/ShawnToubeau"><img src="https://avatars1.githubusercontent.com/u/22332636?v=4" width="100px;" alt="Shawn Toubeau"/><br /><sub><b>Shawn Toubeau</b></sub></a><br /><a href="https://github.com/placeholdertitle/placeholder-title-api/commits?author=ShawnToubeau" title="Code">💻</a> <a href="#ideas-ShawnToubeau" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://uptonm.github.io/portfolio-site/"><img src="https://avatars3.githubusercontent.com/u/23084678?v=4" width="100px;" alt="Mike Upton"/><br /><sub><b>Mike Upton</b></sub></a><br /><a href="https://github.com/placeholdertitle/placeholder-title-api/commits?author=uptonm" title="Code">💻</a> <a href="#ideas-uptonm" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-uptonm" title="Design">🎨</a></td><td align="center"><a href="https://github.com/SaturnoJ"><img src="https://avatars2.githubusercontent.com/u/34634077?v=4" width="100px;" alt="Jason Saturno"/><br /><sub><b>Jason Saturno</b></sub></a><br /><a href="#ideas-SaturnoJ" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
