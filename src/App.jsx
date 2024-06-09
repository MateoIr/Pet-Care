import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserCreateUser from "./pages/usersCreateUser/UserCreateUser";
import UserList from "./pages/userList/UserList";
import { useLocalStorage } from "react-use";
import ProtectedRoute from "./utils/ProtectedRoute";
import ClientesRegistroMascota from "./pages/clientesRegistroMascota/ClientesRegistroMascota";
import RegisterCustomer from "./pages/registerCustomer/RegisterCustomer";
import RegisterProduct from "./pages/registerProduct/RegisterProduct";
import UpdateUser from "./pages/updateUser/UpdateUser";
function App() {
  const [user, setUser] = useLocalStorage("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          element={<ProtectedRoute canActivate={user} redirectPath="/login" />}
        >
          <Route path="/home" element={<Home setUser={setUser} />} />
          <Route
            path="/client/pet/register"
            element={<ClientesRegistroMascota setUser={setUser} />}
          />

          <Route
            path="/user/createUser"
            element={<UserCreateUser setUser={setUser} />}
          />
          <Route
            path="/user/userList"
            element={<UserList setUser={setUser} />}
          />
          <Route
            path="/client/register"
            element={<RegisterCustomer setUser={setUser} />}
          />
          <Route
            path="/product/register"
            element={<RegisterProduct setUser={setUser} />}
          />
        </Route>
        <Route path="/user/updateUser/:id" element={<UpdateUser />} />
        <Route
          element={<ProtectedRoute canActivate={!user} redirectPath="/home" />}
        >
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
