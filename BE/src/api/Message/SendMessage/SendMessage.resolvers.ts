import { Resolvers } from "../../../types/resolvers";
import {MutationSendMessageArgs, SendMessageResponse} from "../../../types/graphql";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
    Mutation: {
        SendMessage: async (_, args: MutationSendMessageArgs, { req, pubSub }): Promise<SendMessageResponse> => {
            const { currentUser } = req;
            try {
                const message = await Message.create({ ...args, sender: currentUser }).save();
                pubSub.publish("newChannelMessage", { MessageSubscription: message });
                return {
                    ok: true,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;