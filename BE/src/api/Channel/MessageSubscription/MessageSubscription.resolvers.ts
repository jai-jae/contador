import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Channel from "../../../entities/Channel";


/*
    it needs optimization
    all userIds inside the channel is UNIQUE
*/

function isUserValid(users: User[], user: User): boolean {
    const userId = user.id;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            return true;
        }
    }
    return false;
}

const MessageFilter = async (payload, _, { context }): Promise<boolean> => {
    const user: User = context.currentUser;
    const channelId = payload.MessageSubscription.channelId;
    try {
        const channel: Promise<Channel | undefined> = Channel.findOne({id: channelId})
        const users: Promise<User[]> = User.createQueryBuilder("user")
                                .select("user.id")
                                .innerJoin("user.channels", "channel", "channel.id = 1")
                                .getMany();
        const results = await Promise.all([channel, users])
        if (isUserValid(results[1], user)) {
            return true;
        };
        return false;
    } catch(error) {
        return false;
    }
}

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("newChannelMessage"), MessageFilter)
        }
    }
};
  
export default resolvers;