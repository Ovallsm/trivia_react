import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TokenProvider from "./context/TokenProvider.jsx";
import Room from "./pages/room";
import CreateGame from "./pages/createGame";
import JoinGame from "./pages/joingame";
import Game from "./pages/Game.jsx";
import Results from "./pages/Results.jsx";
import LastGame from "./pages/LastGame.jsx";
import Offline from "./pages/Offline.jsx";
const router = createBrowserRouter([
  { path: "/", element: <CreateGame /> },
  { path: "/joinroom", element: <JoinGame /> },
  { path: "/room", element: <Room /> },
  { path: "/game", element: <Game /> },
  { path: "/results", element: <Results /> },
  { path: "/history", element: <LastGame /> },
  { path: "/offline", element: <Offline /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  </StrictMode>,
);
