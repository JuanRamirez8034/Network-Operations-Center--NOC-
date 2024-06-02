import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositiry";
import { EmailSendLogs } from "./email-send-logs";



describe('email-send-logs.test.ts', () => {

  const mockLogRepository : LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  const mockEmailService  = {
    sendLogsFromFileSystem: jest.fn().mockReturnValue(true),
  };

  
  afterEach(() => {
    jest.resetAllMocks();
  });
  
  // se espera que retorne verdadero despues de enviar el email
  test('should return true after send email', async () => {
    const emailSendLogs : EmailSendLogs = new EmailSendLogs(mockLogRepository, mockEmailService as any);
    const result : boolean = await emailSendLogs.excecute('test@fakeemail.test');
    
    expect(emailSendLogs).toBeInstanceOf(EmailSendLogs);
    expect(result).toBeTruthy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Send email logs success",
      origin: "[use case] email-send-logs.ts",
    });

  });
  
  // se espera que retorne falso 
  test('should return false after tryed send email', async () => {
    mockEmailService.sendLogsFromFileSystem.mockReturnValue(false);
    const emailSendLogs : EmailSendLogs = new EmailSendLogs(mockLogRepository, mockEmailService as any);
    const result : boolean = await emailSendLogs.excecute('test@fakeemail.test');
    
    expect(emailSendLogs).toBeInstanceOf(EmailSendLogs);
    expect(result).toBeFalsy();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Send logs failled",
      origin: "[use case] email-send-logs.ts",
    });

  });
});