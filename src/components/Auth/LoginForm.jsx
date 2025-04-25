import { Formik, Field, ErrorMessage } from "formik";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  return (
    <Container className="mt-5">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Login submitted:", values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="border p-4 rounded-3 shadow-sm"
          >
            <h2 className="text-center mb-4">Welcome Back</h2>
            <p className="text-center text-muted mb-4">Login to your account</p>

            <FloatingLabel
              controlId="floatingUsername"
              label="Username"
              className="mb-3"
            >
              <Field name="username">
                {({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    isInvalid={!!ErrorMessage}
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger small"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-4"
            >
              <Field name="password">
                {({ field }) => (
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    isInvalid={!!ErrorMessage}
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

            <div className="d-flex justify-content-between mb-4">
              <Form.Check type="checkbox" id="rememberMe" label="Remember me" />
              <Button variant="link" className="p-0 text-decoration-none">
                Forgot password?
              </Button>
            </div>

            <div className="d-grid mb-3">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                style={{
                  backgroundColor: "#2a5c45",
                  border: "none",
                  borderRadius: "6px",
                }}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </div>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#198754" }}>
                Create account
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default LoginForm;
