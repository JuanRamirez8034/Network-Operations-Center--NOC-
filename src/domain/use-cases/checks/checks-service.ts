type SuccessCb = () => void;
type ErrorCb = (error:string) => void;

interface CheckServiceUseCase {
  execute(url:string) : Promise<boolean>;
}


export class CheckService implements CheckServiceUseCase {

  /**
   * Acciones a realizar en caso de error o exito
   * @param successCallback Funcion de llamada que se ejecuta si todo va bien
   * @param errorCallback Funcion de llamada que se ejecuta si existe un error
   */
  constructor(
    private readonly successCallback: SuccessCb,
    private readonly errorCallback: ErrorCb,
  ){ }

  /**
   * Ejecutar la comprobacion del estado activo del servicio
   * @param url Direccion a consultar
   * @returns boolean
   */
  public async execute(url: string): Promise<boolean> {
    try {
      const resp = await fetch(url, {method: 'get'});
      if(!resp) throw `fail check response > ${ url }`;
      this.successCallback();
      return true;
    } catch (error) {
      console.error(`[Check service error] ${error}`);
      this.errorCallback(`${error}`);
      return false;
    }
  }
}