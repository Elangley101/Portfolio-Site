import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiDocker,
  SiAwslambda,
  SiJupyter,
  SiDatabricks,
  SiGrafana,
  SiKibana,
  SiGitlab,
  SiGithub,
  SiConfluence,
  SiJira,
  SiTerraform,
  SiAnsible,
  SiJenkins,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Development Tools */}
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJupyter />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      
      {/* Data Engineering Platforms */}
      <Col xs={4} md={2} className="tech-icons">
        <SiDatabricks />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAwslambda />
      </Col>
      
      {/* Monitoring & Visualization */}
      <Col xs={4} md={2} className="tech-icons">
        <SiGrafana />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKibana />
      </Col>
      
      {/* DevOps & Infrastructure */}
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTerraform />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAnsible />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJenkins />
      </Col>
      
      {/* Version Control & Collaboration */}
      <Col xs={4} md={2} className="tech-icons">
        <SiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGitlab />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSlack />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiConfluence />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJira />
      </Col>
      
      {/* Deployment */}
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
      </Col>
    </Row>
  );
}

export default Toolstack;
