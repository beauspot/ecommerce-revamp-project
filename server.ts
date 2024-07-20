import { EcomApp } from "./app";
import logger from "./api/utils/logger";

(() => {
  try {
    const app = new EcomApp();
    app.listen();
  } catch (err: Error | any) {
    logger.error(err.message);
    process.exit(1);
  }
})();
