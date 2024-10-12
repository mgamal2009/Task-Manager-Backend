import app from "./app";
import "reflect-metadata";
import {AppDataSource} from "./database/dataSource";

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.log(err));

