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

GOOGLE_CLIENT= xxxxx; // This is your client id from Google APIs
GOOGLE_SECRET= xxxxx; // This is your client secret from Google APIs
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
  
### Google APIs Setup

- Navigate to the [Google Developers Page](https://console.developers.google.com)
- Log in or Sign up with a Google Account.
- At the top left of the site, to the right of the GoogleAPIs logo click the dropdown button, and select create a new project.
- You can name this project whatever you'd like because it is only used for your own dev enviornment.
- This project will take a few seconds to create, then navigate back to that same dropdown menu and select the project you just created.
- On the Dashboard you should see a '+' icon that says Enable APIs and Services. Click on that and search for 'plus'.
- Choose the 'Google+ API' and click enable.
- You should navigate back to the Dashboard after enabling, then click credentials on the left sidebar, then create credential.
- Confirm the following fields:
  - Which API are you using? : `Google+ API`
  - Where will you be calling the API from?: `Web browser (Javascript)`
  - What data will you be accessing?: `User data`
- Click 'What credentials do I need?'
- Confirm the following fields:
  - Name: `this can be whatever you want`
  - Authorized JavaScript Origins:
    - `http://localhost:8000`
    - `Also any other ports you want to run the dev server on`
  - Authorized Redirect URIs:
    - `http://localhost:8000/auth/google/callback`
    - `Also any other ports you want to run the dev server on`
- Create OAuth client ID
- Press Done
- Click the download icon to the far right of the OAuth 2.0 client IDs table's first row
- You should get a file called `client_secret.json` that looks like the following:
``` json
{
  "web": {
    "client_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
    "project_id": "placeholder-title",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "redirect_uris": ["http://localhost:8000/auth/google/callback"],
    "javascript_origins": ["http://localhost:8000"]
  }
}
```
- Set your enviornment variables for `GOOGLE_CLIENT` and `GOOGLE_SECRET` to `client_id` and `client_secret` respectively.



