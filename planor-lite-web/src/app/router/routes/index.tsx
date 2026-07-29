// 


import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { LoginPage } from "@/features/auth";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  }
]);