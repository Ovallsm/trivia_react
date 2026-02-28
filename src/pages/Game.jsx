
import { use, useContext ,  } from "react";

export default function Game(){
  const { token, roomId } = useContext(TokenContext);
  const gameData = fetchGame(roomId, token)
  
}