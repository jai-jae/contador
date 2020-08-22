import { Resolvers } from "../../../types/resolvers";
import {
    QueryGetChannelByIdArgs,
    ResponseGetChannelById
} from "../../../types/graphql";
import Channel from "../../../entities/Channel";


const resolvers: Resolvers = {
    Query: {
        GetChannelById: async (_, args: QueryGetChannelByIdArgs, { req }): Promise<ResponseGetChannelById> => {
            try {
                const channel = await Channel.findOne({id: args.channelId});
                return {
                    ok: true,
                    error: null,
                    channel: channel
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    channel: null
                };
            }
        }
    }
};

export default resolvers;