import React from "react";
import { useDispatch } from "react-redux";
import { submit } from "../../reduxtoolkit/CategorySlice";
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

  const categories = [
    { name: "All", cat: "default" },
    { name: "Studs", cat: "Studs" },
    { name: "Hoops", cat: "Hoops" },
    { name: "Jhumkas", cat: "Jhumkas" },
    { name: "Chandbalis", cat: "Chandbalis" },
    { name: "Ear Cuffs", cat: "Ear Cuffs" },
    { name: "Traditional Bangles", cat: "Traditional Bangles" },
    { name: "Kada", cat: "Kada" },
    { name: "Adjustable Bracelets", cat: "Adjustable Bracelets" },
    { name: "Charm Bracelets", cat: "Charm Bracelets" },
    { name: "Fancy Hair Pins", cat: "Fancy Hair Pins" },
    { name: "RUbber Bands /Scrunchies", cat: "RUbber Bands /Scrunchies" },
    { name: "Headbands", cat: "Headbands" },
    { name: "Buns & Donuts", cat: "Buns & Donuts" },
    { name: "Hair Clips & Clutches", cat: "Hair Clips & Clutches" },
    { name: "Chains", cat: "Chains" },
    { name: "Chokers", cat: "Chokers" },
    { name: "Layered Necklaces", cat: "Layered Necklaces" },
    { name: "Mangalsutra Style", cat: "Mangalsutra Style" },
    { name: "Adjustable", cat: "Adjustable" },
    { name: "Statement Rings", cat: "Statement Rings" },
    { name: "Couple Rings", cat: "Couple Rings" },
    { name: "Chain Anklets", cat: "Chain Anklets" },
    { name: "Beaded Anklets", cat: "Beaded Anklets" },
    { name: "Silver-finish Toe Rings", cat: "Silver-finish Toe Rings" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleCategoryClick = (value) => {
    dispatch(submit({ value }));
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
          My Products
        </Typography>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {categories.map((item, index) => (
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
            {categories.map((item, index) => (
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
