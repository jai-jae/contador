const CHANNEL_LIST_UPDATE = "ChannelListUpdate";

const resolvers = {
    Subscription: {
        ChannelSubscription: {
            subscribe: (_, __, { pubSub }) => {
                return pubSub.asyncIterator(CHANNEL_LIST_UPDATE)
            }
        }
    }
};

export default resolvers;