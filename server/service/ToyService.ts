import mysql, { Connection } from 'mysql';
import { getTargetResource } from '../utils/resource';

export default class ToyService {
  private static connectionInstance: Connection;
  connection: Connection;

  // To use this.connection instead of ToyService.connectionInstance
  // in class body
  constructor() {
    if (!ToyService.connectionInstance) {
      const connect = this.createConnection();
      ToyService.connectionInstance = connect;
      this.connection = connect;
      connect.connect();
    }
  }

  public static getConnection() {
    if (!ToyService.connectionInstance) {
      ToyService.connectionInstance = new ToyService().createConnection();
      ToyService.connectionInstance.connect();
    }
    return ToyService.connectionInstance;
  }

  private createConnection = () => {
    const config = getTargetResource('database').mysql;
    return mysql.createConnection(config);
  };

  getDataBySqlKey = (key: string) => {
    const sql = getTargetResource('sql/common').sql;
    return new Promise((resolve, reject) => {
      this.connection.query(sql[key], (error, result, fields) => {
        if (error) {
          reject(error);
        }
        resolve({ result, fields });
      });
    });
  };
}
