export default function NavRoom({ roomCode , username}) {
  return (
    <div className="nav-room">
      <p> {username} </p>
      <h1>Trivia</h1>
      <div className="room-code">
        <span onClick={saveInClipBoard}>Copy Room Code</span>
      </div>
    </div>
  );


  function saveInClipBoard(){
      navigator.clipboard.writeText(roomCode);
  }
}