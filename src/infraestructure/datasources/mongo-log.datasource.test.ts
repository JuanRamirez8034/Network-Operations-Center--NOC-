import { env } from "../../config/plugins";
import { LogModel, MongoDataBase } from "../../data/mongo";
import { LogEntity } from "../../domain/entities/log.entity";
import { MongoLogDataSource } from "./mongo-log.datasource";



describe('mongo-log.datasource.test.ts', () => {
  // instancias
  const mongoLogDataSource: MongoLogDataSource = new MongoLogDataSource();
  const testLogEntity : LogEntity = new LogEntity({level: 'low', message: 'test mongo log data source', origin: 'mongo-log.datasource.test'});

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  beforeAll(async () => {
    await MongoDataBase.connect({
      dbName: env.MONGO_DB_NAME,
      url   : env.MONGO_URL,
    });
  });

  afterAll(async () => {
    await MongoDataBase.disconnect();
  });
  
  
  // se espera que realice el guardado del log
  test('should saved logEntity in mongo db', async () => {
    const spyLogModelCreate = jest.spyOn(LogModel, 'create');
    await mongoLogDataSource.saveLog(testLogEntity);
    expect(mongoLogDataSource).toBeInstanceOf(MongoLogDataSource);
    expect(spyLogModelCreate).toHaveBeenCalled();
  });

  // se espera que realice la busqueda de logs a patir del nivel de severidad
  test('should get logEntity array in mongo db', async () => {
    await mongoLogDataSource.saveLog(testLogEntity);
    await mongoLogDataSource.saveLog(testLogEntity);
    const result: LogEntity[] = await mongoLogDataSource.getLogs('low');
    
        
    expect(mongoLogDataSource).toBeInstanceOf(MongoLogDataSource);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(LogEntity);
    
  });
});