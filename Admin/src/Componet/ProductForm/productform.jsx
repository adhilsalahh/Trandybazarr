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
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [errors, setErrors] = useState({
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
    rating: "",
    images: ""
  });

   const categorys = ["Earrings", "Bangles & Bracelets", " Hair Accessories" , "Neck Beauties"," Finger Rings","Anklets & Toe Rings","Bindis & Tikka Sets"," Fancy Essentials"];

  const types = ["Fancy Keychains", "Wallets / Pouches", " Nose Pins", "Brooches", "Bridal sets", "Fancy Tikkas", "Sticker Bindis", "Silver-finish Toe Rings", "Beaded Anklets", "Chain Anklets",
    "Statement Rings","Adjustable","Layered Necklaces","Chains","Chokers","Fancy Hair Pins",
    "Rubber Bands / Scrunchies","Headbands","Hair Clips & Clutches" ,"Buns & Donuts","Traditional Bangles","Kada","Adjustable Bracelets","Charm Bracelets","Studs","Hoops","Jhumkas","Chandbalis","Ear Cuffs"
  ];
  // Cloudinary configuration
  const CLOUD_NAME = 'dljrcyvdi';
  const UPLOAD_PRESET = 'my_preset';

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
      unit: "",
      values: [],
      inch: [],
      cm: [],
      manualInch: "",
      manualCm: ""
    },
    rating: 0,
    gender: "",
    stock: "",
    category: "",
    tags: [],
    images: [{ imageUrl: "", color: "" }],
  });

  const [sizeUnit, setSizeUnit] = useState("");

  // Calculate discount percentage
  const originalPrice = parseFloat(formData.price) || 0;
  const discountPrice = parseFloat(formData.discountPrice) || 0;
  const discountPercent = originalPrice > 0 
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  const resetForm = () => {
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
        unit: "",
        values: [],
        inch: [],
        cm: [],
        manualInch: "",
        manualCm: ""
      },
      rating: 0,
      gender: "",
      stock: "",
      category: "",
      tags: [],
      images: [{ imageUrl: "", color: "" }],
    });
    setSizeUnit("");
    setFile(null);
    setErrors({
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
      rating: "",
      images: ""
    });
  };

  const handleSizeUnitChange = (e) => {
    const unit = e.target.value;
    setSizeUnit(unit);
    setFormData(prev => ({
      ...prev,
      size: {
        ...prev.size,
        unit,
        values: [],
        inch: [],
        cm: [],
        manualInch: "",
        manualCm: ""
      }
    }));
    setErrors(prev => ({ ...prev, size: "" }));
  };

  const handleSizeValueChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFormData(prev => ({
      ...prev,
      size: {
        ...prev.size,
        values: isChecked
          ? [...prev.size.values, value]
          : prev.size.values.filter(size => size !== value)
      }
    }));
    if (isChecked) {
      setErrors(prev => ({ ...prev, size: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("dimensions")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        dimensions: { ...prev.dimensions, [key]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, value) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index].imageUrl = value;
      return { ...prev, images: newImages };
    });
    setErrors(prev => ({ ...prev, images: "" }));
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { imageUrl: "", color: "" }],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Product Name is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.Producttype.trim()) newErrors.Producttype = "Product type is required";
    if (!formData.Type.trim()) newErrors.Type = "Style type is required";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required";
    if (!formData.stock) newErrors.stock = "Stock status is required";
    if (formData.rating <= 0) newErrors.rating = "Rating is required";
    if (formData.tags.length === 0) newErrors.tags = "Tags are required";
    
    // Validate at least one image has a URL
    const hasValidImage = formData.images.some(img => img.imageUrl.trim() !== "");
    if (!hasValidImage) newErrors.images = "At least one image is required";
    
    // Size validation
    if (!sizeUnit) {
      newErrors.size = "Size unit is required";
    } else {
      if (sizeUnit === "letter" && formData.size.values.length === 0) {
        newErrors.size = "At least one size is required";
      } else if (sizeUnit === "inch" && 
                 !formData.size.manualInch && 
                 formData.size.inch.length === 0) {
        newErrors.size = "Please enter or select sizes";
      } else if (sizeUnit === "cm" && 
                 !formData.size.manualCm && 
                 formData.size.cm.length === 0) {
        newErrors.size = "Please enter or select sizes";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, index) => {
    setFile(e.target.files[0]);
    setCurrentImageIndex(index);
  };

  const handleUpload = async () => {
    if (!file) {
      swal("Oops!", "Please select a file first", "warning");
      return;
    }

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', file);
    formDataCloudinary.append('upload_preset', UPLOAD_PRESET);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formDataCloudinary,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedImageUrl = response.data.secure_url;

      setFormData(prev => {
        const newImages = [...prev.images];
        newImages[currentImageIndex].imageUrl = uploadedImageUrl;
        return { ...prev, images: newImages };
      });

      swal("Success!", "Image uploaded successfully", "success");
    } catch (error) {
      console.error("Upload error:", error);
      swal("Error!", "Failed to upload image", "error");
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      swal("Validation Error", "Please fill all required fields correctly", "warning");
      return;
    }

    // Prepare the size data
    let finalSizeValues = [];
    
    if (sizeUnit === "letter") {
      finalSizeValues = formData.size.values;
    } else if (sizeUnit === "inch") {
      const manualSizes = formData.size.manualInch 
        ? formData.size.manualInch.split(',').map(s => s.trim()).filter(s => s)
        : [];
      finalSizeValues = [...manualSizes, ...formData.size.inch];
    } else if (sizeUnit === "cm") {
      const manualSizes = formData.size.manualCm 
        ? formData.size.manualCm.split(',').map(s => s.trim()).filter(s => s)
        : [];
      finalSizeValues = [...manualSizes, ...formData.size.cm];
    }

    // Create the final payload
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice) || 0,
      weight: parseFloat(formData.weight) || 0,
      dimensions: {
        height: parseFloat(formData.dimensions.height) || 0,
        width: parseFloat(formData.dimensions.width) || 0,
        depth: parseFloat(formData.dimensions.depth) || 0,
      },
      size: {
        unit: sizeUnit,
        values: finalSizeValues
      },
      images: formData.images.filter(img => img.imageUrl.trim() !== "")
    };

    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "https://trendybazarr.onrender.com/api/data/upload",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data.success) {
        swal("Success!", "Product added successfully!", "success");
        resetForm();
      } else {
        throw new Error(response.data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      swal("Error!", error.message || "Failed to create product", "error");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="addproductform">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="text-center">
            <p className="text-white text-2xl font-semibold">Processing...</p>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 border-b p-1 pb-5">
        Create Product
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="productform">
          <div className="form-left mx-auto p-4 space-y-4">
            <label>Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <label>Brand Name (Optional):</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter the brand name"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
                Discount Price <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Enter discount price"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            {originalPrice > 0 && discountPrice > 0 && discountPrice < originalPrice && (
              <div className="text-lg font-semibold text-gray-800 mt-2">
                ₹{discountPrice}{' '}
                <span className="text-gray-500 line-through text-sm font-normal">
                  ₹{originalPrice}
                </span>{' '}
                <span className="text-green-600 text-sm font-medium">
                  {discountPercent}% off
                </span>
              </div>
            )}

            <label>Product Description: <span className="text-red-500">*</span></label>
            <Textarea
              minRows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description of the product"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

            <div className="image-upload-section">
              <label>Product Images: <span className="text-red-500">*</span></label>
              {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              {formData.images.map((image, index) => (
                <div key={index} className="image-upload-item mb-4">
                  <div className="flex items-center gap-4 mb-2">
                    {image.imageUrl ? (
                      <img
                        src={image.imageUrl}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover border rounded"
                      />
                    ) : (
                      <div className="w-24 h-24 border rounded flex items-center justify-center bg-gray-100">
                        No Image
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, index)}
                          className="hidden"
                          id={`file-upload-${index}`}
                          accept="image/*"
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                        >
                          Choose File
                        </label>
                        <button
                          type="button"
                          onClick={handleUpload}
                          disabled={!file || currentImageIndex !== index}
                          className={`px-4 py-2 rounded ${file && currentImageIndex === index ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                          Upload
                        </button>
                      </div>
                      <input
                        type="text"
                        value={image.imageUrl}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Or enter image URL directly"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={image.color}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index].color = e.target.value;
                          setFormData({...formData, images: newImages});
                        }}
                        className="w-10 h-10 cursor-pointer"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <ClearRoundedIcon />
                        </button>
                      )}
                    </div>
                  </div>
                  {file && currentImageIndex === index && (
                    <p className="text-sm text-gray-600">Selected: {file.name}</p>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Another Image
              </button>
            </div>

            <div className="size-selection">
              <label className="block font-medium mb-1">
                Select Size Unit <span className="text-red-500">*</span>
              </label>
              <select
                value={sizeUnit}
                onChange={handleSizeUnitChange}
                required
                className={`w-full p-2 border rounded mb-2 ${errors.size ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">-- Choose Size Format --</option>
                <option value="inch">Numeric (Inch)</option>
                <option value="cm">Numeric (CM)</option>
                <option value="letter">Clothing (S, M, L, XL...)</option>
              </select>
              {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}

              {sizeUnit === "inch" && (
                <div>
                  <label className="block font-medium mb-1">
                    Enter Sizes (Inch): <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.size.manualInch}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          manualInch: e.target.value
                        }
                      }));
                      if (e.target.value) {
                        setErrors(prev => ({ ...prev, size: "" }));
                      }
                    }}
                    placeholder="e.g., 28, 30, 32"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  <label className="block font-medium mb-1">
                    Select Standard Sizes (Inch): <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["28", "30", "32", "34", "36", "38", "40"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 border px-3 py-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={size}
                          checked={formData.size.inch.includes(size)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updated = checked
                              ? [...formData.size.inch, size]
                              : formData.size.inch.filter(s => s !== size);
                            setFormData(prev => ({
                              ...prev,
                              size: {
                                ...prev.size,
                                inch: updated
                              }
                            }));
                            if (checked) {
                              setErrors(prev => ({ ...prev, size: "" }));
                            }
                          }}
                          className="accent-blue-500"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {sizeUnit === "cm" && (
                <div>
                  <label className="block font-medium mb-1">
                    Enter Sizes (CM): <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.size.manualCm}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          manualCm: e.target.value
                        }
                      }));
                      if (e.target.value) {
                        setErrors(prev => ({ ...prev, size: "" }));
                      }
                    }}
                    placeholder="e.g., 70, 80, 90"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />

                  <label className="block font-medium mb-1">
                    Select Standard Sizes (CM): <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["70", "75", "80", "85", "90", "95"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 border px-3 py-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={size}
                          checked={formData.size.cm.includes(size)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updated = checked
                              ? [...formData.size.cm, size]
                              : formData.size.cm.filter(s => s !== size);
                            setFormData(prev => ({
                              ...prev,
                              size: {
                                ...prev.size,
                                cm: updated
                              }
                            }));
                            if (checked) {
                              setErrors(prev => ({ ...prev, size: "" }));
                            }
                          }}
                          className="accent-blue-500"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {sizeUnit === "letter" && (
                <div>
                  <label className="block font-medium mb-1">
                    Select Available Sizes: <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                      <label
                        key={size}
                        className={`flex items-center space-x-2 border px-3 py-1 rounded cursor-pointer ${errors.size ? "border-red-500" : ""}`}
                      >
                        <input
                          type="checkbox"
                          value={size}
                          checked={formData.size.values.includes(size)}
                          onChange={handleSizeValueChange}
                          className="accent-blue-500"
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="gender-selection">
              <label>
                Product For (Male/Female/Unisex): <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <div className="category-selection">
              <label>Product Category: <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categorys.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="rating-selection">
              <label>Product Rating: <span className="text-red-500">*</span></label>
              <Rating
                name="rating"
                value={Number(formData.rating)}
                onChange={(event, newValue) => {
                  setFormData(prevData => ({
                    ...prevData,
                    rating: newValue
                  }));
                  setErrors(prev => ({ ...prev, rating: "" }));
                }}
                precision={0.5}
                className="mt-1"
              />
              {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
            </div>
            <div className="product-type-selection">
              <label>Product Type: <span className="text-red-500">*</span></label>
              <select
                name="Producttype"
                value={formData.Producttype}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Product Type</option>
                {types.map((type, index) => (
                  <option key={index} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.Producttype && <p className="text-red-500 text-sm">{errors.Producttype}</p>}
            </div>
            <div className="style-type-selection">
              <label>Style Type: <span className="text-red-500">*</span></label>
              <select
                name="Type"
                value={formData.Type}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Style Type</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="sport">Sport/Gym</option>
                <option value="party">Party</option>
              </select>
              {errors.Type && <p className="text-red-500 text-sm">{errors.Type}</p>}
            </div>
            <div className="tags-input">
              <label>Tags or Keywords: <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.tags.join(", ")}
                onChange={(e) => {
                  const tagsArray = e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag);
                  setFormData({...formData, tags: tagsArray});
                  if (tagsArray.length > 0) {
                    setErrors(prev => ({ ...prev, tags: "" }));
                  }
                }}
                placeholder="Add tags separated by commas (e.g., summer, casual, new)"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>
            <div className="material-input">
              <label>Material (Optional):</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Enter material (e.g., Cotton, Leather)"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="stock-selection">
              <FormControl>
                <label>Product Availability: <span className="text-red-500">*</span></label>
                <RadioGroup
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="mt-1"
                >
                  <div className="flex gap-4">
                    <Radio value="in_stock" label="In stock" />
                    <Radio value="out_of_stock" label="Out of stock" />
                  </div>
                </RadioGroup>
              </FormControl>
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
            </div>
          </div>
       
          <div className="form-right p-4 space-y-4">
            <h2 className="text-lg font-semibold">Dimensions (Optional)</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Height:</label>
                <input
                  type="number"
                  name="dimensions.height"
                  value={formData.dimensions.height}
                  onChange={handleChange}
                  placeholder="Height"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label>Width:</label>
                <input
                  type="number"
                  name="dimensions.width"
                  value={formData.dimensions.width}
                  onChange={handleChange}
                  placeholder="Width"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label>Depth:</label>
                <input
                  type="number"
                  name="dimensions.depth"
                  value={formData.dimensions.depth}
                  onChange={handleChange}
                  placeholder="Depth"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="weight-input">
              <label>Weight (Optional):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight in grams"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="warranty-input">
              <label>Warranty (Optional):</label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="Warranty information"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="shipping-info-input">
              <label>Shipping Info (Optional):</label>
              <input
                type="text"
                name="shippingInfo"
                value={formData.shippingInfo}
                onChange={handleChange}
                placeholder="Shipping details"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="return-policy-input">
              <label>Return Policy (Optional):</label>
              <input
                type="text"
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleChange}
                placeholder="Return policy information"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;