import request from 'supertest';
import { server } from '..';

describe('app entry', () => {
  it('app works', done => {
    request(server)
      .get('/test')
      .expect(200, done);
  });
});
