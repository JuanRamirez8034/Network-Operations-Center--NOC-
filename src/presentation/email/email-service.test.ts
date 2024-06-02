import { EmailService, EmailTransporterConfig } from "./email-service";
import nodeMailer from 'nodemailer';


describe('email-service.test.ts', () => {
  const emailServiceConfig : EmailTransporterConfig = {
    service: 'testEmailService',
    auth: {
      user: 'test',
      pass: 'test',
    },
  };
  const mockSendMail = jest.fn().mockReturnValue({});
  
  nodeMailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  
  beforeEach(() => {
    jest.restoreAllMocks();
  })
    
  // se espera llamar el metodo de enviar email desde el transporter
  test('should send email method called sendEmail from transporter', async () => {
    const emailService: EmailService = new EmailService(emailServiceConfig);
    const sendMailOptions = {to: 'test', subject: 'test', htmlBody: '<a>TEST</a>'};

    await emailService.send(sendMailOptions);

    expect(emailService).toBeInstanceOf(EmailService);
    expect(nodeMailer.createTransport).toHaveBeenCalledWith(emailServiceConfig);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: undefined,
      html: sendMailOptions.htmlBody,
      subject: sendMailOptions.subject,
      to: sendMailOptions.to,
    });
  });

  // se espera llamar el metodo de sendMail con la informacion especifica de los logs
  test('should send email with logs from method sendMail', async () => {
    const emailService: EmailService = new EmailService(emailServiceConfig);

    await emailService.sendLogsFromFileSystem('test');

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [
        { filename: "logs-low.log",    path: "logs/logs-low.log", },
        { filename: "logs-medium.log", path: "logs/logs-medium.log", },
        { filename: "logs-high.log",    path: "logs/logs-high.log", },
      ],
      html: expect.any(String),
      subject: expect.any(String),
      to: "test",
    });
  });

  // se espera que se lance un error en caso de no enviarse el correo
  test('should an error for email unsend', async () => {
    const mockSenMailError = jest.fn().mockReturnValue({
      rejected: ['test error']
    });

    nodeMailer.createTransport = jest.fn().mockReturnValue({
      sendMail: mockSenMailError,
    });

    const sendMailOptions = {to: 'errorTest', subject: 'errorTest', htmlBody: '<a>ERROR-TEST</a>'};
    const emailService: EmailService = new EmailService(emailServiceConfig);

    try {
      await emailService.send(sendMailOptions);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(`${error}`).toContain('Send email rejected');
    }
  });

});