import { env } from "../config/plugins";
import { CheckServiceMultipleSave } from "../domain/use-cases/checks/checks-service-multiple-save";
import { EmailSendLogs } from "../domain/use-cases/email/email-send-logs";
import { FileSystemLogDatasource } from "../infraestructure/datasources/fileSystem-log.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";


const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemLogDatasource()
);

const mongodbLogRepository = new LogRepositoryImplementation(
  new MongoLogDataSource()
);

const postgresDBLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
);

const emailServiceInstance = new EmailService({
  service: env.MAILER_SERVICE,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_SECRET_KEY,
  }
});

/**
 * Servidor encargado de realizar las acciones comprobaciones y demas procesos
 */
export class ServerApp {

  /**
   * Ejecutar/poner en marcha el servidor
   */
  public static start():void {
    console.log('NOC Server Running...');
    
    CronService.createJob('0 0 * * * *', async () => {
      new EmailSendLogs(fsLogRepository, emailServiceInstance)
      .excecute('juanr900000@gmail.com');
      console.log('send');
      
    });
    
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