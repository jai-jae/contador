
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
                sender {
                  username
                }
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
    sender {
      username
    }
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

export const GET_MESSAGE_FROM_CHANNEL = gql`
  query getMessageFromChannel($channelId: Int!) {
    GetMessageFromChannel(channelId: $channelId) {
      messages {
        id
        content
        sender {
          username
        }
      }
    }
  }
`;