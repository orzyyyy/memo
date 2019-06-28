const { server } = require('../..');
import request from 'supertest';

afterEach(() => {
  server.close();
});

test('getMainPage', async () => {
  const response = await request(server).get('/');
  expect(response.body).toEqual({});
});
