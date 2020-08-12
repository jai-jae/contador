/*
    resolvers type definition
    Resolvers must follow the exact same type, and name of the graphQL query.
    Resolver must contain exactly same property as the graphQL query.
    ex)
    HelloWorld.graphql
    type HelloWorldResponse {
        text: String!
        error: Boolean!
    }
    type Query {
        HelloWorld: HelloWorldResponse!
    }

    HelloWorld.resolvers.ts
    resolvers: Resolver = {
        [Query | Mutation | Subscription | Input]: {
            HelloWord: async (parent, args, context, info): Promise<QueryResponseObj> => {
                logic...
                ...
                ...
                return {
                    text: random_string,
                    error: true || false
                };
            }
        };
    }

*/

export type Resolver = (parent: any, args: any, context: any, info: any) => function;

export type Resolvers = {
    // GraphQL - Query or Mutation
    [key: string]: {
        // name of Query or Mutation
        [key: string]: Resolver;
    };
}