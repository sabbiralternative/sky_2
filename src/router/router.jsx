import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Sports from "../pages/Sports/Sports";
import EventDetails from "../pages/EventDetails/EventDetails";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import Casino from "../pages/Casino/Casino";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },

        {
          path: "/sports/:name/:id",
          element: <Sports />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/betting-profit-loss",
          element: <BettingProfitLoss />,
        },
        {
          path: "/casino",
          element: <Casino />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
