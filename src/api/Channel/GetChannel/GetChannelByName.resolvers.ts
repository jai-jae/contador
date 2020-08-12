import {
    QueryGetChannelByNameArgs,
    GetChannelByNameResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";


const resolvers: Resolvers = {
    Query: {
        GetChannelByName: async (_, args: QueryGetChannelByNameArgs, { req }): Promise<GetChannelByNameResponse> => {
            try {
                return {
                    ok: true,
                    error: null,
                    channel: null
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    channel: null
                }
            }
        }
    }
};

export default resolvers;