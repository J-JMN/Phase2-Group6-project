import AuthLayout from "../components/Auth/AuthLayout";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  Form,
  Button,
  FormCheck,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [initialEmail, setInitialEmail] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const carouselContent = [
    {
      logo: "ShopMate",
      title: "Update once, everyone sees it",
      text: "Keep your whole crew in the loop instantly",
    },
    {
      logo: "ShopMate",
      title: "Collaborate effortlessly",
      text: "Real-time updates for your shopping needs",
    },
    {
      logo: "ShopMate",
      title: "Stay organized together",
      text: "Never miss an item on your shopping list",
    },
  ];

  // Checks for remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setInitialEmail(rememberedEmail);
    }
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const { data: accountData } = useFetch('http://localhost:3000/account');  
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values)
    setLoginError(null);
    try {
      const password = values.password
      const email = values.email;
      // check if password match
      if(password !== accountData?.accountPassword){
        console.error('The password is incorrect');
        throw new Error('The password is incorrect')
      };
      // check if user exists within team account
      const existingMember = accountData?.members.find((member)=> member.email === email);
      if(!existingMember){
        throw new Error('You dont have an account!');
      };
      // Handle successful login
      console.log("Login successful:", values);

      // Store user in localstorage
      localStorage.setItem("signedInUser", existingMember);

      // Remember email if checkbox is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
        localStorage.setItem("rememberedPassword", values.password);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect home page
      navigate("/home");
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
    <AuthLayout>
      <div className="d-flex w-100 m-auto justify-content-center align-items-center">
        <div className="d-flex flex-column rounded shadow w-md-50 bg-white" style={{padding: '32px'}}>
          <div className="text-align-center d-flex flex-column align-items-center justify-content-center w-100 my-4">
            <h4 className="mb-3">Welcome Back</h4>
            <h3 className="text-muted mb-4">Login to your account</h3>
          </div>

          {/* Error message*/}
          {loginError && (
            <Alert variant="danger" className="mb-4">
              {loginError}
            </Alert>
          )}

          <Formik
            initialValues={{
              email: initialEmail,
              password: "",
            }}
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
        </div>
      </div>

      <div className="d-flex flex-column w-100 m-auto d-none d-md-block">
        <Carousel
          fade
          controls={false}
          indicators={false}
          interval={3000}
          className="h-100"
        >
          {carouselContent?.map((content,index)=>{
            return(
              <Carousel.Item className="h-100 d-flex align-items-center" key={index}>
                <div
                  className="w-100 text-center px-5 gap-4"
                >
                  <h1 className="mb-4 fw-bolder custom-text-color-primary"><span className='custom-text-color-secondary'>Shop</span>Mate</h1>
                  <h2 className="mt-4 mb-4 fw-bolder custom-text-color-primary display-2 flex-wrap col-9 m-auto" >{content.title}</h2>
                  <p className="mt-4 fs-4 custom-text-color-dark col-6 m-auto">{content.text}</p>
                </div>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </div>
    </AuthLayout>
  );
}
