import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { HomePage } from "@/features/home";
import { Pruebas } from "@/features/pruebas";
import { BoardsPage } from "@/features/boards";
import { AuthGuard } from "@/app/router/guards/AuthGuard";

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
        element: <AuthGuard />,
        children: [
          {
            path: "/boards",
            element: <BoardsPage />
          }
        ]
      }
    ]
  }
]);