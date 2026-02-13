import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Room from "./pages/room";
import CreateGame from "./pages/createGame"
import JoinGame from "./pages/joingame";


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateGame />,
  },
  {
    path: "/joinroom",
    element: <JoinGame />
  },
  {
    path: "/room",
    element: <Room />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
