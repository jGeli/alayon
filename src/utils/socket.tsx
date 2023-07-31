import { io } from "socket.io-client";
import { constants } from "../constants";

const { host } = constants.varEnv;
const socket = io.connect(host, {
    query: {
      orderId: null
    },
    auth: {
        token: null
      } 
});
export default socket;