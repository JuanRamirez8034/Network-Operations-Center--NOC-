import { LogRepository } from '../../repository/log.repositiry';
import { LogEntity } from '../../entities/log.entity';

type SuccessCb = () => void;
type ErrorCb = (error:string) => void;

interface CheckServiceMultipleSaveUseCase {
  execute(url:string) : Promise<boolean>;
}

/**
 * Servicio encargado de realizar seguimiento a direcciones de servicios activos
 */
export class CheckServiceMultipleSave implements CheckServiceMultipleSaveUseCase {

  /**
   * Necesidades para el correcto funcinamiento
   * @param logRepositories Arreglo de repositorios donde manejar la informacion
   * @param successCallback Funcion de llamada que se ejecuta si todo va bien
   * @param errorCallback Funcion de llamada que se ejecuta si existe un error
   */
  constructor(
    private readonly logRepositories    : Array<LogRepository>,
    private readonly successCallback ?: SuccessCb,
    private readonly errorCallback   ?: ErrorCb,
  ){ 
    if(logRepositories.length <= 0) throw Error('[check-service-multiple-save] The use case requires at least one LogEntity to function properly ');
  }

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
      await this._multipleSaveLog(log);

      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMsg = `[Check service error] ${error} at service: ${url}`;

      const log : LogEntity = new LogEntity({level: 'high', message: errorMsg, origin: '[checks-service.ts] execute method'});
      await this._multipleSaveLog(log);

      this.errorCallback && this.errorCallback(errorMsg);
      
      return false;
    }
  }

  /**
   * Guardar un log en todos los repositorios aportados
   * @param log Entidad de Log
   */
  private async _multipleSaveLog(log:LogEntity):Promise<void> {
    for await ( const logRepository of this.logRepositories) {
      logRepository.saveLog(log);
    }
  }
}