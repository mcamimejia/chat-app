import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
    query GetMessages($roomId: String!) {
        messages(roomId: $roomId) {
            _id
            content
            senderId
            sendername
            timestamp
        }
    }
`;

export const GET_ROOMS = gql`
    query GetAllRooms {
        allRooms {
            _id
            name
        }
    }
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
    subscription MessageAdded($roomId: String!) {
        messageAdded(roomId: $roomId) {
            _id
            content
            senderId
            sendername
            timestamp
        }
    }
`;