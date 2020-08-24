import {MutationCreateChannelArgs, CreateChannelResponse} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import Channel from "../../../entities/Channel";
import Member from "../../../entities/Member";


const resolvers: Resolvers = {
    Mutation: {
        CreateChannel: async (_, args: MutationCreateChannelArgs, { req }): Promise<CreateChannelResponse> => {
            const {name, shared} = args;
            try {
                // logic to create channel
                // 1. check if use is logged in <<middleware>>
                // 2. check if the same channel name exist
                const requester = req.currentUser;
                const channel = await Channel.create({ name: name, shared: shared }).save()
                if (channel) {
                    const member = await Member.create({ channelId: channel.id, user: requester, kind: "OWNER" }).save()
                    if (member) {
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "failed to create owner!"
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "failed to create channel!"
                    };
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