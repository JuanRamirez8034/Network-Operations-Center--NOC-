import 'dotenv/config';
import * as env from 'env-var';

interface EvnConfig {
  PORT             : number;
  MAILER_SERVICE   : string;
  MAILER_EMAIL     : string;
  MAILER_SECRET_KEY: string;
  PRODUCTION       : boolean;
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
};