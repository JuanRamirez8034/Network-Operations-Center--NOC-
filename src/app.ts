import { ServerApp } from "./presentation/server";

(async() => {
  main();
})();

/**
 * Metodo principal de la aplicacion
 */
function main  () {
  ServerApp.start();
}