export default function FetchSSeServer(roomId, playerToken) {
  return new EventSource("http://localhost:8083/rooms"+ roomId +"/events", {
    withCredentials: true,
  });
}

export async function getRoomPlayers(id) {}
