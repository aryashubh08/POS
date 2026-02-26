import React, { useEffect, useRef } from "react";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../store/slices/cartSlice";

const CartInfo = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  return (
    <div className="bg-white  shadow-sm p-4">
      <h1 className="text-slate-700 font-semibold mb-4">Order Details</h1>

      <div
        className="space-y-3 max-h-[260px] min-h-[260px] overflow-y-auto scrollbar-hide pr-1"
        ref={scrollRef}
        style={{
          maxHeight: "260px",
          minHeight: "260px",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {cartData.length == 0 ? (
          <p className="text-slate-500">Your cart is empty</p>
        ) : (
          cartData.map((cart) => (
            <div
              key={cart.id}
              className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition rounded-lg p-3"
            >
              {/* Left */}
              <div>
                <h1 className="text-slate-700 font-medium">{cart.name}</h1>
                <p className="text-xs text-slate-500">Qty: {cart.quantity}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded-md hover:bg-red-100">
                    <RiDeleteBin2Fill
                      onClick={() => handleRemove(cart.id)}
                      className="text-red-600"
                    />
                  </button>
                  <button className="p-1 rounded-md hover:bg-blue-100">
                    <FaNoteSticky className="text-blue-600" />
                  </button>
                </div>

                <p className="font-semibold text-sm text-green-600">
                  ₹{cart.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartInfo;
