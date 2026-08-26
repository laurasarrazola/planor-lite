// 


import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { LoginPage } from "@/features/auth";
import { HomePage } from "@/features/home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/home",
        element: <HomePage />
      }
    ]
  }
]);