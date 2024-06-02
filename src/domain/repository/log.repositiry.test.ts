import { LogEntity, SeverityLevel } from "../entities/log.entity";
import { LogRepository } from "./log.repositiry";


describe('log.repository.test.ts', () => {

  const newLogEntity : LogEntity = new LogEntity({level: 'low', message: 'test log repository', origin: 'log.repository.test'});

  class MockLogRepository implements LogRepository {

    private logEntities : Array<LogEntity> = [];
    
    public async saveLog(log: LogEntity): Promise<void> {
      this.logEntities.push(log)
    }
    
    public async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
      return[...this.logEntities];
    }

  }

  // comprobar instancias
  test('should class instance from abstract class', async () => {
    const mockLogRepository : MockLogRepository = new MockLogRepository();

    expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
    expect(typeof mockLogRepository.getLogs).toBe('function');
    expect(typeof mockLogRepository.saveLog).toBe('function');

    await mockLogRepository.saveLog(newLogEntity);
    const logs = await mockLogRepository.getLogs('low');
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0].level).toEqual(newLogEntity.level);
    expect(logs[0].origin).toEqual(newLogEntity.origin);
    expect(logs[0].message).toEqual(newLogEntity.message);
    expect(logs[0].createdAt).toBeInstanceOf(Date);
  });


});