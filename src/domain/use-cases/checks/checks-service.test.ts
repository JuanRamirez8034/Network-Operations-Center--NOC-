import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositiry";
import { CheckService } from "./checks-service";


describe('checks-service.test.ts', () => {

  const mockLogRepository : LogRepository = {
    getLogs : jest.fn(),
    saveLog: jest.fn(),
  };

  const errorCb   = jest.fn();
  const successCb = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  // se debe haber llamado las funciones de exito correspondiente y se espera un true como respuesta
  test('should call success function and return true', async () => {
    const checksService : CheckService = new CheckService(mockLogRepository, successCb, errorCb);
    const serviceIsOk = await checksService.execute('https://google.com');
    
    expect(serviceIsOk).toBeTruthy();
    expect(successCb).toHaveBeenCalled();
    expect(errorCb).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  // se debe haber llamado las funciones de error correspondiente y se espera un falso como respuesta
  test('should call error function and return false', async () => {
    
    global.fetch = jest.fn().mockReturnValue(false);
    const checksService : CheckService = new CheckService(mockLogRepository, successCb, errorCb);
    const serviceIsOk = await checksService.execute('faild Address');
    
    expect(serviceIsOk).toBeFalsy();
    expect(successCb).not.toHaveBeenCalled();
    expect(errorCb).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });
});