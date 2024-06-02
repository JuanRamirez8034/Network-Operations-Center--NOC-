import { describe, test, expect, jest } from '@jest/globals';
import { envConfig } from './env.plugin';


describe('env.plugin.ts', () => {

  // debemos obtener las variables de entorno de testing deseadas
  test('Should return env option types values', () => {
    expect(typeof envConfig.MAILER_EMAIL).toEqual('string');
    expect(typeof envConfig.MAILER_SECRET_KEY).toEqual('string');
    expect(typeof envConfig.MAILER_SERVICE).toEqual('string');
    expect(typeof envConfig.MONGO_DB_NAME).toEqual('string');
    expect(typeof envConfig.MONGO_PASSWORD).toEqual('string');
    expect(typeof envConfig.MONGO_URL).toEqual('string');
    expect(typeof envConfig.MONGO_USER).toEqual('string');
    expect(typeof envConfig.PORT).toEqual('number');
    expect(typeof envConfig.PRODUCTION).toEqual('boolean');
  });

  // validando si existe un error por valor requerido
  test('Should return an error value required', async () => {
    jest.resetModules();
    process.env.MAILER_EMAIL = undefined;
    try {
      await import('./env.plugin');
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain('EnvVarError: env-var: "MAILER_EMAIL"');
    }
  });
});