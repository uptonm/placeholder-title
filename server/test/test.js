const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const { app, httpServer } = require('..');

let token;
let test_user = {
  email: 'test_user@giggle.io',
  password: 'password'
};

beforeAll(async () => {
  await User.collection.drop();
  await request(app)
    .post('/auth/signup')
    .send(test_user);
  const response = await request(app)
    .post('/auth/login')
    .send(test_user);
  token = response.body.token;
  const user = await User.findOne({ email: test_user.email });
  test_user = { id: user._id, ...test_user };
});

afterAll(async () => {
  await httpServer.close();
  await mongoose.connection.close();
});

describe('GET /api/health', () => {
  // API Health route responds with 200 - OK and JSON {"isHealthy": true}
  test('It responds with {isHealthy: true}', () => {
    return request(app)
      .get('/api/health')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.isHealthy).toBeTruthy();
      });
  });
});

describe('GET /api/user', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .get('/api/user')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200 - OK
  test('It gets the user profile', () => {
    return request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });
});

describe('PUT /api/user', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .get('/api/user')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200 - OK
  test('It updates a users first and last name', () => {
    return request(app)
      .put('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .send({ first: 'Test', last: 'User' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.update).toEqual({ first: 'Test', last: 'User' });
      });
  });
});

describe('GET /api/user/following', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .get('/api/user/following')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200 - OK
  test('It returns who the user follows', () => {
    return request(app)
      .get('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([]);
      });
  });
});

describe('GET /api/user/followers', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .get('/api/user/followers')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200 - OK
  test('It returns the users followers', () => {
    return request(app)
      .get('/api/user/followers')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual([]);
      });
  });
});

let id_following;
describe('PUT /api/user/following', () => {
  const test_user2 = { email: 'test2@giggle.io', password: '1234' };
  beforeAll(async () => {
    await request(app)
      .post('/auth/signup')
      .send(test_user2);
    const user = await User.findOne({ email: test_user2.email });
    id_following = user._id;
  });
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .get('/api/user/followers')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 404 - Not Found because the user currently has no followers
  test('It follows the user', () => {
    return request(app)
      .put('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: id_following })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({
          success: {
            message: `User ${id_following} followed`,
            status: 200
          }
        });
      });
  });
  test('User is following', () => {
    return request(app)
      .get('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.length).toEqual(1);
        expect(response.body[0].email).toEqual(test_user2.email);
      });
  });
  test('Other user gets follower', async () => {
    const followedUser = await User.findOne({
      email: test_user2.email
    }).populate('followers');
    expect(followedUser.followers.length).toEqual(1);
    expect(followedUser.followers[0].email).toEqual(test_user.email);
  });
});

describe('DELETE /api/user/following', () => {
  test('It should require authorization', () => {
    return request(app)
      .delete('/api/user/followers')
      .send({ id: id_following })
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  test('It requires an id field', () => {
    return request(app)
      .delete('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({
          error: {
            message: 'This route requires an id field',
            status: 400
          }
        });
      });
  });

  test('It unfollows the user', () => {
    return request(app)
      .delete('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: id_following })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({
          success: {
            message: `User ${id_following} unfollowed`,
            status: 200
          }
        });
      });
  });

  test('User isnt following', () => {
    return request(app)
      .delete('/api/user/following')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: id_following })
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual({
          error: {
            status: 400,
            message: 'You are not following this user'
          }
        });
      });
  });
});

describe('POST /api/posts', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .post('/api/posts')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  let postId = '';
  // send the token - should respond with a 200 - OK
  test('It creates a post', () => {
    return request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test', body: 'Test' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        postId = response.body._id;
      });
  });

  describe('GET /api/posts', () => {
    // token not being sent - should respond with a 401 - Forbidden
    test('It should require authorization', () => {
      return request(app)
        .get('/api/posts')
        .then(response => {
          expect(response.statusCode).toBe(401);
        });
    });
    // send the token - should respond with a 200 - OK
    test('It gets posts', () => {
      return request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });
  });

  test('It gets a particular post', () => {
    return request(app)
      .get(`/api/posts?postId=${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('It gets a users posts', () => {
    return request(app)
      .get(`/api/posts?userId=${test_user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
      });
  });

  test('It gets a posts comments', () => {
    return request(app)
      .get(`/api/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
      });
  });
});

// *DO LAST* - DELETES USER WHICH DEACTIVATES JWT TOKEN
describe('DELETE /api/user', () => {
  // token not being sent - should respond with a 401 - Forbidden
  test('It should require authorization', () => {
    return request(app)
      .delete('/api/user')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
  let postId;
  test('It allows the user to make a post', () => {
    return request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'SAMPLE POST 123', body: 'DELETE ME' })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        postId = response.body._id;
      });
  });
  // send the token - should respond with a 200 - OK
  test('It responds with JSON', () => {
    return request(app)
      .delete('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body.message).toEqual('Deleted');
      });
  });

  test('It removed the users post', async () => {
    const exists = await Post.findById(postId);
    expect(exists).toBeFalsy();
  });

  test('It removed the user', () => {
    return request(app)
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.type).toBe('application/json');
        expect(response.body.error).toEqual({
          message: "Couldn't find your profile. Try again later."
        });
      });
  });
});
