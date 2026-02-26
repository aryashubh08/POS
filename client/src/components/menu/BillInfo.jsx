import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, removeAllItems } from "../../store/slices/cartSlice";
import { removeCustomer } from "../../store/slices/customerSlice";
import { setOrders } from "../../store/slices/orderSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Invoice from "../invoice/Invoice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const BillInfo = () => {
  const dispatch = useDispatch();
  const { table } = useSelector((state) => state.customer);
  const customerData = useSelector((state) => state.customer);
  const total = useSelector(getTotalPrice);
  const cartData = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const handlePlaceOrder = async () => {
    try {
      if (!paymentMethod) {
        toast.error("Please select a payment method!");
        return;
      }

      if (!table?.tableId) {
        toast.error("Table ID not found!");
        return;
      }

      // ================= CASH PAYMENT =================
      if (paymentMethod === "Cash") {
        const orderRes = await axios.post(
          "https://pos-jbid.vercel.app/api/v1/order/create",
          {
            customerDetails: {
              name: customerData.customerName,
              phone: customerData.customerPhone,
              guests: customerData.guests,
            },
            orderStatus: "In Progress",
            bills: {
              total,
              tax,
              totalWithTax: totalPriceWithTax,
            },
            items: cartData,
            table: table.tableId,
            paymentMethod,
          },
          { withCredentials: true },
        );

        const createdOrder = orderRes.data.order || orderRes.data;

        await axios.post(
          `https://pos-jbid.vercel.app/api/v1/table/update/${table.tableId}`,
          {
            status: "Booked",
            orderId: createdOrder._id,
          },
          { withCredentials: true },
        );

        // ✅ ADD TO REDUX STORE
        dispatch(setOrders(createdOrder));

        setOrderInfo(createdOrder);
        setShowInvoice(true);

        dispatch(removeCustomer());
        dispatch(removeAllItems());

        toast.success("Order placed successfully (Cash)");
        return;
      }

      // ================= ONLINE PAYMENT =================
      if (paymentMethod === "Online") {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js",
        );

        if (!res) {
          toast.error("Razorpay SDK failed to load.");
          return;
        }

        const { data } = await axios.post(
          "https://pos-jbid.vercel.app/api/v1/payment/create-order",
          { amount: totalPriceWithTax },
          { withCredentials: true },
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "RESTRO",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              await axios.post(
                "https://pos-jbid.vercel.app/api/v1/payment/verify-payment",
                response,
                { withCredentials: true },
              );

              const orderRes = await axios.post(
                "https://pos-jbid.vercel.app/api/v1/order/create",
                {
                  customerDetails: {
                    name: customerData.customerName,
                    phone: customerData.customerPhone,
                    guests: customerData.guests,
                  },
                  orderStatus: "In Progress",
                  bills: {
                    total,
                    tax,
                    totalWithTax: totalPriceWithTax,
                  },
                  items: cartData,
                  table: table.tableId,
                  paymentMethod,
                  paymentData: {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                  },
                },
                { withCredentials: true },
              );

              const createdOrder = orderRes.data.order || orderRes.data;

              await axios.post(
                `https://pos-jbid.vercel.app/api/v1/table/update/${table.tableId}`,
                {
                  status: "Booked",
                  orderId: createdOrder._id,
                },
                { withCredentials: true },
              );

              // ✅ ADD TO REDUX STORE
              dispatch(setOrders(createdOrder));

              setOrderInfo(createdOrder);
              setShowInvoice(true);

              dispatch(removeCustomer());
              dispatch(removeAllItems());

              toast.success("Payment Successful & Order Placed!");
            } catch (error) {
              console.error(error);
              toast.error("Payment verification failed");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-between px-3 mt-1">
        <p className="text-xs font-medium">Items ({cartData.length})</p>
        <h1 className="text-sm font-bold">₹{total.toFixed(2)}</h1>
      </div>

      <div className="flex justify-between px-3 mt-1">
        <p className="text-xs font-medium">Tax (5.25%)</p>
        <h1 className="text-sm font-bold">₹{tax.toFixed(2)}</h1>
      </div>

      <div className="flex justify-between px-3 mt-1">
        <p className="text-xs font-medium">Total With Tax</p>
        <h1 className="text-sm font-bold">₹{totalPriceWithTax.toFixed(2)}</h1>
      </div>

      <div className="flex gap-4 px-3 mt-2">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`w-full py-1 rounded-lg ${
            paymentMethod === "Cash" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          Cash
        </button>

        <button
          onClick={() => setPaymentMethod("Online")}
          className={`w-full py-1 rounded-lg ${
            paymentMethod === "Online"
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
        >
          Online
        </button>
      </div>

      <div className="px-3 mt-2">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-yellow-300 py-1 rounded-lg"
        >
          Place Order
        </button>
      </div>

      {showInvoice && orderInfo && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default BillInfo;
