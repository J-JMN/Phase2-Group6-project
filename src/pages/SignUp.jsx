import AuthLayout from "../components/Auth/AuthLayout";
import SignUpForm from "../components/Auth/SignUpForm";
import React from "react";
import { Container, Row, Col, CloseButton } from "react-bootstrap";

export default function SignUp(){
  return (
    <AuthLayout>
      <Container fluid className="h-100">
        <Row className="h-100 g-0">
          <Col lg={5} xl={4} className="bg-white p-4 p-lg-5 d-flex flex-column">
            <div className="text-end mb-3">
              <CloseButton onClick={() => window.history.back()} />
            </div>
            <div className="my-auto w-100">
              <SignUpForm />
            </div>
          </Col>

          {/* Carousel Column (same as login) */}
          <Col lg={7} xl={8} className="d-none d-lg-block p-0 bg-white">
            {/* Your carousel content here */}
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  );
}