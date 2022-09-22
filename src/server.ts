import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Servidor online");
    })
    .catch((err) => {
      console.log("Error during Data Source initialization", err);
    });

  app.listen(3000, () => console.log("Running at http://localhost:3000"));
})();
