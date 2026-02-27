
import { createContext } from "react";

const TokenContext = createContext({
  token: null,
  setToken: () => {},
  name: null,
  setName: () => {},
  playerId: null,
  setPlayerId: () => {},
  roomId: null,
  setRoomId: () => {},
  code: null,
  setCode: () => {},
  isHost : null,
  setHost: () => {},  

});

export default TokenContext;
