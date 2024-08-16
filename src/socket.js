import io from "socket.io-client";
import { config } from "../.config";

const socket = io(config.SERVER_URL, {
  path: "/api/socket.io",
  withCredentials: true,
});

export default socket;
