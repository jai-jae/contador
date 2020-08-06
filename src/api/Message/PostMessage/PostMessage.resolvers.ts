import { Resolvers } from "../../../types/resolvers";
import {MutationPostMessageArgs, PostMessageResponse} from "../../../types/graphql";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
    Mutation: {
        PostMessage: async (_, args: MutationPostMessageArgs, { req, pubSub }): Promise<PostMessageResponse> => {
            const { currentUser } = req;
            try {
                const message = await Message.create({ ...args, senderId: currentUser.id }).save();
                pubSub.publish("newChannelMessage", { MessageSubscription: message });
                return {
                    ok: true,
                    message: message,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    message: null,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;