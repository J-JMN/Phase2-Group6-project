import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import React from "react";
import {
  Container,
  Row,
  Col,
  CloseButton,
  Carousel,
  Form,
  Button,
  FormCheck,
} from "react-bootstrap";

export default function Login() {
  return (
    <AuthLayout>
      <Container fluid className="h-100">
        <Row className="h-100 g-0">
          {/* Login Form Column (40% width) */}
          <Col lg={5} xl={4} className="bg-white p-4 p-lg-5 d-flex flex-column">
            <div className="text-end mb-3">
              <CloseButton onClick={() => console.log("Close clicked")} />
            </div>
            <div className="my-auto w-100">
              <h2 className="mb-3">Welcome Back</h2>
              <p className="text-muted mb-4">Login to your account</p>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className="d-flex justify-content-between mb-4">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="#" style={{ color: "#198754", fontSize: "14px" }}>
                    Forgot password?
                  </a>
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
                >
                  Login
                </Button>

                <p className="text-center mt-3" style={{ fontSize: "14px" }}>
                  Don't have an account?{" "}
                  <a href="#" style={{ color: "#198754" }}>
                    Create account
                  </a>
                </p>
              </Form>
            </div>
          </Col>

          {/* Carousel Column (60% width) - Updated with centered content and larger fonts */}
          <Col lg={7} xl={8} className="d-none d-lg-block p-0 bg-white">
            <Carousel
              fade
              controls={false}
              indicators={false}
              interval={3000}
              className="h-100"
            >
              <Carousel.Item className="h-100 d-flex align-items-center">
                <div
                  className="w-100 text-center px-5"
                  style={{ color: "#198754" }}
                >
                  <h1 className="display-3 mb-4 fw-bold">ShopMate</h1>
                  <h2 className="mb-4 fs-1">Update once, everyone sees it</h2>
                  <p className="fs-5">
                    Keep your whole crew in the loop instantly
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item className="h-100 d-flex align-items-center">
                <div
                  className="w-100 text-center px-5"
                  style={{ color: "#198754" }}
                >
                  <h1 className="display-3 mb-4 fw-bold">ShopMate</h1>
                  <h2 className="mb-4 fs-1">Collaborate effortlessly</h2>
                  <p className="fs-5">
                    Real-time updates for your shopping needs
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item className="h-100 d-flex align-items-center">
                <div
                  className="w-100 text-center px-5"
                  style={{ color: "#198754" }}
                >
                  <h1 className="display-3 mb-4 fw-bold">ShopMate</h1>
                  <h2 className="mb-4 fs-1">Stay organized together</h2>
                  <p className="fs-5">
                    Never miss an item on your shopping list
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  );
}
