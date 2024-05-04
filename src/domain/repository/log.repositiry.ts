import { LogEntity, SeverityLevel } from '../entities/log.entity';

/**
 * Clase abstracta correspondiente a las reglas de negocio que deben seguir las implementaciones del Repositorio para los Logs
 */
export abstract class LogRepository {
  abstract saveLog( log: LogEntity ): Promise<void>;
  abstract getLogs( severityLevel: SeverityLevel ): Promise<Array<LogEntity>>;
}