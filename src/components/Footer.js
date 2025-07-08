import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col xs={12} md={4} className="footer-copywright">
          <h3>Designed and Developed by Ethan Langley</h3>
        </Col>
        <Col xs={12} md={4} className="footer-copywright">
          <h3>Copyright © {year}</h3>
        </Col>
        <Col xs={12} md={4} className="footer-body">
          <div className="footer-icons">
            <a
              href="https://github.com/Elangley101"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ethan-langley-44849b249/"
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
