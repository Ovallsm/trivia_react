export async function startGame(roomId, token, gameOptions) {
  var param = new URL("http://localhost:8083/games");
    const response = await fetch(param.toString(), {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

        },
    body: JSON.stringify({
        rounds: gameOptions.rounds,
        timePerRound: gameOptions.timePerRound,
        questionsPerRound: gameOptions.questionsPerRound,
        roomId: roomId,
    }),
    })
    return await response.json();
}


export async function fetchGame(token, gameID) {
    var param = new URL("http://localhost:8083/games/" + gameID);
    param.searchParams.append("token", token);
    const response = await fetch(param.toString()).then((res) => res.json());
    return response;
    
}

export async function fetchRounds(token, gameID) {
    var param = new URL("http://localhost:8083/games/" + gameID + "/rounds");
    param.searchParams.append("token", token);
    const response = await fetch(param.toString()).then((res) => res.json());
    return response;
}

export async function getQuestionsOfRound(round, token, gameID) {
    var param = new URL("http://localhost:8083/games/" + gameID + "/rounds/" + round.id + "/questions");
    param.searchParams.append("token", token);
    const response = await fetch(param.toString()).then((res) => res.json());
    return response;
}

export async function sendAnswerFetch(answer, questionId, roundId, gameId, token) {


    var param = new URL("http://localhost:8083/games/" + gameId + "/rounds/" + roundId + "/questions/" + questionId);

    const response = await fetch(param.toString(),{
        method: "Post",
        headers:{
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            answer: answer,
        }),
    }).then((res) => res.json());

    return response;
}

export async function getQuestionsAnswers(questionId, roundId, gameId, token) {
    var param = new URL("http://localhost:8083/games/" + gameId + "/rounds/" + roundId + "/questions/" + questionId );
    param.searchParams.append("token", token);
    const response = await fetch(param.toString()).then((res) => res.json());
    return response;
}