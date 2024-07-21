import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { TextField } from "../common/TextField";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../common/Validation";
import { toast } from "react-toastify";

export const Login = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const onSubmit = ({ email, password }) => {
    let userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.email === email && userData?.password === password) {
      localStorage.setItem("token", JSON.stringify("123"));
      toast.success("User Logged in successfully");
      navigate("products");
      window.location.reload();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="login-main">
        <h3 className="back-office-para">Ecommercia</h3>
        <Card className="login-card">
          <h4 className="back-office-para">Sign in to your account</h4>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                label="Your email"
                placeholder="abc@gmail.com"
                {...register("email")}
                error={errors?.email?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                label="Password"
                placeholder="password"
                {...register("password")}
                error={errors?.password?.message}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "5px" }}>
            <Button title="Sign in" />
          </Box>
          <Box>
            <Typography className="dont-account-text">
              Don't have an account yet?{" "}
              <span
                className="signup-text"
                onClick={() => navigate("register")}
              >
                Sign up
              </span>
            </Typography>
          </Box>
        </Card>
      </Box>
    </form>
  );
};
