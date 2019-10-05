import mysql from 'mysql';

mysql.createConnection = jest.fn().mockImplementation(() => {
  return {
    connect: jest.fn(),
    query: async (_, callback) => await callback(null, 'result', 'fields'),
  };
});
mysql.createConnection.connect = jest.fn();

export default mysql;
