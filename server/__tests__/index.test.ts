import request from 'supertest';

let server: any;

describe('app entry', () => {
  beforeEach(() => {
    server = require('..').server;
  });

  afterEach(() => {
    server = null;
  });

  it('app works', done => {
    request(server)
      .get('/test')
      .expect(200, () => {
        server.close();
        done();
      });
  });
});
