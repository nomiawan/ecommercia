import React from "react";
import { useProductContext } from "../context/productcontext";
import { Grid } from "@mui/material";
import { useCartContext } from "../context/cart_context";
import { useState } from "react";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

export const Products = () => {
  const { products, isLoading } = useProductContext();
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    setAmount(amount + 1);
  };

  return (
    <div className="outer-products">
      <h3>All products</h3>
      {isLoading && <CircleLoader color="blue" />}
      <Grid container spacing={3}>
        {products?.map((product) => {
          return (
            <Grid item md={4} sm={12} xs={12} key={product?.id}>
              <div
                style={{
                  // background: "#202938",
                  // padding: "10px",
                  background: "#202938",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  justifyContent: "space-between",
                  height: "260px",
                  overflow: "hidden",
                }}
              >
                <img src={product?.image} alt="not found" width={80} />
                <p style={{ color: "#ffffff", fontSize: "12px" }}>
                  {product?.title}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <p className="price-text">{product?.price}</p>
                  <div>
                    <button
                      className="cart-btn"
                      onClick={() => {
                        addToCart(product?.id, amount, product);
                        toast.success("Item added in the cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
