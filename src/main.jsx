import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
//page components

import Semaines from "./pages/Semaines";
import Recettes from "./pages/Recettes";
import Paniers from "./pages/Paniers";

// router creation

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Semaines />,
      },
      {
        path: "/Recettes",
        element: <Recettes />,
      },
      {
        path: "/Paniers",
        element: <Paniers />,
      },
    ],
  },
]);

// rendering

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
