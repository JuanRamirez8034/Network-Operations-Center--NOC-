import { PrismaClient } from '@prisma/client';
import { LogEntity, LogEntityOptions } from '../../domain/entities/log.entity';
import { PostgresLogDataSource } from './postgres-log.datasource';



describe('postgres-log.datasource.test.ts', () => {

  const postgresLogDataSource: PostgresLogDataSource = new PostgresLogDataSource();
  const logObject : LogEntityOptions = {level: 'low', message: 'test mongo log data source', origin: 'postgres-log.datasource.test'};
  const testLogEntity : LogEntity = new LogEntity(logObject);
  const pristaClient = new PrismaClient();

  beforeEach(async () => {
    await pristaClient.logModel.deleteMany();
  });

  // se espera que el log se guarde en la base de datos
  test('should saved logEntity in postgres db', async () => {
    await postgresLogDataSource.saveLog(testLogEntity);
    const result: LogEntity[] = await pristaClient.logModel.findMany({where: {message: testLogEntity.message}});

    expect(postgresLogDataSource).toBeInstanceOf(PostgresLogDataSource);
    expect(result).toContainEqual(
      {
        ...logObject,
        id: expect.any(Number),
        createdAt: expect.any(Date),
      }
    );
  });


  // se espera obtener los logs desde la base de datos
  test('should saved logEntity in postgres db', async () => {
    await postgresLogDataSource.saveLog(testLogEntity);
    const result: LogEntity[] = await postgresLogDataSource.getLogs('low');

    expect(result[0]).toBeInstanceOf(LogEntity);
    expect(result[0].message).toEqual(testLogEntity.message);
    expect(result[0].origin).toEqual(testLogEntity.origin);
    expect(result[0].createdAt).toEqual(testLogEntity.createdAt);
    expect(result[0].level).toEqual(testLogEntity.level);

  });




});