"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_ignit_1 = __importDefault(require("./db/db-ignit"));
const countries_route_1 = __importDefault(require("./routes/countries-route"));
const holidays_route_1 = __importDefault(require("./routes/holidays-route"));
dotenv_1.default.config();
const port = process.env.APP_PORT ? +process.env.APP_PORT : 8080;
const hostname = process.env.APP_HOST || "localhost";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v3", countries_route_1.default, holidays_route_1.default);
db_ignit_1.default
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
