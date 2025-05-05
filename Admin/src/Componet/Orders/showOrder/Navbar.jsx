import React from "react";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navbar = ({fetch}) => {
  const dispatch = useDispatch();

  const DeliveryStats = [
    { name: "All", cat: "default" },
    { name: " Pending", cat: "Pending" },
    { name: "Processing", cat: "Processing" },
    { name: "Delivered", cat: "Delivered" },
    { name: "Cancelled", cat: "Cancelled" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleCategoryClick = (value) => {
  fetch(value)
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => handleCategoryClick("default")}
        >
          Orders
        </Typography>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {DeliveryStats.map((item, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => handleCategoryClick(item.cat)}
              sx={{ textTransform: "capitalize" }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            keepMounted
            PaperProps={{
              style: {
                maxHeight: 48 * 5,
                width: "200px",
              },
            }}
          >
            {DeliveryStats.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleCategoryClick(item.cat);
                  handleMenuClose();
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
