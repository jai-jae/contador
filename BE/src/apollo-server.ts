import {ApolloServer} from 'apollo-server-express';
import schema from "./schema";
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import redisConfig from "./redisConfig";
import { Config } from "apollo-server-express"
import decodeJWT from "./utils/decodeJWT";


const wsJWTAuth = async (connectionParams) => {
    const token = connectionParams["X-JWT"];
    if (token) {
        const user = await decodeJWT(token);
        if (user) {
            return {
                currentUser: user
            };
        } else {
            return {
                currentUser: undefined
            };
        }
    } else {
        throw new Error("No JWT. Not authorized");
    }
};

const serverOptions: Config = {
    subscriptions: {
        path: "/subscription",
        onConnect: wsJWTAuth
    },
    introspection: true,
    playground: true,
}

class Server {
    public pubSub: any;
    public server: ApolloServer;
    constructor() {
        this.pubSub = new RedisPubSub({
            publisher: new Redis(redisConfig),
            subscriber: new Redis(redisConfig)
        });
        this.server = new ApolloServer({
            schema: schema,
            context: req => {
                const { connection: { context } = {} } = req;
                return {
                    req: req.req,
                    pubSub: this.pubSub,
                    context: context
                };
            },
            ...serverOptions
        })
    }
}

export default new Server().server;