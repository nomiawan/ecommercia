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
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../common/Validation";
import { toast } from "react-toastify";

export const Register = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const onSubmit = (data) => {
    toast.success("User register successfully");
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="login-main">
        <h3 className="back-office-para">Ecommercia</h3>
        <Card className="login-card">
          <h4 className="back-office-para">Create an account</h4>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                label="First name"
                {...register("firstName")}
                placeholder="John"
                error={errors?.firstName?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                {...register("lastName")}
                label="Last name"
                placeholder="Doe"
                error={errors?.lastName?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                {...register("email")}
                label="Your email"
                placeholder="abc@gmail.com"
                error={errors?.email?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                {...register("password")}
                label="Password"
                placeholder="Password"
                error={errors?.password?.message}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "5px" }}>
            <Button title="Sign up" />
          </Box>
          <Box>
            <Typography className="dont-account-text">
              Already have an account?{" "}
              <span className="signup-text" onClick={() => navigate("/")}>
                Login here
              </span>
            </Typography>
          </Box>
        </Card>
      </Box>
    </form>
  );
};
