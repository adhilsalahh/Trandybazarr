import "./productform.css";
import React, { useState } from "react";
import axios from "axios";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import Rating from "@mui/material/Rating";
import RadioGroup from "@mui/joy/RadioGroup";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import swal from "sweetalert";
const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const [Error, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    Type: "",
    Producttype: "",
    tags: "",
    size: "",
    gender: "",
    stock: "",
    category: "",
     rating:""
  })
  //
  //
  // Set your Cloudinary details here:

  const categorys = ["Fashion", "Accessories", " phones" , "Electronics","Home & Living"];
  const types = ["Tshirt", "Jeans", " Pant", "Hoodie", "Speaker", "Shoes", "Watch", "Sunglass", "Wallet ", " Headphone"];
  //
  //

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: 0,
    Type: "",
    Producttype: "",
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

  
  const resdata = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      discountPrice: 0,
      Type: "",
      Producttype: "",
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
  };
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
  const validateProductForm = (formData) => {
    const errors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      errors.name = "Product Name is required";
    }
    if (!formData.price || formData.price <= 0) {
      errors.price = "Valid price is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Product Description is required";
    }
    if (!formData.category.trim()) {
      errors.category = "Product Category is required";
    }
    if (!formData.Producttype.trim()) {
      errors.Producttype = "Product Type is required";
    }
    if (!formData.Type.trim()) {
      errors.Type = "Style Type is required";
    }
    if (!formData.size.values.length) {
      errors.size = "Product Size is required";
    }
    if (!formData.gender.trim()) {
      errors.gender = "Product For (Male/Female/Unisex) is required";
    }
    if (!formData.stock) {
      errors.stock = "Product availability (in stock/out of stock) is required";
    }
    if (formData.rating<=0) {
      
      errors.rating = "Rating is required";
    }
    if (formData.tags.length === 0) {
      errors.tags = "Tags are required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    }
    let error=false;
    for(let key in Error){
      if(Error[key]!==""){
        error=true
      }
    }
       if (!formData.size.unit ||error===true) {
      swal("Oops", "Please fill in all required fields.", "warning");
      console.log(Error,error);

      return;
    }
    setIsLoading(true)
    const token = localStorage.getItem("authToken");
    try {
      const response = axios.post(
        "https://trendybazarr.onrender.com/api/data/upload",

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      swal("Success", "Product added successfully!", "success");
      resdata();
      console.log("Product added:", (await response).status);
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      swal("Oops!", "Failed to create product. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
// React State and Handlers
const [file, setFile] = useState(null);

const CLOUD_NAME = 'dljrcyvdi'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'Imy_preset'; // Replace with your Cloudinary upload preset

// Handle file selection
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

// Handle image upload
// The handleUpload function should then use these variables:
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
          <div className="text-center">
            <p className="text-white text-2xl font-semibold">Adding...</p>
          </div>
        </div>
      )}
<h1 className="text-4xl font-bold tracking-tight text-gray-900 border-b p-1 pb-5">
  Create Product
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
  </div> {/* Closing tag added for this div */}
  <div>
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
          <h1>Upload Image to Cloudinary</h1>
          <input type="file" onChange={handleFileChange} />
          <button
            style={{ backgroundColor: 'black', padding: '3px', color: 'white' }}
            onClick={() => handleUpload(index)}
          >
            Upload
          </button>
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
</div>

      <form onSubmit={handleSubmit}>
        <div className="productform">
          <div className="form-left mx-auto p-4 space-y-4">
            <label>Product Name </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {Error.name && (
              <p className="text-red-500">{Error.name}</p>
            )}
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
            {Error.price && (
              <p className="text-red-500">{Error.price}</p>
            )}

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
            />{Error.description && (
              <p className="text-red-500">{Error.description}</p>
            )}

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
                    required

                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Image URL"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
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

           <label className="block font-medium text-gray-700 mb-1">
  Select Size Unit <span className="text-red-500">*</span>
</label>
<select
  name="sizeUnit"
  value={sizeUnit}
  onChange={handleSizeUnitChange}
  required
  className="w-full p-2 border border-gray-300 rounded mb-2"
>
  <option value="">-- Choose Size Format --</option>
  <option value="inch">Numeric (Inch)</option>
  <option value="cm">Numeric (CM)</option>
  <option value="letter">Clothing (S, M, L, XL...)</option>
</select>
{Error.size && (
  <p className="text-red-500 text-sm mb-2">{Error.size}</p>
)}

{/* Numeric (inch) input */}
{formData.size.unit === "inch" && (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      Enter Sizes (Inch):
    </label>
    <input
      type="text"
      name="sizeValue"
      value={formData.size.values.join(", ")}
      onChange={handileaddsize}
      placeholder="Example: 28, 30, 32"
      required
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
)}

{/* Numeric (cm) input */}
{formData.size.unit === "cm" && (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      Enter Sizes (CM):
    </label>
    <input
      type="text"
      name="sizeValue"
      value={formData.size.values.join(", ")}
      onChange={handileaddsize}
      placeholder="Example: 70, 80, 90"
      required
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
)}

{/* Clothing sizes */}
{sizeUnit === "letter" && (
  <div>
    <label className="block font-medium text-gray-700 mb-1">
      Select Available Sizes:
    </label>
    <div className="flex flex-wrap gap-3">
      {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
        <label
          key={size}
          className="flex items-center space-x-2 border px-3 py-1 rounded cursor-pointer"
        >
          <input
            className="accent-blue-500"
            type="checkbox"
            name="sizeValue"
            value={size}
            checked={formData.size.values.includes(size)}
            onChange={handleSizeValueChange}
          />
          <span>{size}</span>
        </label>
      ))}
    </div>
  </div>
)}

            <label>Product For (Male/Female/Unisex):</label>
            <select
              name="gender"
              value={formData.gender}
              required
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value=" "> Select One </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
            {Error.gender && (
              <p className="text-red-500">{Error.gender}</p>
            )}
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
            {Error.category && (
              <p className="text-red-500">{Error.category}</p>
            )}
            <div className="rating ">
              <label>Enter product rating :</label>
              <label htmlFor="">
                <Rating
                  precision={0.5}
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  name="rating"
                />
                {Error.rating && <p className="text-red-500">{Error.rating}</p>}

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
            {Error.Producttype && (
              <p className="text-red-500">{Error.Producttype}</p>
            )}
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
              <option value="Formal">Formal</option>
              <option value="gym">Sport/Gym</option>
              <option value="party">Party</option>
            </select>
            {Error.Type && (
              <p className="text-red-500">{Error.Type}</p>
            )}
            <label>Tags or Keywords:</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              required
              onChange={(e) =>
                handleChange({
                  target: { name: "tags", value: e.target.value.split(", ") },
                })
              }
              placeholder="Add relevant tags for search optimization (e.g., Summer, Casual, Party, etc.)"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {Error.tags && (
              <p className="text-red-500">{Error.tags}</p>
            )}
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
                required
                onChange={handleChange}
              >
                <Radio value="in_stock" label="In stock" />
                <Radio value="out_of_stock" label="Out of stock" />
              </RadioGroup>
            </FormControl>
            {Error.stock && <p className="text-red-500">{Error.stock}</p>}

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
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
