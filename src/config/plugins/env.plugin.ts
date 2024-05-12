import 'dotenv/config';
import * as env from 'env-var';

interface EvnConfig {
  PORT             : number;
  MAILER_SERVICE   : string;
  MAILER_EMAIL     : string;
  MAILER_SECRET_KEY: string;
  PRODUCTION       : boolean;
  MONGO_URL        : string;
  MONGO_DB_NAME    : string;
  MONGO_USER       : string;
  MONGO_PASSWORD       : string;
}

/**
 * Configuracion de variables de entorno
 */
export const envConfig : EvnConfig = {
  PORT              : env.get('PORT').required().asPortNumber(),
  MAILER_SERVICE    : env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL      : env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY : env.get('MAILER_SECRET_KEY').required().asString(),
  PRODUCTION        : env.get('PRODUCTION').required().asBool(),
  MONGO_URL         : env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME     : env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER        : env.get('MONGO_USER').required().asString(),
  MONGO_PASSWORD    : env.get('MONGO_PASSWORD').required().asString(),
};