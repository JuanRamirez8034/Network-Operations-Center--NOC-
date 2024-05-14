import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDataSource {

  /**
   * @title Guardar un log dependiendo de su severidad
   * @param newDataLog Informacion correspondiente al objeto de un log
   * @returns void
   */
  public async saveLog(log: LogEntity): Promise<void> {
    const newMongoLog = await LogModel.create(log);
    await newMongoLog.save();
  }

  /**
   * Obtener los logs a partir de un nivel de severidad
   * @param severityLevel Nivel de severidad del log
   * @returns Promesa que retorna un arreglo de LogEntity
   */
  public async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    const mongoLogs = await LogModel.find({$eq: {level: severityLevel}});
    return mongoLogs.map( mongoLog => LogEntity.fromObjectAsLogEntity(mongoLog))
  }

}