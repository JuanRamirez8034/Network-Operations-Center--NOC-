import { LogRepository } from '../../repository/log.repositiry';
import { EmailService } from '../../../presentation/email/email-service';
import { LogEntityOptions, LogEntity } from '../../entities/log.entity';


interface EmailSendLogsUseCase {
  excecute: (to: string | Array<string>)=>Promise<boolean>;
}

export class EmailSendLogs implements EmailSendLogsUseCase {

  private readonly _originLog: string = '[use case] email-send-logs.ts';

  /**
   * Envio de correo con logs del sistema
   * @param logRepository Respositorio que procesa los logs
   * @param emailService Servicio para el envio de correos
   */
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ){}
  
  /**
   * Enviar correo electronico con los logs registrados
   * @param to persona o arreglo de personas a las que se le remitira el correo
   * @returns Promesa que resuelve un boolean
   */
  public async excecute(to: string | string[]): Promise<boolean> {
    try {
      const result: boolean = await this.emailService.sendLogsFromFileSystem(to);
      if(!result) throw Error('Send logs failled');
      const log: LogEntityOptions = {
        level: 'low',
        message: 'Send email logs success',
        origin: this._originLog,
      };
      await this.logRepository.saveLog(new LogEntity(log));
      return true
    } catch (error) {
      const log: LogEntityOptions = {
        level: 'high',
        message: `${error}`,
        origin: this._originLog,
      };
      await this.logRepository.saveLog(new LogEntity(log));
      return false;
    }
  }
  
}