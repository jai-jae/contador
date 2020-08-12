import { ConnectionOptions } from "typeorm";


const dbConnOptions: ConnectionOptions = {
   type: "postgres",
   database: "contador",
   synchronize: true,
   logging: true,
   entities: ["src/entities/**/*.ts"],
   host: process.env.DB_ENDPOINT || "localhost",
   port: 5432,
   username: process.env.DB_USERNAME || "jai",
   password: process.env.DB_PASSWORD || ""
};

export default dbConnOptions;