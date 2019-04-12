const request = require('supertest');
process.env.NODE_ENV = 'test';
const server = require('../');

let user = {
  email: 'stevenJ@giggle.io',
  password: 'unicornFarts123'
};

describe('Get Health', () => {
  it('It should respond without error', done => {
    request(server)
      .get('/api/health')
      .expect(200);
    done();
  });
});

describe('Create User', () => {
  it('Sign Up Test', done => {
    request(server)
      .post('/auth/signup')
      .send(user)
      .expect(200);
    done();
  });
});

describe('Log In', () => {
  it('Log In Test', done => {
    request(server)
      .post('/auth/login')
      .send(user)
      .expect(200);
    done();
  });
});
