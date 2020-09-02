import { withFilter } from "apollo-server-express";
import User from "../../../entities/User";
import Channel from "../../../entities/Channel";
import Member from "../../../entities/Member";


const messageFilter = async (payload, _, { context }): Promise<boolean> => {
    const user: User = context.currentUser;
    const channelId = payload.MessageSubscription.channelId;
    try {
        const channel: Promise<Channel | undefined> = Channel.findOne({id: channelId})
        const member: Promise<Member[]> = Member.createQueryBuilder("member")
                                .select()
                                .where(`member.channelId=8 AND member.userId=${user.id}`)
                                .getMany()
        await Promise.all([channel, member])
        if (member)
            return true;
        return false;
    } catch (error) {
        return false;
    }
}

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("newChannelMessage"), messageFilter
            )
        }
    }
};
  
export default resolvers;