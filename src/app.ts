import express from "express";
import dotenv from "dotenv";
import connection from "./db/db-ignit";
import countriesRoute from "./routes/countries-route";
import holidaysRoute from "./routes/holidays-route";

dotenv.config();

const port = process.env.APP_PORT ? +process.env.APP_PORT : 8080;
const hostname = process.env.APP_HOST || "localhost";

const app = express();

app.use(express.json());
app.use("/api/v3", countriesRoute, holidaysRoute);

connection
  .ping()
  .then(() => {
    console.log("Connected to database");
    app.listen(port, hostname, (err) => {
      if (err) {
        console.error("Failed to start server");
        return;
      }

      console.log(`Server started at http://${hostname}:${port}...`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
  });
