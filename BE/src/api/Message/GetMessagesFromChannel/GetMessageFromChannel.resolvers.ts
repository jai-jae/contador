import { Resolvers } from "../../../types/resolvers";
import {
    QueryGetMessageFromChannelArgs,
    GetMessageFromChannelResponse
} from "../../../types/graphql";
import Message from "../../../entities/Message";


const resolvers: Resolvers = {
    Query: {
        GetMessageFromChannel: async (_, args: QueryGetMessageFromChannelArgs, { req }): Promise<GetMessageFromChannelResponse> => {
            try {
                const { channelId } = args;
                const messages = await Message.createQueryBuilder("message")
                                        .innerJoinAndSelect("message.sender", "user", "message.senderId=user.id")
                                        .where(`message.channelId = ${channelId}`)
                                        .getMany()
                return {
                    ok: true,
                    messages: messages,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    messages: null,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;