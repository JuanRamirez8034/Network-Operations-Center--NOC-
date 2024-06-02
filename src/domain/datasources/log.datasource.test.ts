import { describe } from '@jest/globals';
import { LogDataSource } from './log.datasource';
import { LogEntity, SeverityLevel } from '../entities/log.entity';

describe('log.datasource.ts', ()=> {
  // creando implementacion del datasource desde su clase abstracta
  class MockLogDataSource implements LogDataSource {

    private logsEntities:Array<LogEntity> = [];
    
    public async saveLog(log: LogEntity): Promise<void> {
      this.logsEntities.push(log);
    }

    public async getLogs(severityLevel: SeverityLevel): Promise<LogEntity[]> {
      return [...this.logsEntities];
    }
  }

  // progando la clase abstracta 
  test('should test abstract class implementation', async () => {
    const newLogEntity:LogEntity = new LogEntity({level: 'low', message: 'abstract class test', origin: 'log.datasource.test.ts'});
    const mockLogDataSource : MockLogDataSource = new MockLogDataSource();

    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(typeof mockLogDataSource.getLogs).toBe('function');
    
    await mockLogDataSource.saveLog(newLogEntity);
    const logs = await mockLogDataSource.getLogs('low');
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs[0].level).toEqual(newLogEntity.level);
    expect(logs[0].origin).toEqual(newLogEntity.origin);
    expect(logs[0].message).toEqual(newLogEntity.message);
    expect(logs[0].createdAt).toBeInstanceOf(Date);
  });
});