import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/common/Header";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <CssBaseline />
        <Header />
        <Container id="container">
          <Outlet />
        </Container>
      </AuthProvider>
    </>
  )
}

export default App
