
import { gql } from '@apollo/client';


export const GET_USER_BY_ID = gql`
query getUserById($id: Int!) {
  GetUserById(id: $id) {
    user {
        username
    }
  }
}
`;

export const GET_CHANNEL = gql`
query getChannel {
    GetChannel {
        channel {
            messages {
                id
                content
                senderId
            }
        }
    }
}
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
subscription messageSubscription {
  MessageSubscription {
    id
    content
    senderId
  }
}
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($channelId: Int!, $content: String!) {
    SendMessage(channelId: $channelId, content: $content) {
      ok
    }
  }
`;