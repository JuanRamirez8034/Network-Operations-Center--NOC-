import { LogEntity, LogEntityOptions } from "./log.entity";


describe('log.entity.ts', () => {

  // evaluar intancias de log entity
  test('should logEntity math instance object', ()=>{
    const objLog : LogEntityOptions = {
      level: 'low',
      message: 'log entity test',
      origin: 'log.entity.test.ts',
    };
    const newLogEntity : LogEntity = new LogEntity(objLog);
    // pruebas respectivas
    expect(newLogEntity).toBeInstanceOf(LogEntity);
    expect(newLogEntity.origin).toBe(objLog.origin);
    expect(newLogEntity.level).toBe(objLog.level);
    expect(newLogEntity.message).toBe(objLog.message);
    expect(newLogEntity.createdAt).toBeInstanceOf(Date);
  });

  // evaluar metodo creacion de a partir de string json
  test('should logEntity from string as json', () => {
    const stringJson : string = `{"createdAt":"2024-05-22T01:15:00.747Z","level":"low","message":"Test LogEntity from json","origin":"[log.entity.test.ts]"}`;
    const newLogEntity: LogEntity = LogEntity.jsonAsLogEntity(stringJson);
    // pruebas respectivas
    expect(newLogEntity).toBeInstanceOf(LogEntity);
    expect(newLogEntity.origin).toBe("[log.entity.test.ts]");
    expect(newLogEntity.level).toBe("low");
    expect(newLogEntity.message).toBe("Test LogEntity from json");
    expect(newLogEntity.createdAt).toBeInstanceOf(Date);
  });

  // evaluar metodo creacion de a partir de string json retorne un error
  test('should error at logEntity from string as json', () => {
    // falta el elemento de fecha, esto causara error
    const stringJson : string = `{"level":"low","message":"Test LogEntity from json","origin":"[log.entity.test.ts]"}`; 

    try {
      LogEntity.jsonAsLogEntity(stringJson);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(`${error}`).toContain('[jsonAsLogEntity] json format is not valid');
    }
    
  });

  // evaluar metodo creacion de a partir de un objeto
  test('should logEntity from object', () => {
    const objLog : LogEntityOptions = {
      level: 'low',
      message: 'log entity test',
      origin: 'log.entity.test.ts',
      createdAt: new Date(),
    };
    const newLogEntity : LogEntity = LogEntity.fromObjectAsLogEntity(objLog);
    // pruebas respectivas
    expect(newLogEntity).toBeInstanceOf(LogEntity);
    expect(newLogEntity.origin).toBe(objLog.origin);
    expect(newLogEntity.level).toBe(objLog.level);
    expect(newLogEntity.message).toBe(objLog.message);
    expect(newLogEntity.createdAt).toBeInstanceOf(Date);
  });

  // evaluar metodo creacion de a partir de un objeto retorne un error
  test('should error at logEntity from object', () => {
    const objLog : LogEntityOptions = {
      level: 'low',
      message: 'log entity test',
      origin: 'log.entity.test.ts',
      // createdAt: new Date(), // esto deberia ser sufucuente para crear el error ya que falta la propiedad
    };

    try {
      LogEntity.fromObjectAsLogEntity(objLog);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(`${error}`).toContain('[fromObjectAsLogEntity] object undefined properties');
    }
    
  });

});