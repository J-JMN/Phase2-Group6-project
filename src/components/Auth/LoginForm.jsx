import { Formik, Field, ErrorMessage } from "formik";
import { Form, Button, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";

function LoginForm({ onLoginSuccess }) {
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);

  //schema setup
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

      //handles submit
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError(null);

    try {
      //data fetching and error handling
      const response = await fetch(`http://localhost:5173/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("authToken", data.token);
      onLoginSuccess(); // Notify parent component of successful login
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-align-center d-flex flex-column align-items-center justify-content-center w-100 my-4">
        <h4 className="mb-3">Welcome Back</h4>
        <h3 className="text-muted mb-4">Login to your account</h3>
      </div>

      {loginError && (
        <Alert variant="danger" className="mb-4">
          {loginError}
        </Alert>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="email"
              label="Email Address"
              className="mb-3"
            >
              <Field name="email">
                {({ field }) => (
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    isInvalid={touched.email && !!errors.email}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger small mt-1"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-4"
            >
              <Field name="password">
                {({ field }) => (
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    isInvalid={touched.password && !!errors.password}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger small mt-1"
              />
            </FloatingLabel>

            <div className="d-flex justify-content-between mb-4">
              <Form.Check
                type="checkbox"
                id="rememberMe"
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                to="/forgot-password"
                style={{ color: "#198754", fontSize: "14px" }}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3"
              style={{
                backgroundColor: "#2a5c45",
                border: "none",
                borderRadius: "6px",
                padding: "10px",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#198754" }}>
                Create Account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
