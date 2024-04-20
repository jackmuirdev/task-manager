import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import DashboardScreen from "../pages/interface/DashboardScreen";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      // user interface routes
      <Route index={true} path="/" element={<DashboardScreen />} />

      // user authentication routes
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>
  )
)