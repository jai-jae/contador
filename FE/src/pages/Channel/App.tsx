import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from "react";
import {
    SUBSCRIBE_TO_MESSAGES,
    GET_MESSAGE_FROM_CHANNEL
} from "./Queries";
import MyForm from "./SubmitForm";
import "./Channel.css";


interface Message {
    id: number;
    content: string;
    createdAt: number;
    sender: {
        username: string;
    };
}

interface MessageData {
    GetMessageFromChannel: {
        messages: Message[]
    }
}

interface GetMessageFromChannelVars {
    channelId: number;
}

interface IMessageListProps {
    data?: MessageData;
    loading: boolean;
    subscribeToNewMessages: () => void;

}

const MessageList = ({ subscribeToNewMessages, data, loading }: IMessageListProps) => {
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
    // channelId must come from userState props!!!
    const { data, subscribeToMore, loading } =
        useQuery<MessageData, GetMessageFromChannelVars>(GET_MESSAGE_FROM_CHANNEL, { variables:{ channelId: 8 } });
    const subscriptionHandler = () => handleNewMessage(subscribeToMore);
    return (
        <div className="App">
            <MessageList
                    data={ data }
                    loading={ loading }
                    subscribeToNewMessages={ subscriptionHandler }
            />
            <MyForm />
        </div>
  );
}

export default App;