import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from "react";
import {
    SUBSCRIBE_TO_MESSAGES,
    GET_MESSAGE_FROM_CHANNEL
} from "./Queries";
import MyForm from "./SubmitForm";
import "./Channel.css";

const MessageList = ({ subscribeToNewMessages,data,loading }) => {
    const LastMessageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        subscribeToNewMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const scrollToBottom = () => {
        LastMessageRef?.current?.scrollIntoView({ behavior: "auto" });
    };

    if (!data || loading) {
        return <p>loading...</p>
    }
    const messages = data.GetMessageFromChannel.messages;

    return (
        <div className="messagesWrapper">
          { messages.map(message => (
                <span key={message.id}>
                    {message.sender.username} : {message.content}
                </span>
          )) }
          <div ref={ LastMessageRef } />
        </div>
      );
}

const handleNewMessage = (subscribeToMore) => {
    subscribeToMore({
        document: SUBSCRIBE_TO_MESSAGES,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
                return prev;
            }
            const newMessage = subscriptionData.data.MessageSubscription;
            const newObject = Object.assign({}, prev, {
                GetMessageFromChannel: {
                    ...prev.GetMessageFromChannel,
                    messages: [
                        ...prev.GetMessageFromChannel.messages,
                        newMessage,
                    ]
                }
            });
            return newObject;
        }
    })
};

export const App = () => {
    const { subscribeToMore, loading, data } = useQuery(GET_MESSAGE_FROM_CHANNEL,
        { variables: { channelId: 8 } }); // channelId must come from userState props!!!
    return (
        <div className="App">
            <MessageList
                    data={ data }
                    loading={ loading }
                    subscribeToNewMessages={ () => handleNewMessage(subscribeToMore) }
            />
            <MyForm />
        </div>
  );
}

export default App;