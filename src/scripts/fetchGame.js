export async function startGame(roomId, token, gameOptions) {
  var param = new URL("http://localhost:8083/rooms/" + roomId + "/teams");
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
