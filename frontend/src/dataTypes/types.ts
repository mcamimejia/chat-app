export type User = {
    _id?: string
    username?: string
    password?: string
};
  
export type Message = {
    _id?: string
    roomId?: string
    senderId?: string
    sendername?: string
    content?: string
    timestamp?: string
};
  
export type Room = {
    _id?: string
    name?: string
    users?: string[]
};
  
export type LoginResponse = {
    access_token: string
    userInfo: User
};

export interface GetAllRoomsData {
    allRooms: Room[];
}

export interface GetMessagesData {
    messages: Message[];
}
  
// Input types
export type CreateUserInput = {
    username: string
    password: string
};

export type SendMessageInput = {
    roomId: string
    senderId: string
    sendername: string
    content: string
}

export type LoginInput = {
    username: string
    password: string
};