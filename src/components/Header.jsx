import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";

export const Header = () => {
  let navigate = useNavigate();
  const { total_item } = useCartContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    navigate("products");
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setMobileMoreAnchorEl(null);
    window.location.reload();
  };

  const handleCart = () => {
    navigate("cart");
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleCart}>
        <Badge badgeContent={total_item} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </MenuItem>
      <MenuItem>
        <button
          style={{
            background: "red",
            border: "none",
            padding: 10,
            width: "100%",
          }}
          onClick={logOut}
        >
          Logout
        </button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Typography noWrap component="div">
          Categories
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Typography noWrap component="div">
          All Products
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "#202938",
          paddingLeft: "10rem",
          paddingRight: "10rem",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <StoreOutlinedIcon color="primary" />
          </IconButton>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Categories
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              ml: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("products")}
          >
            All Products
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
              <Badge
                badgeContent={total_item}
                color="error"
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("cart")}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
              <button
                style={{
                  background: "red",
                  border: "none",
                  color: "#ffffff",
                  cursor: "pointer",
                  padding: 10,
                }}
                onClick={logOut}
              >
                Logout
              </button>
              <AccountCircle />
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};
