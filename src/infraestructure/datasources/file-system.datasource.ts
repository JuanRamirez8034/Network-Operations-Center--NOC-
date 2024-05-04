import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, SeverityLevel } from "../../domain/entities/log.entity";

/**
 * Surtidor de data para los logs implementando clase abstracta correspondiente al dataSource
 */
export class FileSystemDatasource implements LogDataSource {

  // direcciones en path donde se almacenaran los logs
  private readonly logsPath       : string = pathJoin('logs');
  private readonly lowLogPath    : string = pathJoin(this.logsPath, 'logs-low.log');
  private readonly mediumLogPath : string = pathJoin(this.logsPath, 'logs-medium.log');
  private readonly highLogPath   : string = pathJoin(this.logsPath, 'logs-high.log');

  constructor(){
    // construir los directorios donde se almacenaran la informacion
    this._pathFilesConstructor();
  }

  /**
   * @title Guardar un log dependiendo de su severidad
   * @param newDataLog Informacion correspondiente al objeto de un log
   * @returns void
   */
  public async saveLog(newDataLog: LogEntity): Promise<void> {
    const dataLogAsString : string = `${JSON.stringify(newDataLog)}\n`;
    // almacenamos los logs de baja seceridad
    if(newDataLog.level === 'low') return appendFileSync(this.lowLogPath, dataLogAsString, { encoding: 'utf-8' });
    // almacenar los logs de severidad media
    if(newDataLog.level === 'medium') return appendFileSync(this.mediumLogPath, dataLogAsString, { encoding: 'utf-8' }); 
    // almacenar los logs de alta severidad
    if(newDataLog.level === 'high') return appendFileSync(this.highLogPath, dataLogAsString, { encoding: 'utf-8' }); 
  }

  /**
   * Obtener los logs a partir de un nivel de severidad
   * @param severityLevel Nivel de severidad del log
   * @returns Promesa que retorna un arreglo de LogEntity
   */
  public async getLogs(severityLevel: SeverityLevel): Promise<Array<LogEntity>> {
    // determiinando los las entidades a devolver segun su nivel de severidad
    const pathFileLog : string = (severityLevel === 'low') 
      ? this.lowLogPath 
      : (severityLevel === 'medium') 
      ? this.mediumLogPath : this.highLogPath;
    return this._getLogsFromFile(pathFileLog);
  }

  /**
   * @title Contruir los directorios necesarios para poder almacenar la informacion
   * * Crea el directorio principal donde se almacenaran los logs utilizando fs
   * * Crea los archivos correspondientes a los tipos de logs a guardar segun su nivel de severidad
   * @returns void
   */
  private _pathFilesConstructor(): void {
    // creando directorio si no existe
    if(!existsSync(this.logsPath)) mkdirSync(this.logsPath);
    // creando los archivos si no existen
    const directories = [this.lowLogPath, this.mediumLogPath, this.highLogPath];
    directories.forEach((dir:string) => {
      if(!existsSync(dir)) writeFileSync(dir, '', { encoding: 'utf-8' })
    });
  }

  /**
   * @title Obtener las entidades logs de un archivo a traves de su direccion path
   * @param pathFile Direccion path donde se encuentra el archivo
   * @returns Arreglo de LogEntity
   */
  private _getLogsFromFile(pathFile:string): Array<LogEntity>{
    const fileContent : string = readFileSync(pathFile, { encoding: 'utf-8' });
    // convirtiendo el string del archivo a un arreglo de string y posterior a un arreglo de LogEntity
    const logsEntities : LogEntity[] = fileContent.split('\n')
     .filter(logJson => logJson !== '')
     .map( logJson => LogEntity.jsonAsLogEntity(logJson));
    return logsEntities;
  }
}