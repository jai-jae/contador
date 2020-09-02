import {
    mergeTypeDefs,
    mergeResolvers,
} from "@graphql-tools/merge";
import { GraphQLSchema } from "graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";


const allGraphQLTypes: GraphQLSchema[] = loadFilesSync(
    path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers: any[] = loadFilesSync(
    path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypeDefs = mergeTypeDefs(allGraphQLTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers
});

export default schema;