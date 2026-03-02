export default function NavRoom({ roomCode , username}) {
  return (
  <header className="nav-room">
    <div className="nav-left">
      <span className="username">{username}</span>
    </div>

    <div className="nav-center">
      <h1 className="app-title">Trivia</h1>
    </div>

    <div className="nav-right">
      <button className="copy-code-btn" onClick={saveInClipBoard}>
        Copy Room Link
      </button>
    </div>
  </header>
);


  function saveInClipBoard(){
      navigator.clipboard.writeText(roomCode);
  }
}