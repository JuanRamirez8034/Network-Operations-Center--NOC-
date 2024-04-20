import { CronJob } from "cron";

export type CronTime = string | Date;
export type OnTickCb = () => void;

export class CronService {

  /**
   * Crear proceso que se ejecuta en periodos de tiempos especificos
   * @param cronTime Tiempo/periodo en que se ejecutra la funcion en formato '* * * * *' o Date
   * @param onTickCb CallBack con la funcionalidad a ejecutar
   * @returns CronJob
   */
  public static createJob(cronTime:CronTime, onTickCb:OnTickCb) : CronJob {
    const cronJob = new CronJob(cronTime, onTickCb);
    cronJob.start();
    return cronJob;
  }
}