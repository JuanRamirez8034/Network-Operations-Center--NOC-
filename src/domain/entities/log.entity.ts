/**
 * Nivel de severidad admitidos
 */
export type SeverityLevel = 'low' | 'medium' | 'high';

/**
 * Entidad que representa la estructura de un log
 */
export class LogEntity {

  public createdAt : Date;
  public level     : SeverityLevel;
  public message   : string;


  /**
   * Nueva entidad de log
   * @param message Mensaje a guardar
   * @param level Nivel de severidad del mensaje
   */
  constructor( message : string, level : SeverityLevel) {
    this.createdAt = new Date();
    this.level     = level;
    this.message   = message;
  }

  /**
   * @title Convertir un string correspondiente a un json en una nueva entidad
   * @param logJson string correspondiente a un json con formato de un logEn
   * @returns Entidad correspondiente a una instancia de la clase LogEntity
   */
  public static jsonAsLogEntity(logJson:string): LogEntity {
    // validando que el string correspondiente al json contenga los valores message, level y createdAt    
    if(!logJson.includes('message') || !logJson.includes('level') || !logJson.includes('createdAt')) throw new Error('[jsonAsLogEntity] json format is not valid');
    // obteniendo la informacion del log
    const { message, level, createdAt } : LogEntity = JSON.parse(logJson);
    // creando la entidad 
    const logEntity : LogEntity = new LogEntity(message, level);
    logEntity.createdAt = new Date(createdAt);
    return logEntity;
  }
  
}