import { Formik, Field, ErrorMessage } from "formik";
import { Form, Button, FormCheck, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { data: accountData } = useFetch("http://localhost:3000/accounts/1");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) setInitialEmail(rememberedEmail);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoginError(null);
    try {
      const { password, email } = values;

      if (password !== accountData?.accountPassword) {
        throw new Error("The account password is incorrect");
      }

      const existingMember = accountData?.members?.find(
        (member) => member?.email === email
      );
      if (!existingMember) {
        throw new Error("You don't have an account!");
      }

      localStorage.setItem("signedInUser", JSON.stringify(existingMember));
      toast.success("Login successful, Welcome!!");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(
        err.message ||
          "Login failed. Please check your credentials and try again."
      );
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
        initialValues={{ email: initialEmail, password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
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
            </Form.Group>

            <div className="d-flex justify-content-between mb-4">
              <FormCheck
                type="checkbox"
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
                Create account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
