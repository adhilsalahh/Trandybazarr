import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./style.css";
import Button from "@mui/joy/Button";
import { CircularProgress, Option, Select } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Typography from "@mui/joy/Typography";
import Navbar from "./Navbar";

function Showorders() {
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order state
  // const[UpdatedOrder,setUpdatedOrder]=useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [orders, setOrders] = useState([]);
  const [category,setcategory]=useState("default");
  // const [update,setupdate]=useState(false);
  console.log(orders);
  console.log(selectedOrder);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
console.log(selectedDeliveryDate);
  const [loading, setLoading] = useState(true); // New loading state
  const fetchWithBackoff = async (
    url,
    options = {},
    retries = 3,
    backoff = 300
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response; // Return the response if successful
      } catch (error) {
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, backoff)); // Wait before retrying
          backoff *= 2; // Exponential backoff
        } else {
          throw error; // Rethrow the error if all retries fail
        }
      }
    }
  };
  // const change = (section, value) => {
  //     setupdate(true);
  //   switch (section) {
  //     case "deliveryDate":
  //       console.log("Delivery Date changed to:",value);
  //       setUpdatedOrder({...UpdatedOrder,deliveryDate:value})
  //       break;
  //     case "orderStatus":
  //       console.log("Order Status changed to:",value);
  //       setUpdatedOrder({...UpdatedOrder,orderStatus:value})
  //       break;
  //     case "paymentStatus":
  //       console.log("Payment Status changed to:",value);
  //       setUpdatedOrder({...UpdatedOrder,paymentStatus:value})
  //       break;
  //     default:
  //       break;
        
  //   }
    
  // }
  const generateWhatsAppLink = (order) => {
    const phoneNumber = order.customerPhone; // Assuming you have the customer's phone number in the order
    const message = `Dear ${order.customerName},

Thank you for placing your order with Trendzio!

Here are the details of your order:
https://www.trendzio.shop/productview/${order.productId._id}
${order.productName && `Product: ${order.productName?.toUpperCase()}`}
Size: ${order.productSize}
Color: ${order.productColor}
Total Price: ₹${order.orderPrice}
Order Status: ${order.orderStatus}
We’ll keep you updated on the delivery status. If you have any further questions or require assistance, feel free to contact our support team.

Thank you for choosing Trendzio!

Best regards,
Trendzio Team`;
        return `https://wa.me/+91${phoneNumber}?text=${encodeURIComponent(message)}`;
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await fetchWithBackoff(
          "https://trendybazarr.onrender.com/api/order/orders"
        );
        const ordersData = await ordersResponse.json();
       if(category=== "default"){
        setOrders(ordersData);

       }else{
        const filteredOrders = ordersData.filter((order) => order.orderStatus === category);
        setOrders(filteredOrders);
       }

      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchOrders();
  }, [category]);

  const updateOrderStatusInBackend = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://trendybazarr.onrender.com/api/order/put/${orderId}`,
        {
          orderStatus: newStatus,
        }
      );
      console.log("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const updateDeliveryDateInBackend = async (orderId, newDeliveryDate) => {
    try {
      await axios.put(
        `https://trendybazarr.onrender.com/api/order/put/${orderId}`,
        {
          deliveryDate: newDeliveryDate,
        }
      );
      console.log("Delivery date updated successfully.");
    } catch (error) {
      console.error("Error updating delivery date:", error);
    }
  };
  const updatePaymentStatusInBackend = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://trendybazarr.onrender.com/api/order/put/${orderId}`,
        {
          paymentStatus: newStatus,
        }
      );
      console.log("Payment status updated successfully.");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="text-center">
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress /> {/* Loading indicator */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" order-show">
       
      <Navbar fetch={setcategory}/>
      {orders.length === 0 ? (
        <div className="text-center text-2xl font-bold tracking-tight text-gray-900">
          No orders found
        </div>
      ):
      orders.map((order) => (
        <Card
        key={order?._id}
          onClick={() => {
            setSelectedOrder(order); // Set selected order
            setIsModalOpen(true); // Open modal
          }}
          variant="outlined"
          sx={{ width: 320 }}
        >
          <CardOverflow>
            {order?.productimage && (
              <AspectRatio ratio="2">
                <img src={order.productimage} loading="lazy" alt={order.productName} />
              </AspectRatio>
            )}
          </CardOverflow>
          <CardContent>
            <Typography level="title-md">{order.productName}</Typography>
            <Typography level="body-sm">
              Customer : {order.customerName}
            </Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal">
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: "md" }}
              >
                {order.orderPrice}
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={() =>
                  window.open(generateWhatsAppLink(order), "_blank")
                }
                fullWidth
                style={{ marginTop: "15px", backgroundColor: "greenyellow" }}
              >
                Confirm Order on WhatsApp
              </Button>  */}
              <Divider orientation="vertical" />
              <Typography
                level="body-xs"
                textColor="text.secondary"
                sx={{ fontWeight: "md" }}
              >
                {new Date(order.orderDate).toLocaleString("en-US", {
                  weekday: "long", // "Tuesday"
                  year: "numeric", // "2024"
                  month: "long", // "November"
                  day: "numeric", // "12"
                })}
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      ))}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog
          aria-labelledby="selected-item-modal-title"
          aria-describedby="selected-item-modal-description"
          sx={{
            maxWidth: 600,
            overflow: "auto",
            position: "relative", // For positioning the close icon
          }}
        >
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              minWidth: "unset",
              padding: "6px",
              borderRadius: "50%",
              backgroundColor: "background.surface",
              color: "text.primary",
              "&:hover": {
                backgroundColor: "background.level2",
              },
            }}
          >
            <CloseIcon />
          </Button>
          {selectedOrder && (
            <>
              <Typography id="selected-item-modal-title" level="h4">
                {selectedOrder.productName}
              </Typography>
              <AspectRatio ratio="2" sx={{ my: 2 }}>
                <img
                  src={selectedOrder.productimage}
                  alt={selectedOrder.productName}
                />
              </AspectRatio>
              <Typography id="selected-item-modal-description">
                <strong>Customer:</strong> {selectedOrder.customerName} <br />
                <strong>Amount:</strong> {selectedOrder.orderPrice} <br />
                <strong> Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography> <Typography>
                Customer Email: {selectedOrder.customerEmail}
              </Typography>
               <Typography>
                Customer Phone Number: {selectedOrder.customerPhone}
              </Typography>
              <Typography>
                Product Size: {selectedOrder?.productSize}
              </Typography>
              <Typography>
                Product Color:
                <span
                  className="color-indicator"
                  style={{
                    backgroundColor: selectedOrder?.productColor,
                    display: "inline-block",
                    width: "25px",
                    height: "25px",
                    marginLeft: "5px",
                  }}
                ></span>
              </Typography>
 
             
              <Typography>
                <strong>Order Status:</strong>
              </Typography>
              <Select
                value={selectedOrder.orderStatus || "Pending"}
                onChange={(event, newValue) => {
                  const updatedOrder = {
                    ...selectedOrder,
                    orderStatus: newValue,
                  };
                  setSelectedOrder(updatedOrder); // Update local state
                  updateOrderStatusInBackend(selectedOrder._id, newValue); // Persist to backend
                }}
                style={{
                  backgroundColor:
                    selectedOrder.orderStatus === "Delivered"
                      ? "green"
                      : selectedOrder.orderStatus === "Cancelled"
                      ? "red"
                      : selectedOrder.orderStatus === "Processing"
                      ? "orange"
                      : "lightgray",
                      color:
                      selectedOrder.orderStatus === "Pending"
                        ? "black" // Use black text for better contrast on lightgray
                        : "white", // Use white text for other backgrounds
                  }}
              >
                <Option value="Pending">Pending</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Delivered">Delivered</Option>
                <Option value="Cancelled">Cancelled</Option>
              </Select>
              <Typography>
  <strong>Payment Status:</strong>
</Typography>
<Select
  value={selectedOrder.paymentStatus || "Pending"} // Default to "Pending" if null
  onChange={(event, newValue) => {
    const updatedOrder = { ...selectedOrder, paymentStatus: newValue };
    setSelectedOrder(updatedOrder); // Update local state
    updatePaymentStatusInBackend(selectedOrder._id, newValue); // Persist to backend
  }}
  style={{
    backgroundColor:
      selectedOrder.paymentStatus === "Paid"
        ? "green"
        : selectedOrder.paymentStatus === "Pending"
        ? "lightgray"
        : "red", // Default to red for all other statuses
    color:
      selectedOrder.paymentStatus === "Pending"
        ? "black" // Use black text for better contrast on lightgray
        : "white", // Use white text for other backgrounds
  }}
  
>
  <Option value="Pending">Pending</Option>
  <Option value="Paid">Paid</Option>
  <Option value="Failed">Failed</Option>
</Select>
 
              <Typography>
              Delivery Date & Time:{" "}
  {selectedOrder.deliveryDate
    ? new Date(selectedOrder.deliveryDate).toLocaleString("en-US", {
        weekday: "long", // e.g., "Friday"
        year: "numeric", // e.g., "2024"
        month: "long", // e.g., "November"
        day: "numeric", // e.g., "29"
        hour: "2-digit", // e.g., "06"
        minute: "2-digit", // e.g., "30"
        hour12: true, // 12-hour format with AM/PM
      })
    : "N/A"}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Select delivery date"
                      value={
                        selectedDeliveryDate ||
                        dayjs(selectedOrder?.deliveryDate)
                      }
                      onChange={(newDate) => {
                        setSelectedDeliveryDate(newDate);
                        const formattedDate = newDate.toISOString(); // Convert to ISO string
                        setSelectedOrder({
                          ...selectedOrder,
                          deliveryDate: formattedDate,
                        });
                        updateDeliveryDateInBackend(
                          selectedOrder._id,
                          formattedDate
                        ); // Update in backend
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Typography>
              <Typography>
                Shipping Address:{" "}
                {selectedOrder.shippingAddress
                  ? `${selectedOrder.shippingAddress.addressLine1}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state}, ${selectedOrder.shippingAddress.postalCode}, ${selectedOrder.shippingAddress.country}`
                  : "N/A"}
              </Typography>
              <Button
                sx={{ mt: 2 }}
                onClick={() =>
                  window.open(generateWhatsAppLink(selectedOrder), "_blank")
                }
                startDecorator={<WhatsAppIcon />}
                variant="soft"
              >
                Confirm on WhatsApp
              </Button>
            </>
          )}
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default Showorders;

// {orders.map((order) => (
//   <Grid item xs={12} sm={6} md={4} key={order?._id}>
//     <Card>
//       {order?.productimage && (
//         <center>
//         <CardMedia
//           component="img"
//           className="product-image"
//           loading="lazy"

//           sx={{
//             width: '100px',          // Makes image responsive
//             height: '100px',          // Maintains aspect ratio
//             borderRadius: 2,         // Adds subtle rounding to the corners
//             objectFit: 'cover',      // Ensures the image covers its area without distortion
//           }}
//           image={order.productimage}
//           alt="Product Image"
//         />
//         </center>
//       )}

//       <CardContent>
//         <Typography variant="h6">Order ID: {order?._id + ", \n" + order?.productId?._id}</Typography>

//       </CardContent>
//     </Card>
//   </Grid>
// ))}
{
  /* <Button
                variant="contained"
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={() =>
                  window.open(generateWhatsAppLink(order), "_blank")
                }
                fullWidth
                style={{ marginTop: "15px", backgroundColor: "greenyellow" }}
              >
                Confirm Order on WhatsApp
              </Button> */
}
