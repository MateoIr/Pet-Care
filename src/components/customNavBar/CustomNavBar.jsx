import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import "./CustomNavBar.css";

const CustomNavBar = () => {
  return (
    <Box className="NavBar">
      <Box className="Container">
        <Box
          sx={{
            height: "50px",
            width: "100%",
            display: "flex",
            flexFlow: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "20px",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Box sx={{ width: "80%" }}>PET-CARE</Box>
          <Box sx={{ width: "20%", alignItems: "center", display: "flex" }}>
            <MenuIcon />
          </Box>
        </Box>
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
            <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
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
            <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
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
            <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
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
            <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
              Clientes
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
            <Box sx={{ width: "70%", alignItems: "center", display: "flex" }}>
              Clientes
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className="butomNavBar">
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
  );
};

export default CustomNavBar;
