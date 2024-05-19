import { CheckServiceMultipleSave } from "../domain/use-cases/checks/checks-service-multiple-save";
import { FileSystemLogDatasource } from "../infraestructure/datasources/fileSystem-log.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";


const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemLogDatasource()
);

const mongodbLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);

const postgresDBLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
);

// const emailServiceInstance = new EmailService();

/**
 * Servidor encargado de realizar las acciones comprobaciones y demas procesos
 */
export class ServerApp {

  /**
   * Ejecutar/poner en marcha el servidor
   */
  public static start():void {
    console.log('Server running...');
    
    // new EmailSendLogs(logRepositoryImplementation, emailServiceInstance)
    // .excecute('juanr900000@gmail.com');
    
    CronService.createJob('*/60 * * * * *', async () => {
      const urlService = 'https://google.com'
      const checkResp = await new CheckServiceMultipleSave(
        [fsLogRepository, mongodbLogRepository, postgresDBLogRepository],
        () => { console.log(`Service ${urlService} ok`); },
        (error) => { console.error(error); }
      ).execute(urlService);
    });
  }
}