import dotenv from "dotenv";
dotenv.config({path: "src/.env"});

import server from "./apollo-server";
import { createConnection } from "typeorm";
import dbConnOptions from "./ormconfig";
import decodeJWT from "./utils/decodeJWT";
import { createServer } from "http"
import express, {Response, NextFunction} from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
const PORT: number | string = 4242;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";


class ExpressApp {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.activateMiddlewares();
    }
    private activateMiddlewares = () => {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(logger('dev'));
        this.app.use(this.jwt);
    }
    private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
        const token = req.get("X-JWT");
        if (token) {
            const user = await decodeJWT(token);
            if (user) {
                req.currentUser = user;
            } else {
                req.currentUser = undefined;
            }
        }
        next();
    };
}



const app = new ExpressApp().app;

server.applyMiddleware({ app, path: GRAPHQL_ENDPOINT });
server.applyMiddleware({ app, path: SUBSCRIPTION_ENDPOINT });
server.applyMiddleware({ app, path: PLAYGROUND_ENDPOINT });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);


const errLogger = function(err) {
    console.log(err)
}

const run = async () => {
    try {
        await createConnection(dbConnOptions);
    } catch(err) {
        errLogger(err);
        return; 
    }
    try {
        httpServer.listen(
            { port: PORT },
            (): void => console.log(`server Start`)
          );
    } catch(err) {
        errLogger(err);
        return;
    }
};
// app.start(appOptions, handler);

run();