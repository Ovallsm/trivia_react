export default  function  FetchSSeServer(roomId, playerToken) {
  var param = new URL("http://localhost:8083/rooms/" + roomId + "/events");
  param.searchParams.append("token", playerToken);


  
  var es =  new EventSource(param.toString(), {
    withCredentials: true,
  });

  return es;
}

export async function getRoomPlayers(id, playerToken) {
  var param = new URL("http://localhost:8083/rooms/" + id + "/players");

  param.searchParams.append("token", playerToken);
  const response = await fetch(param.toString()).then((res) => res.json())

  return response.map((players) => ({ name: players.username, id: players.id , team : null }));
}

export async function fetchNewPLayer(id, playerToken, roomId) {
var param = new URL("http://localhost:8083/rooms/" + roomId + "/players/" +id);
param.searchParams.append("token", playerToken);
const response = await fetch(param.toString()).then((res) => res.json())
return { name: response.username, id: response.id }
}

export async function createTeam(token, roomId) {
var param = new URL("http://localhost:8083/rooms/" + roomId + "/teams");
param.searchParams.append("token", token);
const response = await fetch(param.toString(), {
  method: "POST",
}).then((res) => res.json());
return response;
}