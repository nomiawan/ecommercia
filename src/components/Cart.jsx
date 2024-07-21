import React from "react";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { useCartContext } from "../context/cart_context";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
  const {
    cart,
    total_price,
    setDecrease,
    setIncrease,
    removeItem,
    shipping_fee,
  } = useCartContext();

  if (cart.length === 0) {
    return (
      <div>
        <h3>No Cart in Item</h3>
      </div>
    );
  }

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PebB8JNIY48l5GY1HNJCpeYDFiwevEcKrslMzCjDGltDvvLsxDSrxNYuI45eo9W52pl1xdnLSqUvt0BHezjt23l00Q41rIWvG"
    );
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
    }
  };

  return (
    <Box className="cart-outer">
      <center>
        <h3>Cart Items</h3>
      </center>
      <Grid container spacing={3}>
        {cart?.map((item) => {
          return (
            <Grid item md={8} sm={12} xs={12} key={item?.id}>
              <Card sx={{ padding: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <img src={item?.image} alt="not found" width={100} />
                    <div>
                      <p>{item?.name}</p>
                      <p>Subtotal ${item?.price * item?.amount}</p>
                    </div>
                  </Box>
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <button
                          className="plus-btn"
                          onClick={() => setDecrease(item?.id)}
                        >
                          -
                        </button>
                      </Box>
                      <p>{item?.amount}</p>

                      <Box>
                        <button
                          className="plus-btn"
                          onClick={() => setIncrease(item?.id)}
                        >
                          +
                        </button>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <p>${item?.price}</p>
                      <CloseOutlinedIcon
                        sx={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => removeItem(item?.id)}
                      />
                    </Box>
                  </div>
                </Box>
              </Card>
            </Grid>
          );
        })}

        <Grid item md={4} sm={12} xs={12} sx={{ alignSelf: "flex-start" }}>
          <Card sx={{ padding: "15px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal</Typography>
              <Typography>${Math.round(total_price)}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography>Shipping</Typography>
              <Typography>{shipping_fee}</Typography>
            </Box>
            <Divider sx={{ mt: "10px" }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography className="total-text">Total</Typography>
              <Typography className="total-text">
                ${Math.round(shipping_fee + total_price)}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <button className="checkout-btn" onClick={makePayment}>
                Check out
              </button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
