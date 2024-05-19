import { env } from "./config/plugins";
import { MongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/server";

(async() => {
  main();
})();

/**
 * Metodo principal de la aplicacion
 */
async function main  () {
  // conectar base de datos
  await MongoDataBase.connect({
    dbName: env.MONGO_DB_NAME,
    url   : env.MONGO_URL,
  });
  
  ServerApp.start();
}