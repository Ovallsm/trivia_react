export default async function  FetchSSeServer(roomId, playerToken) {
  var param = new URL("http://localhost:8083/rooms/" + roomId + "/events");
  param.searchParams.append("token", playerToken);


  
  return new EventSource(param.toString(), {
    withCredentials: true,
  });
}

export async function getRoomPlayers(id, playerToken) {
  var param = new URL("http://localhost:8083/rooms/" + id + "/players");

  param.searchParams.append("token", playerToken);
  const response = await fetch(param.toString()).then((res) => res.json())

  return response.map((players) => ({ name: players.username, id: players.id }));
}
