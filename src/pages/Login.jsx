import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";
import React from "react";
import { Carousel } from "react-bootstrap";

const CAROUSEL_CONTENT = [
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

export default function Login() {
  return (
    <AuthLayout>
      <div className="login-page-container">
        <div className="form-container">
          <div className="d-flex w-100 m-auto justify-content-center align-items-center">
            <div className="login-form-wrapper">
              <LoginForm />
            </div>
          </div>
        </div>

        <div className="carousel-container d-none d-md-block">
          <Carousel
            fade
            controls={false}
            indicators={false}
            interval={3000}
            className="auth-carousel"
          >
            {CAROUSEL_CONTENT.map((content, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <div className="carousel-content">
                  <h1 className="brand-logo">
                    <span className="logo-part-1">Shop</span>
                    <span className="logo-part-2">Mate</span>
                  </h1>
                  <h2 className="carousel-title">{content.title}</h2>
                  <p className="carousel-text">{content.text}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </AuthLayout>
  );
}
