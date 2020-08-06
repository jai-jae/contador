import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Channel from "../../../entities/Channel";


const MessageFilter = async (payload, _, { context }) => {
    const user: User = context.currentUser;
    const {
    MessageSubscription: { channelId }
    } = payload;
    console.log("channel ID : ", channelId, "\n\n")
    console.log('payload : ', payload, '\n\n')
    console.log(user)
    try {
        const channel = await Channel.findOne({id: channelId}, {relations: ["users"]})
        console.log("channel db qery: ", channel)
        return true;
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