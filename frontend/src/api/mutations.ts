import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            access_token
            userInfo {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            _id
            username
        }
    }
`;

export const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($sendMessageInput: SendMessageInput!) {
        sendMessage(sendMessageInput: $sendMessageInput) {
            _id
            content
            senderId
            sendername
            timestamp
        }
    }
`;

export const CREATE_ROOM_MUTATION = gql`
    mutation CreateRoom($name: String!) {
        createRoom(name: $name) {
            _id
            name
        }
    }
`;