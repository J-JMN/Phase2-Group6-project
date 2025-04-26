import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import React from "react";
import {
  Carousel,
  Form,
  Button,
} from "react-bootstrap";

export default function Login() {
  const carouselContent = [
    {
      logo: "ShopMate",
      title: 'Update once, everyone sees it',
      text: 'Keep your whole crew in the loop instantly'
    },
    {
      logo: "ShopMate",
      title: 'Collaborate effortlessly',
      text: 'Real-time updates for your shopping needs'
    },
    {
      logo: "ShopMate",
      title: "Stay organized together",
      text: ' Never miss an item on your shopping list'
    },
  ]
  return (
    <AuthLayout>
      <div className="d-flex w-100 m-auto justify-content-center align-items-center">
        <div className="d-flex flex-column rounded shadow w-md-50 bg-white" style={{padding: '32px'}}>
          {/* Login Form Column (40% width) */}
          <div className="text-align-center d-flex flex-column align-items-center justify-content-center w-100 my-4">
            <h4 className="mb-3">Welcome Back</h4>
            <h3 className="text-muted mb-4">Login to your account</h3>
          </div>

          <Form className="">
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
