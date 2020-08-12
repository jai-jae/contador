import { Resolvers } from "../../../types/resolvers";
import {
    ResponseGetChannel
} from "../../../types/graphql";
import Channel from "../../../entities/Channel";


const resolvers: Resolvers = {
    Query: {
        GetChannel: async (_, args, { req }): Promise<ResponseGetChannel> => {
            try {
                const channel = await Channel.findOne({id: 1}, {relations:["messages"]});
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