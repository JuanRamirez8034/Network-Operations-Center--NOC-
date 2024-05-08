import { LogRepository } from '../../repository/log.repositiry';
import { LogEntity } from '../../entities/log.entity';

type SuccessCb = () => void;
type ErrorCb = (error:string) => void;

interface CheckServiceUseCase {
  execute(url:string) : Promise<boolean>;
}

/**
 * Servicio encargado de realizar seguimiento a direcciones de servicios activos
 */
export class CheckService implements CheckServiceUseCase {

  /**
   * Acciones a realizar en caso de error o exito
   * @param successCallback Funcion de llamada que se ejecuta si todo va bien
   * @param errorCallback Funcion de llamada que se ejecuta si existe un error
   */
  constructor(
    private readonly logRepository    : LogRepository,
    private readonly successCallback ?: SuccessCb,
    private readonly errorCallback   ?: ErrorCb,
  ){ }

  /**
   * @title Ejecutar la comprobacion del estado activo del servicio
   * @param url Direccion a consultar
   * @returns boolean
   */
  public async execute(url: string): Promise<boolean> {
    try {
      const resp = await fetch(url, {method: 'get'});
      if(!resp) throw `fail check response > ${ url }`;

      const log : LogEntity = new LogEntity({level: 'low', message: `Service status ok: ${url}`, origin: '[checks-service.ts] execute method'});
      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMsg = `[Check service error] ${error} at service: ${url}`;

      const log : LogEntity = new LogEntity({level: 'high', message: errorMsg, origin: '[checks-service.ts] execute method'});
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMsg);
      
      return false;
    }
  }
}