import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log.repository.implementation";


describe('log.repository.implementation.test.ts', () => {

  const mockDatasource : LogDataSource = {
    getLogs: jest.fn().mockReturnValue([]),
    saveLog: jest.fn(async () => {}),
  };
  const testLogEntity : LogEntity = new LogEntity({level: 'low', message: 'test log repository implementation', origin: 'log.repository.implementation.test.tsfileSystem-log.datasource.test'});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // se espera que se llame el metodo de guardar log con la data respectiva
  test('should called saveLog method from datasource', async () => {
    const logRepImplementation: LogRepositoryImplementation = new LogRepositoryImplementation(mockDatasource);
    
    await logRepImplementation.saveLog(testLogEntity);

    expect(logRepImplementation).toBeInstanceOf(LogRepositoryImplementation);
    expect(mockDatasource.saveLog).toHaveBeenCalledTimes(1);
    expect(mockDatasource.saveLog).toHaveBeenCalledWith(testLogEntity);
  });

  // se espera que se llame el metodo getLogs
  test('should called getLogs method from datasource', async () => {
    const logRepImplementation: LogRepositoryImplementation = new LogRepositoryImplementation(mockDatasource);

    const logs: LogEntity[] = await logRepImplementation.getLogs('low');

    expect(mockDatasource.getLogs).toHaveBeenCalledTimes(1);
    expect(mockDatasource.getLogs).toHaveBeenCalledWith('low');
    expect(logs).toEqual([]);
  });
});