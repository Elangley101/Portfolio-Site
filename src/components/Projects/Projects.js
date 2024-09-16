import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import "../../style.css";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <div className="work-in-progress">
        <h2>Work in Progress</h2>
        <p>Stay tuned, more projects are coming soon!</p>
      </div>

      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;