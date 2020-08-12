import { gql, useQuery, useSubscription, useMutation } from '@apollo/client';
import React from "react";
import {GET_CHANNEL,
  GET_USER_BY_ID,
  SUBSCRIBE_TO_MESSAGES,
  SEND_MESSAGE
} from "./Queries";

const MessageList = (props) => {
    React.useEffect(() => {
        props.subscribeToNewMessages()
    }, [])
    if (!props.data) {
        return <p>loading...</p>
    }
    const messages = props.data.GetChannel.channel.messages;
    return messages.map(message =>
        <p>{message.senderId}: {message.content}</p>
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
            const newMessageId = newMessage.id;
            const newObject = Object.assign({}, prev, {
                GetChannel: {
                    chat: {
                        messages: [
                            ...prev.GetChannel.channel.messages,
                            newMessage,
                        ]
                    }
                }
            });
            return newObject;
        }
    })
};

export const App = () => {
    const [content, setMessage] = React.useState("");
    const { subscribeToMore, ...result } = useQuery(GET_CHANNEL)
    const [sendMessage, {  error }] = useMutation(SEND_MESSAGE);
  
    const handleSendMessage = (event) => {
        event.preventDefault();
        event.target.reset();
        sendMessage({ variables: { channelId:1 , content: content } });
    }

    return (
      <>
        <div
          className='row'
          style={{
            height: window.innerHeight - 100,
            overflowY: 'scroll',
            scrollBehavior: 'smooth'
          }}>
          <div className='column'>
            <MessageList
              {...result}
              subscribeToNewMessages={() => handleNewMessage(subscribeToMore)}
            />
          </div>
          </div>
        <form onSubmit={handleSendMessage}>
            <input placeholder="Type here" onChange={(event) => setMessage(event.target.value)} />
            <button type="submit">
                Yo!
            </button>
        </form>
        </>
  )
}
export default App;