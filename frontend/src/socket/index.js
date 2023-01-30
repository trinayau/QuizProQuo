
import io from "socket.io-client";
const serverEndpoint = "https://quizpq-sockets.onrender.com";
const socket = io(serverEndpoint);

export { socket };
