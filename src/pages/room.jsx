import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Room() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const name = localStorage.getItem("username");

    console.log(name);

    if (name) {
      setUsername(name);
    } else {
      navigate("/");
    }
  }, [navigate]);
  return <>hi, {username}</>;
}
