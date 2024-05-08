/**
 * Nivel de severidad admitidos
 */
export type SeverityLevel = 'low' | 'medium' | 'high';

/**
 * Opciones para construir una entidad de log
 */
export interface LogEntityOptions {
  createdAt?: Date;
  level     : SeverityLevel;
  message   : string;
  origin    : string;
}

/**
 * Entidad que representa la estructura de un log
 */
export class LogEntity {

  public createdAt : Date;
  public level     : SeverityLevel;
  public message   : string;
  public origin    : string;


  /**
   * Nueva entidad de log
   * @param message Mensaje a guardar
   * @param level Nivel de severidad del mensaje
   */
  constructor( options:LogEntityOptions) {
    this.createdAt = (options.createdAt) ? options.createdAt : new Date();
    this.level     = options.level;
    this.message   = options.message;
    this.origin    = options.origin;
  }

  /**
   * @title Convertir un string correspondiente a un json en una nueva entidad
   * @param logJson string correspondiente a un json con formato de un logEn
   * @returns Entidad correspondiente a una instancia de la clase LogEntity
   */
  public static jsonAsLogEntity(logJson:string): LogEntity {
    // validando que el string correspondiente al json contenga los valores message, level y createdAt    
    if(!logJson.includes('message') || !logJson.includes('level') || !logJson.includes('createdAt') || !logJson.includes('origin')) throw new Error('[jsonAsLogEntity] json format is not valid');
    // obteniendo la informacion del log
    const { message, level, createdAt, origin } : LogEntityOptions = JSON.parse(logJson);
    // creando la entidad 
    const logEntity : LogEntity = new LogEntity({message, level, createdAt: (new Date(createdAt!)), origin});
    return logEntity;
  }
  
}