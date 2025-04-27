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
      <div className="d-flex w-100 m-auto justify-content-center align-items-center">
        <div
          className="d-flex flex-column rounded shadow w-md-50 bg-white"
          style={{ padding: "32px" }}
        >
          <LoginForm />
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
          {CAROUSEL_CONTENT.map((content, index) => (
            <Carousel.Item
              className="h-100 d-flex align-items-center"
              key={index}
            >
              <div className="w-100 text-center px-5 gap-4">
                <h1 className="mb-4 fw-bolder custom-text-color-primary">
                  <span className="custom-text-color-secondary">Shop</span>Mate
                </h1>
                <h2 className="mt-4 mb-4 fw-bolder custom-text-color-primary display-2 flex-wrap col-9 m-auto">
                  {content.title}
                </h2>
                <p className="mt-4 fs-4 custom-text-color-dark col-6 m-auto">
                  {content.text}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </AuthLayout>
  );
}
