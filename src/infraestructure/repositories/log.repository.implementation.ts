import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repositiry";

/**
 * Implementacion del repositorio para manejar los logs
 */
export class LogRepositoryImplementation implements LogRepository {
  
  // inyeccion de dependencias
  constructor(
    private readonly logDataSource: LogDataSource,
  ){}
  
  /**
   * @title Guaradar un log en un a traves del datasource
   * @param log Objeto correspondiente a una LogEntity
   * @returns Promesa que regresa vacio
   */
  public async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }

  /**
   * @title Obtener todos los logs del dataSource a partie de su nivel de severidad
   * @param severityLevel Nivel de severidad de los logs a encontrar
   * @returns Promesa que retorna un arreglo de LogEntity
   */
  public async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }

}