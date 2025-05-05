import "./EdithProduct.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import Rating from "@mui/material/Rating";
import RadioGroup from "@mui/joy/RadioGroup";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {useSelector} from 'react-redux'
import swal from "sweetalert";
import { CircularProgress } from "@mui/joy";

import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const ID = useSelector(state => state.Edith.ID);
  const [id, setId] = useState(() => localStorage.getItem("id") || ID); // Initialize from localStorage if available

  useEffect(() => {
      // Update localStorage and state only when ID changes
      localStorage.setItem("id", ID);
      setId(ID);
  }, [ID]);

  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  //   const [setProduct,Product]=useState(null);
  //
  //
  const categorys = ["Clothing", "footwear", " accessories"];
  const types = ["Tshirt", "Jeans", " Pant", "Hoodie", "Speaker", "Shoes", "Watch", "Sunglass", "Wallet ", " Headphone"];
  //
  //
  useEffect(() => {

    const token = localStorage.getItem("authToken");

    axios.get(`https://trendybazarr.onrender.com/api/data/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        setFormData(response.data.data);
        setSizeUnit(response.data.data.size.unit);
      }).catch(() => {
        console.log("error");
      })


  }, [id])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: 0,
    Type: "",
    Producttype:"",
    brand: "",
    material: "",
    dimensions: {
      height: 0,
      width: 0,
      depth: 0,
    },
    weight: 0,
    warranty: "",
    shippingInfo: "",
    returnPolicy: "",
    size: {
      values: [],
      unit: "",
    },
    rating: 0,
    gender: "",
    stock: "",
    category: "",
    tags: [],
    images: [{ imageUrl: "", color: "" }],
  });
  
  const [sizeUnit, setSizeUnit] = useState("");

  const handleSizeUnitChange = (e) => {
    const unit = e.target.value;
    setSizeUnit(unit);
    setFormData((prevData) => ({
      ...prevData,
      size: { values: [], unit },
    }));
  };

  const handleSizeValueChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData((prevData) => {
      const updatedValues = isChecked
        ? [...prevData.size.values, value]
        : prevData.size.values.filter((size) => size !== value);

      return {
        ...prevData,
        size: { ...prevData.size, values: updatedValues },
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("dimensions")) {
      const key = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        dimensions: { ...prevData.dimensions, [key]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handileaddsize = (e) => {
    const value = e.target.value;
    const sizeArray = value
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean); // Split by comma and trim spaces

    setFormData((prevData) => ({
      ...prevData,
      size: { ...prevData.size, values: sizeArray },
    }));
  };
  const handleImageChange = (index, value) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages[index].imageUrl = value;
      return { ...prevData, images: newImages };
    });
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, { imageUrl: "", color: "" }],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages.splice(index, 1);
      return { ...prevData, images: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.size.unit || !formData.category) {
      swal("warning", "Please fill in all required fields.","warning");
      setIsLoading(false); // Stop the loading state if fields are missing
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `https://trendybazarr.onrender.com/api/data/edit/${id}`, // await added
        formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setIsLoading(false); // Turn off loading state after successful request
      swal("Product Updated!", "The product has been successfully updated.", "success"); // Updated alert message
      navigator("/myproduct");
      console.log(response.status);

    } catch (error) {
      setIsLoading(false); // Stop loading state if there's an error
      console.error("Error updating product:", error);
      swal("Oops!", "Failed to update product. Please try again.", "error");
    }
  };

  // React State and Handlers
const [file, setFile] = useState(null);

const CLOUD_NAME = 'dsxcm3fie'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'Img_upload_preset'; // Replace with your Cloudinary upload preset

// Handle file selection
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

// Handle image upload
const handleUpload = async (index) => {
  if (!file) {
    alert('Please select a file first');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    const uploadedImageUrl = response.data.secure_url;

    alert('Image uploaded successfully');
    console.log('Image URL:', uploadedImageUrl);

    setFormData((prevData) => {
      const newImages = [...prevData.images];
      newImages[index].imageUrl = uploadedImageUrl;
      return { ...prevData, images: newImages };
    });
  } catch (error) {
    console.error('Error uploading file:', error.response?.data || error.message);
    alert('Failed to upload file');
  }
};



  return (
    <div className="addproductform">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="text-center"> <div style={{ textAlign: 'center', marginTop: '20px' }}>
<CircularProgress /> {/* Loading indicator */}
</div>
            <p className="text-white text-2xl font-semibold">Updating...</p>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 border-b p-1 pb-5">
        Edith Product
      </h1>
      <div className="imageurl-section">
              <div className="imageurl-label-btn flex items-center">
                <label>Add Image URL:</label>
                <Button
                  variant="plain"
                  type="button"
                  onClick={handleAddImage}
                  className="w-9/12 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Image
                </Button>
              </div>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {image.imageUrl && (
                    <img
                      src={image.imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-24 h-24 object-cover border border-gray-300 rounded"
                    />
                  )}
                <div style={{ padding: '20px' }}>
            <h1>Upload Image to Imgur</h1>
            <input type="file" onChange={handleFileChange} />
            <button style={{backgroundColor:'black',padding:'3px',color:'white'}} onClick={()=>handleUpload(index)}>Upload</button>        
            </div>
                  <label>Color:</label>
                  <input
                    type="color"
                    name={`image-color-${index}`}
                    value={image.color}
                    required
                    onChange={(e) =>
                      setFormData((prevData) => {
                        const newImages = [...prevData.images];
                        newImages[index].color = e.target.value;
                        return { ...prevData, images: newImages };
                      })
                    }
                    className="w-16 mb-0 color-input m-0 rounded"
                  />
                 
                </div>
              ))}
            </div>
      <form onSubmit={handleSubmit}>
        <div className="productform">
          <div className="form-left mx-auto p-4 space-y-4">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            <label>Brand Name (Optional):</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter the brand name"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter the product price"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            <label>Discount Price (Optional):</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="Discount Price (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <label>Product Description:</label>
            <Textarea
              minRows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description of the product"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />

            <div className="imageurl-section">
              <div className="imageurl-label-btn flex items-center">
                <label>Add Image URL:</label>
                <Button
                  variant="plain"
                  type="button"
                  onClick={handleAddImage}
                  className="w-9/12 ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Image
                </Button>
              </div>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {image.imageUrl && (
                    <img
                      src={image.imageUrl}
                      alt={`Image ${index + 1}`}
                      className="w-24 h-24 object-cover border border-gray-300 rounded"
                    />
                  )}
                  <input
                    type="text"
                    name={`image-${index}`}
                    value={image.imageUrl}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label>Color:</label>
                  <input
                    type="color"
                    name={`image-color-${index}`}
                    value={image.color}
                    onChange={(e) =>
                      setFormData((prevData) => {
                        const newImages = [...prevData.images];
                        newImages[index].color = e.target.value;
                        return { ...prevData, images: newImages };
                      })
                    }
                    className="w-16 mb-0 color-input m-0 rounded"
                  />
                  <Button
                    variant="outlined"
                    color="danger"
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="w-10 h-8 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <ClearRoundedIcon />
                  </Button>
                </div>
              ))}
            </div>

            <label>Size (e.g.,(S, M, XL), Inch, CM):</label>
            <select
              name="sizeUnit"
              value={sizeUnit||formData.size.unit}
              onChange={handleSizeUnitChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Size Type</option>
              <option value="inch">Inch</option>
              <option value="cm">CM</option>
              <option value="letter">Clothing Sizes</option>
            </select>

            {formData.size.unit === "inch" && (
              <input
                type="text" // Change to text to accept multiple values
                name="sizeValue"
                value={formData.size.values.join(", ") || ""} // Display multiple values as a string
                onChange={handileaddsize}
                placeholder="Available sizes (e.g., 10, 9, 7...)"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}

            {formData.size.unit === "cm" && (
              <input
                type="text" // Change to text to accept multiple values
                name="sizeValue"
                value={formData.size.values.join(", ") || ""} // Display multiple values as a string
                onChange={handileaddsize}
                placeholder="Available sizes (e.g., 30, 20, 43...)"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}

            {sizeUnit === "letter" && (
              <div className="flex flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size} className="mr-3.5 flex">
                    <input
                      className="product-check-box"
                      type="checkbox"
                      name="sizeValue"
                      value={size||formData.size.values.join(", ") || ""}
                      checked={formData.size.values.includes(size)}
                      onChange={handleSizeValueChange}
                    />
                    {size}
                  </label>
                ))}
              </div>
            )}
            <label>Product For (Male/Female/Unisex):</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value=" "> Select One </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>

            <label>Product Category:</label>
            <select
              name="category" // Changed to 'category' for consistency
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select One</option>
              {categorys.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>

            <div className="rating ">
              <label>Enter product rating :</label>
              <label htmlFor="">
                <Rating
                  precision={0.5}
                  value={formData.rating}
                  onChange={handleChange}
                  name="rating"
                />
              </label>
            </div>
            <label>Product Type:</label>
            <select
              name="Producttype" // Changed to 'category' for consistency
              value={formData.Producttype}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select One {"T-shirt,Watch,..."}</option>
              {types.map((type, index) => (
                <option key={index} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            <label>Style Type:</label>
            <select
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">
                Select the type (e.g., Formal, Casual, Sport, etc.)
              </option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="gym">Sport/Gym</option>
              <option value="party">Party</option>
            </select>

            <label>Tags or Keywords:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={(e) =>
                handleChange({
                  target: { name: "tags", value: e.target.value.split(", ") },
                })
              }
              placeholder="Add relevant tags for search optimization (e.g., Summer, Casual, Party, etc.)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <label>Material (Optional):</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="Enter Material "
              className="w-full p-2 border border-gray-300 rounded"
            />

            <FormControl>
              <label>Product Availability:</label>
              <RadioGroup
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              >
                <Radio value="in_stock" label="In stock" />
                <Radio value="out_of_stock" label="Out of stock" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="form-right p-4 space-y-4">
            <h2 className="text-lg font-semibold">Dimensions (Optional)</h2>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <input
                type="number"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleChange}
                placeholder="Height"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
                placeholder="Width"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="dimensions.depth"
                value={formData.dimensions.depth}
                onChange={handleChange}
                placeholder="Depth"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              placeholder="Warranty (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="shippingInfo"
              value={formData.shippingInfo}
              onChange={handleChange}
              placeholder="Shipping Info (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="text"
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleChange}
              placeholder="Return Policy (Optional)"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;