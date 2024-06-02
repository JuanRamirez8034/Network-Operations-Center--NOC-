import { MongoDataBase } from './init';
import mongoose from 'mongoose';



describe('mongo/init.ts', ()=> {

  afterAll(() =>{ 
    jest.resetAllMocks();
    mongoose.connection.close();
  });

  // se espera que se establezca la conexion a la base de datos
  test('should connected to MongoDB', async () => {
    const logMok = jest.fn();
    console.log = logMok;
    const con = await MongoDataBase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      url: process.env.MONGO_URL!,
    });
    expect(logMok).toHaveBeenCalledWith('Mongo DataBase connected!');
    expect(con).toBeTruthy();
  });

  // se espera que se rechace la conexion a la base de datos
  test('should connected error to MongoDB', async () => {
    const logMok = jest.fn();
    console.error = logMok;
    try {
      await MongoDataBase.connect({
        dbName: 'test',
        url: 'test',
      });
      expect(false).toBeTruthy();
    } catch (error) {
      expect(logMok).toHaveBeenCalledWith('Mongo DataBase connection error');
    }
  });

  test('should disconected to MongoDB', async () => {
    const closeConnectionSpy = jest.spyOn(mongoose.connection, 'close');
    await MongoDataBase.disconnect(false);
    expect(closeConnectionSpy).toHaveBeenCalledWith(false)
    closeConnectionSpy.mockRestore();
  })
})