
import io from "socket.io-client";
const serverEndpoint = "https://quizpqsockets.herokuapp.com/";
const socket = io(serverEndpoint);

export { socket };
