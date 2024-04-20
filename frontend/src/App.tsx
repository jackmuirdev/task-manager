import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/common/Header";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <CssBaseline />
      <Header />
      <Container id="container">
        <Outlet />
      </Container>
    </>
  )
}

export default App
