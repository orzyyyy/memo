const instance = require('..');
const request = require('supertest');

describe('server', () => {
  it('listening port works correctly', () => {
    request(instance.app.listen())
      .get('/')
      .expect(204);
  });
});
