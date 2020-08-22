import { useQuery } from '@apollo/client';
import React, { useEffect } from "react";
import {
    SUBSCRIBE_TO_MESSAGES,
    GET_MESSAGE_FROM_CHANNEL
} from "./Queries";
import MyForm from "./SubmitForm";


const MessageList = ({ subscribeToNewMessages, loading, data }) => { 
    useEffect(() => {
        subscribeToNewMessages()
    }, [])
    if (!data || loading) {
        return <p>loading...</p>
    }
    const messages = data.GetMessageFromChannel.messages;
    return messages.map(message =>
        <div key={message.id}>
            <p>{message.sender.username}: {message.content}</p>
            <p>--------------------------------------</p>
        </div>
    )
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
        { variables: { channelId: 1 } }) // channelId must come from userState props!!!
    return (
        <>
            <div
                className='row'
                style={{
                    height: window.innerHeight - 100,
                    overflowY: 'scroll',
                    scrollBehavior: 'smooth'
                }}>
                <div >
                    <MessageList
                        data={ data }
                        loading={ loading }
                        subscribeToNewMessages={ () => handleNewMessage(subscribeToMore) }
                    />
                </div>
            </div>
            <MyForm />
        </>
  );
}

export default App;