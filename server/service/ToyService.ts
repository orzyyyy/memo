import mysql, { Connection, FieldInfo } from 'mysql';
import { getTargetResource } from '../utils/resource';
import { joinWithRootPath } from '../utils/common';
import { getAllSqlInstances, SqlInstanceProps } from '../middleware/CheckSqlTomlResource';
import { replacePlaceholderWithParams } from '../utils/sql';

export default class ToyService {
  private static connectionInstance: Connection;
  private static sqlIns: { [key: string]: SqlInstanceProps };
  connection: Connection;
  sqlInstance: { [key: string]: SqlInstanceProps };

  // To use this.connection instead of ToyService.connectionInstance
  // in class body
  constructor() {
    if (!ToyService.connectionInstance) {
      const connect = this.createConnection();
      connect.connect();

      const sqlInstance = {};
      getAllSqlInstances([joinWithRootPath('server/resource/sql')], false).map(item =>
        Object.assign(sqlInstance, item),
      );

      ToyService.connectionInstance = connect;
      ToyService.sqlIns = sqlInstance;
      this.connection = connect;
      this.sqlInstance = sqlInstance;
    } else {
      this.connection = ToyService.connectionInstance;
      this.sqlInstance = ToyService.sqlIns;
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

  getDataBySqlKey = (key: string, query: any): Promise<{ result: any; fields: FieldInfo[] | undefined }> => {
    let { sql } = this.sqlInstance[key];
    if (Object.keys(query).length && sql) {
      sql = replacePlaceholderWithParams(sql, query);
    }
    const connection = this.connection;
    return new Promise(resolve => {
      connection.query(sql, (error, result, fields) => {
        if (error) {
          return connection.rollback(() => {
            throw error;
          });
        }
        connection.commit(error => {
          if (error) {
            return connection.rollback(() => {
              throw error;
            });
          }
          resolve({ result, fields });
        });
      });
    });
  };
}
