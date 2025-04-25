import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
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
  return (
    <Container className="mt-5">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Register submitted:", values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="border p-4 rounded-3 shadow-sm"
          >
            <h2 className="text-center mb-4">Create Account</h2>
            <p className="text-center text-muted mb-4">Join ShopMate today</p>

            <FloatingLabel controlId="name" label="Full Name" className="mb-3">
              <Field name="name">
                {({ field, meta }) => (
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    isInvalid={meta.touched && meta.error}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger small mt-1"
              />
            </FloatingLabel>

            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Field name="email">
                {({ field, meta }) => (
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    isInvalid={meta.touched && meta.error}
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
              className="mb-3"
            >
              <Field name="password">
                {({ field, meta }) => (
                  <Form.Control
                    type="password"
                    placeholder="Create password"
                    isInvalid={meta.touched && meta.error}
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

            <FloatingLabel
              controlId="confirmPassword"
              label="Confirm Password"
              className="mb-4"
            >
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    isInvalid={meta.touched && meta.error}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger small mt-1"
              />
            </FloatingLabel>

            <div className="d-grid mb-3">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                style={{
                  backgroundColor: "#2a5c45",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px",
                }}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </div>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#198754" }}>
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
