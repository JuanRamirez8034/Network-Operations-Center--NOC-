import { createTransport, Transporter } from "nodemailer";

export interface EmailSendOptions {
  htmlBody     : string;
  subject      : string;
  to           : string | Array<string>;
  attachements?: Array<Attachement>;
}

export interface Attachement {
  filename: string;
  content?: string | Buffer;
  path   ?: string;
}

export interface EmailTransporterConfig {
  service: string;
  auth: TransporterAuth;
}

export interface TransporterAuth{
  user: string;
  pass: string;
}

/**
 * Servicio de envios de emails
 */
export class EmailService {

  private readonly _transporter    : Transporter;
  private readonly _originFileName : string = 'email-service.ts';

  /**
   * Nueva instancia de envio de correos
   * @param logRepository Repositorio para el guardado de logs de tipo LogRepository
   */
  constructor(config:EmailTransporterConfig){
    this._transporter = createTransport(config);
  }

  /**
   * Enviar nuevo correo
   * @param options Opciones de envio de correos de tipo EmailSendOptions
   * @returns Promise<boolean>
   */
  public async send(options:EmailSendOptions):Promise<boolean>{

    const sendMailInformation = await this._transporter.sendMail({
      to         : options.to,
      subject    : options.subject,
      html       : options.htmlBody,
      attachments: options.attachements
    });

    if(sendMailInformation && sendMailInformation.rejected && (sendMailInformation.rejected as Array<string>).length !== 0) throw 'Send email rejected';

    return true;
  }

  /**
   * Enviar los logs por correo
   * @param to Persona(s) a quien se le remitira el correo
   * @returns Promise<boolean>
   */
  public async sendLogsFromFileSystem(to: EmailSendOptions['to']): Promise<boolean>{
    const filesDir : string = 'logs';
    const filesName: Array<string> = ['logs-low.log', 'logs-medium.log', 'logs-high.log', ];

    const attachements : Array<Attachement> = filesName.map(filename => ({filename, path: `${filesDir}/${filename}`}));
    const options : EmailSendOptions = {
      to,
      subject: 'NOC Service Logs',
      htmlBody: `
      <p>
        This is a message with the latest logs collected throughout the day from the
        <b>Network Operations Center (NOC)</b> application in which you have configured certain services.
      </p>
      <p>Below you can see the files with the logs attached.😄</p>
      `,
      attachements
    }

    return this.send(options);
  }
}