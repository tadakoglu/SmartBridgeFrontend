import { SocketMessageType } from "./socket-message-type.enum";


export interface SocketMessage {
  messageType: SocketMessageType;
  timeStamp: string;
}
