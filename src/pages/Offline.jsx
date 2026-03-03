import { Link } from "react-router-dom";
import "../styles/offline.css"
export default function Offline() {
  return (
    <div className="offline-Error">
      <h1>Sin conexión</h1>
      <p>No se puede conectar con el servidor.</p>
      <p>Revisa tu conexión a internet.</p>
      <hr />
      <div className="error-Link">
        <Link to={"/history"}> Last game history</Link>
        <Link to={"/"}> Create Game </Link>
      </div>
    </div>
  );
}
