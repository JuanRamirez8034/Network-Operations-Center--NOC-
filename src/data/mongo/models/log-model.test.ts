import { MongoDataBase } from '../init';
import { env } from '../../../config/plugins';
import { LogEntityOptions } from '../../../domain/entities/log.entity';
import { LogModel } from './log-model';
import mongoose from 'mongoose';


describe('log.model.ts', () => {

  beforeAll(async () => {
    await MongoDataBase.connect({
      dbName: env.MONGO_DB_NAME,
      url: env.MONGO_URL,
    });
  });

  afterAll(async () => {
    await MongoDataBase.disconnect();
  });
  
  // se espera que se pueda registar en la base de datos el log y regrese un objeto de log valido
  test('should return a LogModel object', async () => {
    const logData: LogEntityOptions = {
      message: 'Test message',
      origin: 'log-model.test.ts',
      level: 'low',
    };

    const logEntityObject = await LogModel.create(logData);

    expect(logEntityObject).toEqual(
      expect.objectContaining({
        ...logData,
        _id: expect.any(mongoose.Types.ObjectId),
        createdAt: expect.any(Date),
      }),
    );

    await LogModel.findById(logEntityObject._id);
    
  });

  // se espera que la configuracion del esque contenga lo siguiente
  test('should schema object containing a configuratin', async () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(expect.objectContaining({
      createdAt: { type: expect.any(Function), default: expect.any(Date) },
      level: {
        type: expect.any(Function),
        enum: [ 'low', 'medium', 'high' ],
        required: true
      },
      message: { type: expect.any(Function), required: true },
      origin: { type: expect.any(Function), required: true }
    }));
    
  });

});