import {MutationCreateChannelArgs, CreateChannelResponse} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import Channel from "../../../entities/Channel";
import User from "../../../entities/User";


const resolvers: Resolvers = {
    Mutation: {
        CreateChannel: async (_, args: MutationCreateChannelArgs, { req }): Promise<CreateChannelResponse> => {
            const {name, shared, userId} = args;
            console.log(name, shared, userId)
            try {
                // logic to create channel
                const requester = req.currentUser;
                const requested = await User.findOne({id:userId})
                await Channel.create({name: name, users: [requester, requested], shared: shared}).save()
                return {
                    ok: true,
                    error: null
                }
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