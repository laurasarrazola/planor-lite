import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
// import { AuthGuard, UnauthGuard } from "../guards";

import { LoginPage } from "@/features/auth";
// import { Home } from "@/features/home/components/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/home" replace />,
      // },
      {
        // element: <UnauthGuard />,
        children: [
          { path: "/login", element: <LoginPage /> },
        ],
      },
      // {
      //   element: <AuthGuard />,
      //   children: [
      //     { path: "/inicio", element: <Home /> },
      //   ],
      // },
    ],
  },
]);