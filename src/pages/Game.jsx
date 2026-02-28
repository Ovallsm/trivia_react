import { useContext, useEffect, useState } from "react";
import { fetchGame } from "../scripts/fetchGame";
import TokenContext from "../context/tokenContext";
import QuestionZone  from "../assets/QuestionZone";


export default function Game() {
  const { token, roomId, gameId } = useContext(TokenContext);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    console.log(gameId)
    if (!gameId) return;

    const loadGame = async () => {
      try {
        const data = await fetchGame(token, gameId);
        setGameData(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadGame();
  }, [ gameId ]);

  return (
    <>
    Time: 
    <hr />
    round :
    <hr />
    
      {gameData ? JSON.stringify(gameData) : "Loading..."}
    </>
  );
}