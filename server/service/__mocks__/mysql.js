import mysql from 'mysql';

const innerMock = {
  connect: jest.fn(),
  query: async (_, callback) => await callback(null, 'result', 'fields'),
};

mysql.createConnection = jest.fn().mockImplementation(() => {
  return innerMock;
});
mysql.createConnection.connect = jest.fn();

export default mysql;
export { innerMock };
