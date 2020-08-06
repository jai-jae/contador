import { GraphQLServer, PubSub } from "graphql-yoga";
import {Response, NextFunction} from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/DecodeJWT"


class App {
    public pubSub: any;
    public app: GraphQLServer;
    constructor() {
        this.pubSub = new PubSub();
        this.app = new GraphQLServer({
            schema: schema,
            context: req => {
                const { connection: { context } = {} } = req;
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    context: context
                };
            }
        });
        this.ActivateMiddlewares();
    }
    private ActivateMiddlewares = () => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
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
 
export default new App().app;