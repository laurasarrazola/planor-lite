import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { HomePage } from "@/features/home";
import { Pruebas } from "@/features/pruebas";
import { BoardsPage } from "@/features/boards";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/pruebas",
        element: <Pruebas />
      },
      {
        path: "/boards",
        element: <BoardsPage />
      }
    ]
  }
]);