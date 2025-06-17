import { useEffect, useState } from "react";
import "./myproducts.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import axios from "axios";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Rating from "@mui/material/Rating";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { edither } from "../Redux/EdithSlice"; 
import swal from 'sweetalert';
import Navbar from './navbar';
import { CircularProgress } from "@mui/joy";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Helper conversion functions for size units
const inchToCm = (inch) => (inch * 2.54).toFixed(2);
const cmToInch = (cm) => (cm / 2.54).toFixed(2);

export default function MyProduct() {
  const dispatch = useDispatch();
  const [errormsg, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [ProductData, setProductData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [categoryfect, setcategoryfetch] = useState("default");

  const title = useSelector((state) => state.category?.value || categoryfect);

  const set = (ID) => {
    dispatch(edither({ ID }));
    localStorage.setItem("id", ID);
    navigate('/EdithProduct');
  };

  useEffect(() => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setSelectedImage(selectedProduct.images[0].imageUrl);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const FetchAllProducts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const url = `https://trendybazarr.onrender.com/api/data/gets`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedData = response.data.data || [];
        const normalizedTitle = title?.toLowerCase() || "default";

        const filteredByCategory = fetchedData.filter((product) =>
          [
            product.name?.toLowerCase(),
            product.category?.toLowerCase(),
            product.Type?.toLowerCase(),
            product.Producttype?.toLowerCase(),
            ...(product.tags || []).map((tag) => tag.toLowerCase()),
          ].includes(normalizedTitle)
        );

        const baseData =
          normalizedTitle === "default" ? [...fetchedData] : filteredByCategory;
        setProductData(baseData.reverse());
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Failed to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    FetchAllProducts();
  }, [title]);

  const handleDeleteProduct = async (productId) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const url = `https://trendybazarr.onrender.com/api/data/delete/${productId}`;
          const token = localStorage.getItem("authToken");

          await axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setProductData(ProductData.filter((product) => product._id !== productId));
          window.location.reload();
          swal("Product deleted successfully!", { icon: "success" });
        } else {
          swal("Product deletion canceled.");
        }
      });
    } catch (error) {
      console.log(error);
      swal("Error", "Failed to delete the product", "error");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const selectcolorbaseimage = (index) => {
    setSelectedImage(selectedProduct.images[index].imageUrl);
  };

  return (
    <div className="bg-white">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="text-center" style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        </div>
      )}

      <div>
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              {/* Filters content can go here */}
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <Navbar fetch={setcategoryfetch} />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              <div className="product-grid lg:col-span-3">
                {ProductData && ProductData.length > 0 ? (
                  ProductData.map((product, index) => (
                    <div className="product-card" key={index}>
                      <div
                        onClick={() => openModal(product)}
                        className="product-image"
                      >
                        {product.images.length > 0 && (
                          <img
                            src={product.images[0].imageUrl}
                            loading="lazy"
                            alt={`Image of ${product.name}`}
                          />
                        )}
                      </div>
                      <div className="product-info p-2.5">
                        <div className="flex">
                          <div className="left-side">
                            <div className="product-name flex font-medium">
                              <h3 className="product-name">{product.name}</h3>{" "}
                              <p className="pro-rating sm-display-rating flex">
                                <StarRateRoundedIcon sx={{ color: "#ffd700" }} />
                                {product.rating}+
                              </p>
                            </div>
                            <p className="brand fcw">{product.brand}</p>
                            <p className="category-name fcw">{product.category}</p>
                            <p className="price flex gap-1">
                              ₹{product.price}{" "}
                              {product.discountPrice && (
                                <Chip
                                  startDecorator={
                                    <LocalOfferRoundedIcon fontSize="md" />
                                  }
                                >
                                  <p className="discount">₹{product.discountPrice}</p>
                                </Chip>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="edit-delete-btn flex items-center border-solid border-t mt-1.5 p-1">
                          <Button
                            sx={{ width: "50%" }}
                            variant="plain"
                            color="primary"
                            onClick={() => set(product._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{ width: "50%" }}
                            variant="solid"
                            color="danger"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center mt-10">No Products Available</p>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Modal for product details */}
        {selectedProduct && (
          <Modal open={open} onClose={() => setOpen(false)} sx={{ overflowY: "auto" }}>
            <ModalClose sx={{ position: "absolute", top: 10, right: 10 }} />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 2 }}>
              {/* Left side: Image gallery */}
              <Box sx={{ flex: 1 }}>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt={`Main product image of ${selectedProduct.name}`}
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    overflowX: "auto",
                    marginTop: 10,
                  }}
                >
                  {selectedProduct.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.imageUrl}
                      alt={`Thumbnail ${index + 1} of ${selectedProduct.name}`}
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "contain",
                        border:
                          selectedImage === img.imageUrl ? "2px solid blue" : "1px solid gray",
                        cursor: "pointer",
                      }}
                      onClick={() => selectcolorbaseimage(index)}
                    />
                  ))}
                </div>
              </Box>

              {/* Right side: Product details */}
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography level="h4" component="h1" sx={{ fontWeight: "bold" }}>
                  {selectedProduct.name}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg">
                  Brand: {selectedProduct.brand}
                </Typography>
                <Rating
                  name="read-only"
                  value={Number(selectedProduct.rating)}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  fontSize="sm"
                  fontWeight="lg"
                  mt={2}
                >
                  Price: ₹{selectedProduct.price}
                  {selectedProduct.discountPrice && (
                    <Chip
                      startDecorator={<LocalOfferRoundedIcon fontSize="md" />}
                      color="primary"
                      variant="soft"
                      sx={{ ml: 1 }}
                    >
                      ₹{selectedProduct.discountPrice}
                    </Chip>
                  )}
                </Typography>

                {/* Size display with conversion */}
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  fontSize="sm"
                  fontWeight="lg"
                  mt={2}
                >
                  Available {selectedProduct.size.unit} :{" "}
                  <div className="flex gap-2 prduct-size-btn">
                    {selectedProduct.size.values.map((size, index) => {
                      if (selectedProduct.size.unit.toLowerCase() === "in") {
                        const converted = inchToCm(size);
                        return (
                          <span key={index} className="size-values ">
                            {size} in ({converted} cm)
                          </span>
                        );
                      } else if (selectedProduct.size.unit.toLowerCase() === "cm") {
                        const converted = cmToInch(size);
                        return (
                          <span key={index} className="size-values ">
                            {size} cm ({converted} in)
                          </span>
                        );
                      } else {
                        return (
                          <span key={index} className="size-values ">
                            {size} {selectedProduct.size.unit}
                          </span>
                        );
                      }
                    })}
                  </div>
                </Typography>

                {/* Other product info */}
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Category: {selectedProduct.category}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Type: {selectedProduct.Type || selectedProduct.Producttype}
                </Typography>
                {/* Add other fields as needed */}
              </Box>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}
