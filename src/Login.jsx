// LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEnvelope, FaUserTag } from "react-icons/fa";

const LoginPage = ({ setUserType }) => {
  const [users, setUsers] = useState([
    { fullName: "Admin User", email: "admin@test.com", username: "admin", password: "admin123", role: "admin" },
    { fullName: "Normal User", email: "user@test.com", username: "user", password: "user123", role: "user" },
  ]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const initialLoginValues = { username: "", password: "" };
  const initialSignUpValues = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "user",
  };

  const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  const signUpValidationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);

    setTimeout(() => {
      if (isSignUp) {
        // signup
        const newUser = {
          fullName: values.fullName,
          email: values.email,
          username: values.username,
          password: values.password,
          role: values.role.toLowerCase(),
        };
        setUsers([...users, newUser]);
        setSuccessMsg("🎉 Account created successfully!");
        setIsSignUp(false);
        resetForm({ values: initialSignUpValues });
      } else {
        // login
        const found = users.find(
          (u) => u.username === values.username && u.password === values.password
        );
        if (found) {
          setUserType(found.role);
          setSuccessMsg("✅ Logged in successfully!");
          setLoading(false);
          resetForm({ values: initialLoginValues });

          // ⏳ Navigate after 1.0 sec so Snackbar shows first
          setTimeout(() => {
            if (found.role === "admin") navigate("/admin/dashboard");
            else navigate("/");
          }, 1000);
        } else {
          setLoading(false);
          setSuccessMsg("❌ Invalid username or password");
        }
        resetForm({ values: initialLoginValues });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e8f4fd, #ffffff)",
        p: 2,
      }}
    >
      <Card elevation={6} sx={{ width: "100%", maxWidth: 420, borderRadius: "20px", p: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1d9bf0", mb: 3 }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </Typography>

          <Formik
            initialValues={isSignUp ? initialSignUpValues : initialLoginValues}
            validationSchema={isSignUp ? signUpValidationSchema : loginValidationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors }) => (
              <Form>
                {isSignUp && (
                  <>
                    <Box mb={2}>
                      <Field
                        as={TextField}
                        label="Full Name"
                        name="fullName"
                        fullWidth
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaUserAlt color="#1d9bf0" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box mb={2}>
                      <Field
                        as={TextField}
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaEnvelope color="#1d9bf0" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box mb={2}>
                      <Field
                        as={TextField}
                        select
                        label="Role"
                        name="role"
                        fullWidth
                        error={Boolean(errors.role)}
                        helperText={errors.role}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaUserTag color="#1d9bf0" />
                            </InputAdornment>
                          ),
                        }}
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Field>
                    </Box>
                  </>
                )}

                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Username"
                    name="username"
                    fullWidth
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUserAlt color="#1d9bf0" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock color="#1d9bf0" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {isSignUp && (
                  <Box mb={2}>
                    <Field
                      as={TextField}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      fullWidth
                      error={Boolean(errors.confirmPassword)}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaLock color="#1d9bf0" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ py: 1.2, fontSize: "16px", fontWeight: "bold", position: "relative" }}
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {/* Jelly Loader */}
                      <span
                        style={{
                          "--uib-size": "35px",
                          "--uib-color": "white",
                          "--uib-speed": "2.6s",
                          "--uib-dot-size": "8px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "35px",
                          height: "8px",
                          filter: "url(#uib-jelly-ooze)",
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            style={{
                              position: "absolute",
                              top: "calc(50% - var(--uib-dot-size) / 2)",
                              left: "calc(0px - var(--uib-dot-size) / 2)",
                              display: "block",
                              height: "var(--uib-dot-size)",
                              width: "var(--uib-dot-size)",
                              borderRadius: "50%",
                              backgroundColor: "white",
                              animation: `stream var(--uib-speed) linear infinite both`,
                              animationDelay: `calc(var(--uib-speed) * ${-index * 0.2})`,
                            }}
                          />
                        ))}
                        <svg width="0" height="0">
                          <defs>
                            <filter id="uib-jelly-ooze">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                              <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  
                        0 1 0 0 0  
                        0 0 1 0 0  
                        0 0 0 18 -7"
                                result="ooze"
                              />
                              <feBlend in="SourceGraphic" in2="ooze" />
                            </filter>
                          </defs>
                        </svg>
                      </span>
                      <style>
                        {`
          @keyframes stream {
            0%, 100% {
              transform: translateX(0) scale(0);
            }
            50% {
              transform: translateX(calc(35px * 0.5)) scale(1);
            }
            99.999% {
              transform: translateX(calc(35px)) scale(0);
            }
          }
        `}
                      </style>
                    </Box>
                  ) : isSignUp ? "Sign Up" : "Login"}
                </Button>
              </Form>
            )}
          </Formik>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
              <Link
                component="button"
                onClick={() => setIsSignUp(!isSignUp)}
                sx={{ fontWeight: "bold", color: "#1d9bf0" }}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </Link>
            </Typography>
          </Box>
        </CardContent>

        {/* Snackbar */}
        <Snackbar
          open={Boolean(successMsg)}
          autoHideDuration={successMsg.includes("❌") ? 1000 : 3000}
          onClose={() => setSuccessMsg("")}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSuccessMsg("")}
            severity={successMsg.includes("❌") ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {successMsg}
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
};

export default LoginPage;
