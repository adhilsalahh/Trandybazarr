/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

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
import { useDispatch } from "react-redux";
import {  edither } from "../Redux/EdithSlice"; 
import swal from 'sweetalert'
import Navbar from './navbar';
import { CircularProgress } from "@mui/joy";
 import { useSelector } from "react-redux";

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

export  default function MyProduct() {
  const dispatch = useDispatch();
  const [errormsg,setErrorMessage]=useState("")
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [ProductData, setProductData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [categoryfect,setcategoryfetch]=useState("default");  

  const title = useSelector((state) => state.category?.value || categoryfect);
  const set=(ID)=>{
    dispatch( edither({ID}));
    localStorage.setItem("id", ID);

    navigate('/EdithProduct')
  }
  useEffect(() => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setSelectedImage(selectedProduct.images[0].imageUrl); // Set the first image when product is selected
    }
  }, [selectedProduct]); // Trigger when selectedProduct changes
  // Initialize with null
  console.log("a product selected"); // State to track selected product
  useEffect(() => {
    setProductData(ProductData);
  });
  useEffect(() => {
    const FetchAllProducts = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const url = `https://trendybazarr.onrender.com/api/data/gets`;
  
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  console.log("Data fetched");
  


  const handleDeleteProduct = async (productId) => {
    try {
      // Show a SweetAlert confirmation dialog
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

          // Delete request
          await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Update the product data state after deletion
          setProductData(ProductData.filter((product) => product.id !== productId));
          window.location.reload();
          swal("Product deleted successfully!", {
            icon: "success",
          });
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

  }
  console.log("Title",title);
  
  return (
    <div className="bg-white">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="text-center">
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <CircularProgress /> {/* Loading indicator */}
    </div></div>
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

              {/* Filters */}
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl  sm:px-2 lg:px-8">
         
          <Navbar fetch={setcategoryfetch}/>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {/* Filters */}

              {/* Product grid */}
              <div className="product-grid lg:col-span-3  ">

                {ProductData && ProductData.length > 0 ? (
                  ProductData.map((product, index) => (
                    <div className="product-card" key={index}>
                      <div
                        onClick={() => openModal(product)}
                        className="product-image"
                      >
                        {product.images.length > 0 && (
                          <img
                            src={product.images[0].imageUrl} // Access the first image's URL
                            loading="lazy"
                            alt={`Image of ${product.name}`} // Descriptive alt text
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
                            variant="plain"
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
                  <h2 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
                    No Data Available
                  </h2>
                )}


              </div>
            </div>
          </section>
        </main>
      </div>
      {selectedProduct && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="soft"
            sx={{
              overflow: "auto",
              width: { xs: "100%", sm: 900 }, // Responsive width
              height: { sm: "70vh", xs: "100vh" },
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              background: "#fff",
            }}
          >
            <ModalClose
              variant="plain"
              sx={{
                m: 1,
                position: "fixed",
                top: "20px",
                border: "solid 1px gray",
                right: "0px",
                background: "white",
              }}
            />

            <div className="select-product flex">
              <div className="popup-img-name-des flex  flex-col w-2/4 ">
                <div className="image-container flex flex-col items-center">
                  {selectedProduct && selectedProduct.images.length > 0 && (
                    <img
                      src={selectedImage}
                      loading="lazy"
                      alt={`Image of ${selectedProduct.name}`}
                      style={{
                        width: "400px",
                        height: "300px",
                        objectFit: "contain",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    />
                  )}

                  <div className="multiple flex">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.imageUrl} // Set the image URL for the thumbnail
                        alt={`Product image ${index + 1}`} // Provide an alt description
                        onClick={() => setSelectedImage(image.imageUrl)} // On click, set the selected image
                        style={{
                          width: "70px", // Set a default width for the thumbnail
                          height: "70px", // Set a default height for the thumbnail
                          objectFit: "cover", // Ensure the image covers the box
                          margin: "5px", // Add margin between thumbnails
                          cursor: "pointer", // Show pointer on hover
                          border:
                            selectedImage === image.imageUrl
                              ? "2px solid blue"
                              : "1px solid #ccc", // Highlight the selected image
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="pro-name-dis   ">
                  <p className="product-title">{selectedProduct.name}</p>
                  <p className="product-discr overflow-auto h-56 w-11/12 p-1">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              <div className="select-product-info  w-2/4">
                <div className="mt-3 select-pro-price-discount flex items-center gap-5">
                  <Typography fontSize="sm" fontWeight="lg">
                    Price: $ {selectedProduct.price}
                  </Typography>
                  {selectedProduct.discountPrice && (
                    <Chip
                      startDecorator={<LocalOfferRoundedIcon fontSize="md" />}
                      size="md"
                      color="success"
                      variant="outlined"
                    >
                      Discount Price: $ {selectedProduct.discountPrice}
                    </Chip>
                  )}
                </div>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Brand : {selectedProduct.brand}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Category : {selectedProduct.category}
                </Typography>
                <Typography
                  sx={{ display: "flex" }}
                  fontSize="sm"
                  fontWeight="lg"
                  mt={2}
                >
                  Available Color :{" "}
                  {selectedProduct.images.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => selectcolorbaseimage(index)}
                      sx={{
                        display: "inline-block",
                        borderRadius: "50px",
                        opacity: "70%",
                        width: "20px",
                        height: "20px",
                        backgroundColor: image.color, // Use the color from the image object
                        border: "1px solid #000", // Optional: border for visibility
                        marginLeft: index === 0 ? "8px" : "16px", // Space between each color box
                      }}
                    />
                  ))}
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  fontSize="sm"
                  fontWeight="lg"
                  mt={2}
                >
                  Available {selectedProduct.size.unit} :{" "}
                  <div className="flex gap-2 prduct-size-btn">
                    {selectedProduct.size.values.map((size, index) => (
                      <span key={index} className="size-values ">
                        {size}{selectedProduct.size.unit}

                        {index < selectedProduct.size.values.length - 1}
                      </span>
                    ))}
                  </div>
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Type : {selectedProduct.Type}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Product Type : {selectedProduct.Producttype}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Gender : {selectedProduct.gender}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Material : {selectedProduct.material}
                </Typography>
                <Typography fontSize="sm" fontWeight="lg" mt={2}>
                  Product Availability : {selectedProduct.stock}
                </Typography>
                <Typography
                  sx={{ display: "flex" }}
                  fontSize="sm"
                  fontWeight="lg"
                  mt={2}
                >
                  Rating :
                  <Rating
                    name="read-only"
                    value={selectedProduct.rating}
                    readOnly
                    precision={0.5}
                  />
                </Typography>
                <div className="other-info mt-4">
                  <p className="flex text-xs font-bold items-center gap-5">
                    Other Information
                  </p>
                  <hr className=" w-full" />
                  {selectedProduct.returnPolicy && (
                    <Typography fontSize="sm" fontWeight="lg" mt={2}>
                      Return Policy: {selectedProduct.returnPolicy}
                    </Typography>
                  )}

                  {selectedProduct.shippingInfo && (
                    <Typography fontSize="sm" fontWeight="lg" mt={2}>
                      Shipping Info: {selectedProduct.shippingInfo}
                    </Typography>
                  )}

                  {selectedProduct.warranty && (
                    <Typography fontSize="sm" fontWeight="lg" mt={2}>
                      Warranty: {selectedProduct.warranty}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </Sheet>
        </Modal>
      )}
    </div>
  );
}