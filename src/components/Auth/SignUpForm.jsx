import { Form, Button, FloatingLabel, Alert, Spinner } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import usePut from "../../hooks/usePUT";
import useFetch from "../../hooks/useFetch";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { API_URL } from "../../constants/utility";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUpForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { putData } = usePut(`${API_URL}/accounts`);
  const { data: accountData } = useFetch(`${API_URL}/accounts/1`);

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const {password,email,confirmPassword,name} = values
      // check if password is correct
      if(password !== confirmPassword){
        console.error('The passwords do not match');
        throw new Error('The passwords do not match')
      };
      // check if username already exists
      const existingMember = accountData?.members?.find((member)=> member?.email === email || member?.name === name);
      if(existingMember){
        throw new Error('An account with this email or name already exists!');
      };
      // update member list
      accountData.members.push({
        name,
        email,
        role: accountData.members.length > 0 ? 'member' : 'owner'
      });
      const result = await putData(accountData,accountData?.id);
      // store data in session storage for easier handling
      // Store user in localstorage
      localStorage.setItem("signedInUser", JSON.stringify({
        name,
        email,
        role: accountData.members.length > 0 ? 'member' : 'owner'
      }));
      //redirect
      console.log("Signup successful:", result);
      toast.success("Signup successful, Welcome!!");
      // Redirect home page
      setTimeout(()=>{
        navigate("/home");
      },2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-align-center d-flex flex-column align-items-center justify-content-center w-100 my-4">
        <h4 className="mb-3">Create Account</h4>
        <h3 className="text-muted mb-4">Join ShopMate today</h3>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="name" label="Full Name" className="mb-3">
              <Field name="name">
                {({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    isInvalid={touched.name && !!errors.name}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger small"
              />
            </FloatingLabel>

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
                className="text-danger small"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3"
            >
              <Field name="password">
                {({ field }) => (
                  <Form.Control
                    type="password"
                    placeholder="Create password"
                    isInvalid={touched.password && !!errors.password}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger small"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="confirmPassword"
              label="Confirm Password"
              className="mb-4"
            >
              <Field name="confirmPassword">
                {({ field }) => (
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger small"
              />
            </FloatingLabel>

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
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#198754" }}>
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}
