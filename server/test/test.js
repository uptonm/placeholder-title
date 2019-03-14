const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('Get Health', () => {
  it('It should respond without error', done => {
    chai
      .request(server)
      .get('/api/health')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
      });
    done();
  });
});

describe('Create User', () => {
  it('It should respond without error', done => {
    chai
      .request(server)
      .post('/api/signup')
      .send({
        email: 'username',
        password: 'password'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
      });
    done();
  });
});

describe('Log In', () => {
  it('It should respond without error', done => {
    chai
      .request(server)
      .post('/api/login')
      .send({
        email: 'username',
        password: 'password'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
      });
    done();
  });
});
