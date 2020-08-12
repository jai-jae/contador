import {
    MutationJoinChannelArgs,
    JoinChannelResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import Channel from "../../../entities/Channel";
import User from "../../../entities/User";


const resolvers: Resolvers = {
    Mutation: {
        JoinChannel: async (_, args: MutationJoinChannelArgs, { req }): Promise<JoinChannelResponse> => {
            try {
                const {channelId} = args;
                const {currentUser} = req;
                const isMember = await User.createQueryBuilder("user")
                    .innerJoin("user.channels", "channel", `channel.id = ${channelId}`)
                    .where(`user.id = ${currentUser.id}`)
                    .getCount();
                if (isMember) {
                    return {
                        ok: false,
                        error: "you are already member of the channel!"
                    }
                } else {
                    await Channel.createQueryBuilder()
                                    .relation(Channel, "users")
                                    .of(channelId)
                                    .add(currentUser.id);
                    return {
                        ok: true,
                        error: null
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