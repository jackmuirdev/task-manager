import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import DashboardScreen from "../pages/interface/DashboardScreen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      // user interface routes
      <Route index={true} path="/" element={<DashboardScreen />} />
    </Route>
  )
)