import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import "./CustomNavBar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomNavBar = ({ setUser }) => {
  const [containerClass, setContainerClass] = useState("HeaderMenuOpen");
  const handleOpenNavMenu = () => {
    setContainerClass((prevClass) =>
      prevClass === "HeaderMenuOpen" ? "HeaderMenuClosed" : "HeaderMenuOpen"
    );
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Box
        className="bigContainer"
        sx={{
          height: { xs: "auto", sm: "100vh" },
        }}
      >
        <Box className="Header">
          <Box
            sx={{
              width: "80%",
              fontSize: {
                xs: 32,
                sm: 18,
                md: 25,
              },
            }}
          >
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "inherit", // Maintain the current text color
                fontSize: "inherit",
              }}
            >
              PET-CARE
            </Link>
          </Box>
          <Box sx={{ width: "20%", alignItems: "center", display: "flex" }}>
            <MenuIcon onClick={handleOpenNavMenu} />
          </Box>
        </Box>
        <Box className={containerClass}>
          <Box className="NavBar">
            <Box>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <PetsIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{ width: "70%", alignItems: "center", display: "flex" }}
                >
                  Clientes
                </Box>
              </Box>
            </Box>
            <Box>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <CalendarTodayIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{ width: "70%", alignItems: "center", display: "flex" }}
                >
                  Turnos
                </Box>
              </Box>
            </Box>
            <Box>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <ShoppingCartIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{ width: "70%", alignItems: "center", display: "flex" }}
                >
                  Productos
                </Box>
              </Box>
            </Box>
            <Box>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <MenuBookTwoToneIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{ width: "70%", alignItems: "center", display: "flex" }}
                >
                  Proveedores
                </Box>
              </Box>
            </Box>
            <Box>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <PersonIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{ width: "70%", alignItems: "center", display: "flex" }}
                >
                  Usuarios
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className="butomNavBar" onClick={handleLogout}>
              <Box sx={{ width: "30%" }}>
                <ExitToAppIcon
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      md: "3rem",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
                Cerrar sesión
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomNavBar;
