import { app } from '..';
const request = require('supertest');

describe('server', () => {
  it('listening port works correctly', () => {
    request(app.listen())
      .get('/')
      .expect(204);
  });
});
