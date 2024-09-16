import React, { useContext, useState } from 'react'; 
import { AuthContext } from './AuthProvider';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_ROOMS, MESSAGE_ADDED_SUBSCRIPTION, MESSAGES_QUERY } from '../api/queries';
import { SEND_MESSAGE_MUTATION, CREATE_ROOM_MUTATION } from '../api/mutations';
import { GetAllRoomsData, GetMessagesData, Message, SendMessageInput } from '../dataTypes/types';

const Chat: React.FC = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [newRoomName, setNewRoomName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [infoMessage, setInfoMessage] = useState<string>('');

    const { user, logout } = useContext(AuthContext);

    
    const { data: roomsData, refetch: refetchRooms } = useQuery<GetAllRoomsData>(GET_ROOMS);
    const { data: messagesData, refetch: refetchMessages } = useQuery<GetMessagesData>(MESSAGES_QUERY, {
        variables: { roomId },
        skip: !roomId
    });

    const { data: subscriptionData } = useSubscription<{ messageAdded: Message }>(MESSAGE_ADDED_SUBSCRIPTION, {
        variables: { roomId },
        skip: !roomId,
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData.data) {
                refetchMessages();
            }
        },
    });
    
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
        onCompleted: () => {
            setMessage('');
            refetchMessages();
        },
    });

    const [createRoom] = useMutation(CREATE_ROOM_MUTATION, {
        onCompleted: () => {
            setNewRoomName('');
            setInfoMessage('Room created succesfully!')
            refetchRooms();
        },
    });

    const handleSendMessage = () => {
        setError('');
        setInfoMessage('');
        if (!message.trim() || !roomId || !user || !user._id || !user.username) {
            setError('Invalid data.');
            return;
        }
        try {
            const sendMessageInput: SendMessageInput = {
                roomId, 
                senderId: user._id, 
                sendername: user.username, 
                content: message
            };
            sendMessage({ variables: { sendMessageInput } });
        } catch (error) {
            setError('Failed to send message.');
        }
    };

    const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setError('');
        setInfoMessage('');
        setRoomId(e.target.value);
        refetchMessages();
    };

    const handleCreateRoom = () => {
        setError('');
        setInfoMessage('');
        if (!newRoomName.trim()) {
            setError('Invalid data.');
            return;
        }
        try {
            createRoom({ variables: { name: newRoomName } });
        } catch (error) {
            setError('Failed to create room.');
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{roomId ? `Chat Room id: ${roomId}` : 'Select a Room'}</h2>
                    <button
                        className="text-red-500 underline"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {infoMessage && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{infoMessage}</div>}

                {user && (
                    <div className="mb-4 p-4 bg-blue-100 rounded-lg">
                        <p className="font-semibold">
                            Logged in as: {user.username}
                        </p>
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="roomSelect"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Select Chat Room
                    </label>
                    <select
                        id="roomSelect"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={roomId || ''}
                        onChange={handleRoomChange}
                    >
                        <option value="" disabled>
                            -- Select a Room --
                        </option>
                        {roomsData?.allRooms.map((room: any) => (
                            <option key={room._id} value={room._id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="newRoomName" className="block text-gray-700 font-semibold mb-2">
                        Create New Room
                    </label>
                    <input
                        type="text"
                        id="newRoomName"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Enter room name"
                    />
                    <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        onClick={handleCreateRoom}
                    >
                        Create Room
                    </button>
                </div>

                {roomId && <>
                    <div className="mb-6 bg-gray-200 p-4 rounded-lg h-64 overflow-y-auto">
                        {messagesData?.messages.length ? (
                            messagesData.messages.map((msg: any) => (
                                <div
                                    key={msg._id}
                                    className="mb-2 p-2 bg-white rounded shadow"
                                >
                                    <strong className="text-blue-500">
                                        {msg.sendername}:
                                    </strong>
                                    {' '}{msg.content}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No messages yet.</p>
                        )}
                    </div>

                    <div className="flex">
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-300 rounded-l"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </>}
                
            </div>
        </div>
    );
};

export default Chat;