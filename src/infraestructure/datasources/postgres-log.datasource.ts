import { PrismaClient } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";

/**
 * Surtidor de data para los logs implementando clase abstracta correspondiente al dataSource utilizando PostgresSQL
 */
export class PostgresLogDataSource implements LogDataSource {

  private _client : PrismaClient;

  constructor()  {
    this._client = new PrismaClient();
  }

  /**
   * @title Guardar un log dependiendo de su severidad
   * @param newDataLog Informacion correspondiente al objeto de un log
   * @returns void
   */
  public async saveLog(log: LogEntity): Promise<void> {
    await this._client.logModel.create({ data: log });
  }

  /**
   * Obtener los logs a partir de un nivel de severidad
   * @param severityLevel Nivel de severidad del log
   * @returns Promesa que retorna un arreglo de LogEntity
   */
  public async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    const postgreslogs = await this._client.logModel.findMany({ where: { level: severityLevel}});
    return postgreslogs.map( log => LogEntity.fromObjectAsLogEntity(log));
  }

}