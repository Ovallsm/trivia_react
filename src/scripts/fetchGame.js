export async function startGame(roomId, token, gameOptions) {
  var param = new URL("http://localhost:8083/games");
  param.searchParams.append("token", token);
    const response = await fetch(param.toString(), {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        },
    body: JSON.stringify({
        rounds: gameOptions.rounds,
        timePerRound: gameOptions.timePerRound,
        questionsPerRound: gameOptions.questionsPerRound,
        roomId: roomId,
    }),
    })
}


export async function fetchGame(token, gameID) {
    var param = new URL("http://localhost:8083/games/" + gameID);
    param.searchParams.append("token", token);
    const response = await fetch(param.toString()).then((res) => res.json());
    console.log(response)
    return response;
    
}