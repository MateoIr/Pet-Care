import { Box, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import "./CustomNavBar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomNavBar = ({ setUser }) => {
  const [containerClass, setContainerClass] = useState("HeaderMenuOpen");
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSmScreen) {
      setContainerClass("HeaderMenuClosed");
    } else {
      setContainerClass("HeaderMenuOpen");
    }
  }, [isSmScreen]);

  const handleOpenNavMenu = () => {
    setContainerClass((prevClass) =>
      prevClass === "HeaderMenuOpen" ? "HeaderMenuClosed" : "HeaderMenuOpen"
    );
  };

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
          width: { sm: "17%" },
          position: { xs: "relative", sm: "fixed" },
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
            <Box onClick={() => navigate("/home/clientSection")}>
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
                  sx={{
                    width: "70%",
                    alignItems: "center",
                    display: "flex",
                    fontSize: {
                      xs: "15px",
                      md: "18px",
                    },
                  }}
                >
                  Clientes
                </Box>
              </Box>
            </Box>
            <Box onClick={() => navigate("/home/sellSection")}>
              <Box className="butomNavBar">
                <Box sx={{ width: "30%" }}>
                  <AttachMoneyIcon
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "70%",
                    alignItems: "center",
                    fontSize: {
                      xs: "15px",
                      md: "18px",
                    },
                    display: "flex",
                  }}
                >
                  Ventas
                </Box>
              </Box>
            </Box>
            <Box onClick={() => navigate("/home/productSection")}>
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
                  sx={{
                    fontSize: {
                      xs: "15px",
                      md: "18px",
                    },
                    width: "70%",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  Productos
                </Box>
              </Box>
            </Box>
            <Box onClick={() => navigate("/home/configurationSection")}>
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
                  sx={{
                    fontSize: {
                      xs: "13px",
                      md: "18px",
                    },
                    width: "70%",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  Configuracion
                </Box>
              </Box>
            </Box>
            <Box onClick={() => navigate("/home/userSection")}>
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
                  sx={{
                    fontSize: {
                      xs: "15px",
                      md: "18px",
                    },
                    width: "70%",
                    alignItems: "center",
                    display: "flex",
                  }}
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
