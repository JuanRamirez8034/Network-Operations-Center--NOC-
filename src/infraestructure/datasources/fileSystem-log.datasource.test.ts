import fs, { readdirSync, rmSync, existsSync, readFileSync } from 'fs';
import { join } from "path";
import { FileSystemLogDatasource } from "./fileSystem-log.datasource";
import { LogEntity } from '../../domain/entities/log.entity';


describe('fileSystem-log.datasource.test.ts', () => {
  const testLogEntity : LogEntity = new LogEntity({level: 'low', message: 'test mongo log data source', origin: 'fileSystem-log.datasource.test'});
  const _path : string = join(__dirname, '../../../logs');
  
  beforeAll(() => {    
    existsSync(_path) && rmSync(_path, {recursive: true});
  });
  
  // se espera que se creen los directorios respectivos
  test('should create dir path if they do not exist', () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const filesNames: string[] = readdirSync(_path);
    
    expect(fsDataSource).toBeInstanceOf(FileSystemLogDatasource);
    expect(filesNames).toEqual([ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ]);
  });
  
  // se espera que guarde el log en low
  test('should saved a new log with severity low', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnAppendFileSync = jest.spyOn(fs, 'appendFileSync');

    await fsDataSource.saveLog(testLogEntity);
    const textLog = readFileSync(join(_path, 'logs-low.log'), {encoding: 'utf-8'});
    
    expect(textLog).toContain(JSON.stringify(testLogEntity));
    expect(spyOnAppendFileSync).toHaveBeenCalledTimes(1);

  });

  // se espera que guarde el log en medium
  test('should saved a new log with severity medium', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnAppendFileSync = jest.spyOn(fs, 'appendFileSync');

    const testLogEntityMedium = new LogEntity({...testLogEntity, level: 'medium'});
    await fsDataSource.saveLog(testLogEntityMedium);
    const textLog = readFileSync(join(_path, 'logs-medium.log'), {encoding: 'utf-8'});
    
    expect(textLog).toContain(JSON.stringify(testLogEntityMedium));
    expect(spyOnAppendFileSync).toHaveBeenCalledTimes(1);

  });

  // se espera que guarde el log en high
  test('should saved a new log with severity high', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnAppendFileSync = jest.spyOn(fs, 'appendFileSync');

    const testLogEntityHigh = new LogEntity({...testLogEntity, level: 'high'});
    await fsDataSource.saveLog(testLogEntityHigh);
    
    const textLog = readFileSync(join(_path, 'logs-high.log'), {encoding: 'utf-8'});
    
    expect(textLog).toContain(JSON.stringify(testLogEntityHigh));
    expect(spyOnAppendFileSync).toHaveBeenCalledTimes(1);

  });

  // se espera poder obtner los log respectivos a partir de un nivel de severidad low
  test('should get logs array from low severity level', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnReadFileSync = jest.spyOn(fs, 'readFileSync');

    await fsDataSource.saveLog(testLogEntity);
    const logs: LogEntity[] = await fsDataSource.getLogs('low');
    
    expect(typeof logs).toBe('object');
    expect(logs.length).not.toBe(0);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(spyOnReadFileSync).toHaveBeenCalledTimes(1);

  });

  // se espera poder obtner los log respectivos a partir de un nivel de severidad medium
  test('should get logs array from medium severity level', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnReadFileSync = jest.spyOn(fs, 'readFileSync');
    const testLogEntityMedium = new LogEntity({...testLogEntity, level: 'medium'});
    
    await fsDataSource.saveLog(testLogEntityMedium);
    const logsMedium: LogEntity[] = await fsDataSource.getLogs('medium');
    
    expect(typeof logsMedium).toBe('object');
    expect(logsMedium.length).not.toBe(0);
    expect(logsMedium[0]).toBeInstanceOf(LogEntity);
    expect(spyOnReadFileSync).toHaveBeenCalledTimes(1);

  });

  // se espera poder obtner los log respectivos a partir de un nivel de severidad high
  test('should get logs array from high severity level', async () => {
    const fsDataSource: FileSystemLogDatasource = new FileSystemLogDatasource();
    const spyOnReadFileSync = jest.spyOn(fs, 'readFileSync');
    const testLogEntityHigh = new LogEntity({...testLogEntity, level: 'high'});
    
    await fsDataSource.saveLog(testLogEntityHigh);
    const logsHigh: LogEntity[] = await fsDataSource.getLogs('high');
    
    expect(typeof logsHigh).toBe('object');
    expect(logsHigh.length).not.toBe(0);
    expect(logsHigh[0]).toBeInstanceOf(LogEntity);
    expect(spyOnReadFileSync).toHaveBeenCalledTimes(1);

  });

});