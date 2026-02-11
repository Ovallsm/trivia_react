import { useState } from "react";

export default function JoinGame() {
  const [username, setUsername] = useState("");

  
  return (
    <>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <button >Create game</button>
    </>
  );
}
