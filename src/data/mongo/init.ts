import mongoose from "mongoose";
import { LogModel } from "./models/log-model";

export interface MongoDataBaseConnectionConfig {
  dbName: string;
  url   : string;
}

/**
 * Instancia a base de datos con MongoDb
 */
export class MongoDataBase {

  /**
   * Conectar a la base de datos
   * @param connectionConfig Configuracion para la conexion a la base de datos
   */
  public static async connect(connectionConfig:MongoDataBaseConnectionConfig): Promise<void>{
    try {
      await mongoose.connect(connectionConfig.url, {dbName: connectionConfig.dbName});
      console.log('Mongo DataBase connected!');
    } catch (error) {
      console.error('Mongo DataBase connection error');      
      throw error;
    }
  }
}