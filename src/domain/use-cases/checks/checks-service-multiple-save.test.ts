import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repositiry";
import { CheckServiceMultipleSave } from "./checks-service-multiple-save";


describe('checks-service-multiple-save.test.ts', () => {


  const mockLogRepository1: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  const mockLogRepository2: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  const mockLogRepository3: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  };

  const errorCb = jest.fn();
  const successCb = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });


  // se debe haber llamado las funciones de exito correspondiente y se espera un true como respuesta
  test('should call success functions from all repositories and return true', async () => {
    const checksService: CheckServiceMultipleSave = new CheckServiceMultipleSave([mockLogRepository1, mockLogRepository2, mockLogRepository3], successCb, errorCb);
    const serviceIsOk = await checksService.execute('https://google.com');

    expect(serviceIsOk).toBeTruthy();
    expect(successCb).toHaveBeenCalled();
    expect(errorCb).not.toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  // se debe haber llamado las funciones de error correspondiente y se espera un falso como respuesta
  test('should call error function and return false', async () => {
        
    global.fetch = jest.fn().mockReturnValue(false);
    const checksService: CheckServiceMultipleSave = new CheckServiceMultipleSave([mockLogRepository1, mockLogRepository2, mockLogRepository3], successCb, errorCb);
    const serviceIsOk = await checksService.execute('faild Address');

    expect(serviceIsOk).toBeFalsy();
    expect(successCb).not.toHaveBeenCalled();
    expect(errorCb).toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

  });

  // se debe haber llamado las funciones de exito correspondiente y se espera un true como respuesta
  test('should an error for repositories length equal to 0', async () => {
    try {
      new CheckServiceMultipleSave([], successCb, errorCb);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(`${error}`).toContain('[check-service-multiple-save] The use case requires at least one LogEntity to function properly');
    }
  });
});