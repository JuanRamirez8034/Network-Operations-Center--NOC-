import { CheckService } from "../domain/use-cases/checks/checks-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepositoryImplementation = new LogRepositoryImplementation(new FileSystemDatasource());

/**
 * Servidor encargado de realizar las acciones comprobaciones y demas procesos
 */
export class ServerApp {

  /**
   * Ejecutar/poner en marcha el servidor
   */
  public static start():void {
    console.log('Server running...');
    
    CronService.createJob('*/5 * * * * *', async () => {
      const urlService = 'https://google.com'
      const checkResp = await new CheckService(
        fileSystemLogRepositoryImplementation,
        // () => { console.log('Service ok'); },
        // (error) => { console.error(error); }
      ).execute(urlService);
    });
  }
}