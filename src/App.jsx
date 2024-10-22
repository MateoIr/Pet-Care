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
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import RegisterSell from "./pages/registerSell/RegisterSell";
import StoreProvider from "./store/StoreProvider";
import ProductList from "./pages/productList/ProductList";
import CatalogView from "./pages/catalogView/CatalogView";
import PetList from "./pages/petList/PetList";
import ClientList from "./pages/clientList/ClientList";
import Signature from "./pages/signature/Signature";
import RegisterVeterinarian from "./pages/registerVeterinarian/RegisterVeterinarian";
import RegisterClinic from "./pages/registerClinic/RegisterClinic";

import ClinicList from "./pages/clinicList/ClinicList";
import VeterinarianList from "./pages/veterinarianList/VeterinarianList";
import UpdateVeterinarian from "./pages/updateVeterinarian/UpdateVeterinarian";

import UpdateClient from "./pages/updateClient/UpdateCliente";
import UpdatePet from "./pages/updatePet/UpdatePet";

import ClientSection from "./pages/nav/clientesSection/ClientSection";
import ProductSection from "./pages/nav/productosSection/ProductSection";
import UserSection from "./pages/nav/userSection/UserSection";
import ConfigurationSection from "./pages/nav/configurations/ConfigurationSection";
import SellSection from "./pages/nav/sellSection/SellSection";

import TrunRegister from "./pages/turnRegister/TrunRegister";
import UpdateTurn from "./pages/updateTurn/UpdateTurn";
import ReportsTurn from "./pages/reports/ReportsTurn";
import { CalendarSection } from "./pages/nav/calendar/CalendarSection";
import ServiceList from "./pages/serviceList/ServiceList";
import { ReportSection } from "./pages/nav/reportsSection/ReportSection";

function App() {
  const [user, setUser] = useLocalStorage("token");
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
          // element={
          //   <ProtectedRoute canActivate={user} redirectPath="/login" />
          // }
          >
            <Route path="/home" element={<Home setUser={setUser} />} />
            <Route
              path="/client/pet/register"
              element={<ClientesRegistroMascota setUser={setUser} />}
            />
            <Route
              path="/client/pet/petList"
              element={<PetList setUser={setUser} />}
            />
            <Route
              path="/client/clienteList"
              element={<ClientList setUser={setUser} />}
            />
            <Route
              path="/signature"
              element={<Signature setUser={setUser} />}
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
              path="/user/productList"
              element={<ProductList setUser={setUser} />}
            />
            <Route
              path="/client/register"
              element={<RegisterCustomer setUser={setUser} />}
            />
            <Route
              path="/product/register"
              element={<RegisterProduct setUser={setUser} />}
            />
            <Route
              path="/veterinario/register"
              element={<RegisterVeterinarian setUser={setUser} />}
            />
            <Route
              path="/veterinario/clinica/register"
              element={<RegisterClinic setUser={setUser} />}
            />

            <Route
              path="/product/sell"
              element={<RegisterSell setUser={setUser} />}
            />
            <Route
              path="/products"
              element={<CatalogView setUser={setUser} />}
            />
            <Route
              path="/home/clientSection"
              element={<ClientSection setUser={setUser} />}
            />
            <Route
              path="/home/productSection"
              element={<ProductSection setUser={setUser} />}
            />
            <Route
              path="/home/userSection"
              element={<UserSection setUser={setUser} />}
            />
            <Route
              path="/home/configurationSection"
              element={<ConfigurationSection setUser={setUser} />}
            />
            <Route
              path="/home/sellSection"
              element={<SellSection setUser={setUser} />}
            />
            <Route
              path="/home/calendarSection"
              element={<CalendarSection setUser={setUser} />}
            />
            <Route
              path="/serviceList"
              element={<ServiceList setUser={setUser} />}
            />
            <Route path="/clinics" element={<ClinicList setUser={setUser} />} />
            <Route path="/user/updateUser/:id" element={<UpdateUser />} />
            <Route path="/veterinarian/:id" element={<UpdateVeterinarian />} />
            <Route path="/veterinarians" element={<VeterinarianList />} />
          </Route>

          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          >
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>

          <Route
            path="/product/updateProduct/:id"
            element={<UpdateProduct />}
          />
          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          >
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>

          <Route path="/pet/updatePet/:id" element={<UpdatePet />} />
          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          >
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>

          <Route path="/client/updateClient/:id" element={<UpdateClient />} />
          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          >
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />

          <Route
            path="/turn/register"
            element={<TrunRegister setUser={setUser} />}
          />
          <Route path="/turn/updateTurn/:idtipo/:id" element={<UpdateTurn />} />

          <Route
            path="/reports/turn"
            element={<ReportSection setUser={setUser} />}
          />
          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
