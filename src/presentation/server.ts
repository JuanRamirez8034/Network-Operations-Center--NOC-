import { CheckService } from "../domain/use-cases/checks/checks-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {

  public static start():void {
    console.log(`Server started...`);
    
    CronService.createJob('*/1 * * * * *', async () => {
      const urlService = 'https://google.com'
      const checkResp = await new CheckService(
        () => { console.log('Service ok'); },
        (error) => { console.error(error); }
      ).execute(urlService);
    });
  }
}