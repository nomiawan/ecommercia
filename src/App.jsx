import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { Success } from "./components/Success";
import { Cancel } from "./components/Cancel";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  let token = JSON.parse(localStorage.getItem("token"));
  return (
    <>
      <ToastContainer />
      <Router>
        {token && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={
              <PrivateRoutes>
                <Products />
              </PrivateRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoutes>
                <Cart />
              </PrivateRoutes>
            }
          />
          <Route
            path="/success"
            element={
              <PrivateRoutes>
                <Success />
              </PrivateRoutes>
            }
          />
          <Route
            path="/cancel"
            element={
              <PrivateRoutes>
                <Cancel />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
