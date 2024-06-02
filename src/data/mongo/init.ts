import mongoose from "mongoose";

export interface MongoDataBaseConnectionConfig {
  dbName: string;
  url   : string;
}

/**
 * Instancia a base de datos con MongoDb
 */
export class MongoDataBase {

  private static mongooseInstance: typeof mongoose | null = null;

  /**
   * Conectar a la base de datos
   * @param connectionConfig Configuracion para la conexion a la base de datos
   */
  public static async connect(connectionConfig:MongoDataBaseConnectionConfig): Promise<boolean>{
    try {
      MongoDataBase.mongooseInstance = await mongoose.connect(connectionConfig.url, {dbName: connectionConfig.dbName});
      console.log('Mongo DataBase connected!');
      return true;
    } catch (error) {
      console.error('Mongo DataBase connection error');      
      throw error;
    }
  }

  /**
   * Desconectar base de datos de mongo
   * @param force forzar desconexion, por defecto es undefined
   */
  public static async disconnect(force?:boolean):Promise<void>{
    if(MongoDataBase.mongooseInstance){
      await MongoDataBase.mongooseInstance.connection.close(force);
    }
  }
}