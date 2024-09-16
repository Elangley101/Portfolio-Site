import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              ALLOW ME TO <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I have a strong passion for technology and have been actively involved in coding and problem-solving for several years.
              <br />
              <br />I specialize in modern programming languages such as
              <i>
                <b className="purple"> JavaScript, Python, and TypeScript. </b>
              </i>
              <br />
              <br />
              My areas of interest include creating innovative 
              <i>
                <b className="purple"> Web Applications, </b> enhancing user experiences, and exploring cutting-edge fields like{" "}
                <b className="purple">Artificial Intelligence</b> and 
                <b className="purple"> Cloud Computing. </b>
              </i>
              <br />
              <br />
              I’m always looking for new challenges where I can apply my expertise in frameworks such as 
              <i>
                <b className="purple"> React.js</b> and 
                <b className="purple"> Node.js, </b>
              </i>
              along with leveraging cloud services like
              <i>
                <b className="purple"> AWS and Google Cloud.</b>
              </i>
              <br />
              <br />
              I aim to create impactful software solutions that improve the lives of others, while continuing to grow and evolve as a developer.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>CONNECT WITH ME</h1>
            <p>
              I'm always open to collaborating and networking. Feel free to <span className="purple">reach out</span> on the platforms below!
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Elangley101"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ethan-langley-44849b249/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
