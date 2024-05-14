import { CheckService } from "../domain/use-cases/checks/checks-service";
import { EmailSendLogs } from "../domain/use-cases/email/email-send-logs";
import { FileSystemLogDatasource } from "../infraestructure/datasources/fileSystem-log.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepositoryImplementation = new LogRepositoryImplementation(
  // new FileSystemLogDatasource()
  new MongoLogDataSource()
);
const emailServiceInstance = new EmailService();

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
    
    CronService.createJob('*/5 * * * * *', async () => {
      const urlService = 'https://google.com'
      const checkResp = await new CheckService(
        logRepositoryImplementation,
        () => { console.log('Service ok'); },
        (error) => { console.error(error); }
      ).execute(urlService);
    });
  }
}