import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000";

const socket: Socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"], // Use only WebSocket transport
  autoConnect: false,
});

export default socket;
