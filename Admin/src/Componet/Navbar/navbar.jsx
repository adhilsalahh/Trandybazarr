import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Input } from "@mui/joy";
import Button from "@mui/joy/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import swal from "sweetalert";
import "./navbar.css";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "My Product", href: "/myproduct", current: false },
  { name: "File to Link", href: "/Imgur", current: false },
  { name: "Orders", href: "/orders", current: false },
  { name: "Customers", href: "/customers", current: false },
  { name: "Analysis", href: "/analysis", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const logout = () => {
    try {
      localStorage.removeItem("admin");
      localStorage.removeItem("authToken");

      navigate("/");
      window.location.reload();
    } catch (error) {
      swal("Oops!", "Try again.", "error");
    }
  };
  
  const categories = ["Fancy Keychains", "Wallets / Pouches", " Nose Pins", "Brooches", "Bridal sets", "Fancy Tikkas", "Sticker Bindis", "Silver-finish Toe Rings", "Beaded Anklets", "Chain Anklets",
    "Statement Rings","Adjustable","Layered Necklaces","Chains","Chokers","Fancy Hair Pins",
    "Rubber Bands / Scrunchies","Headbands","Hair Clips & Clutches" ,"Buns & Donuts","Traditional Bangles","Kada","Adjustable Bracelets","Charm Bracelets","Studs","Hoops","Jhumkas","Chandbalis","Ear Cuffs"
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );
  const handleCategoryClick = (category) => {
    setSearch("");
    localStorage.setItem("category", category);
    if(category==="orders"){
       navigate("/orders");
    }else{
    navigate("/myproduct");
    }
    
  };

  return (
    <div className="min-h-full">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-auto bg-gray-800 p-4 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="brand-name text-white font-semibold text-xl">Trendy Bazarr</h1>
          <button
            className="text-gray-400 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav>
          <ul>
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
              >
                <li
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Sign out button */}
        <div className="border-t border-gray-700 pt-4">
          <button
            className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={logout}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:pl-64">
        {/* Mobile Navbar */}
        <div className="sticky top-0 z-10 bg-gray-800 shadow md:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <button className="text-gray-400" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="brand-name">TRENDZIO</h1>
            <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <header className="bg-white shadow">
          <div className="navbar-content flex gap-2.5 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Input
              startDecorator={<SearchRoundedIcon />}
              endDecorator={<Button variant="soft">Search</Button>}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="relative "
              onKeyDown={(e) => e.key === "Enter" && handleCategoryClick(search)}
            />
              {search && (
            <div className="absolute top-10 left-0 bg-white shadow-lg z-10" style={{ width: "50%",marginLeft:"20%" }}>
              {filteredCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-4 py-2 border-b cursor-pointer text-gray-500 hover:bg-gray-100"
                >
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="font-medium"
                  >
                    {cat}
                  </button>
                </div>
              ))}
            </div>
          )}
            <Link to="/productform">
              <Button
                className="add-product-btn"
                color="neutral"
                variant="outlined"
                startDecorator={<AddRoundedIcon />}
              >
                Add Product
              </Button>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
