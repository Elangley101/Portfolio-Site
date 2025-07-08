import React from "react";
import { Row, Col } from "react-bootstrap";
import { DiJavascript1, DiNodejs, DiReact, DiGit, DiPython, DiJava, DiMysql, DiPostgresql } from "react-icons/di";
import { SiDocker, SiApachekafka, SiApachespark, SiSnowflake, SiApacheairflow, SiKubernetes, SiRedis, SiMongodb, SiFastapi, SiStreamlit, SiTensorflow, SiPandas, SiHtml5, SiCss3 } from "react-icons/si";
import { FaAws } from "react-icons/fa";

function TechStack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Programming Languages */}
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJava />
      </Col>
      
      {/* Data Engineering & Big Data */}
      <Col xs={4} md={2} className="tech-icons">
        <SiApachespark />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiApachekafka />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiApacheairflow />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiSnowflake />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPandas />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow />
      </Col>
      
      {/* Databases */}
      <Col xs={4} md={2} className="tech-icons">
        <DiPostgresql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMongodb />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiRedis />
      </Col>
      
      {/* Cloud & DevOps */}
      <Col xs={4} md={2} className="tech-icons">
        <FaAws />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKubernetes />
      </Col>
      
      {/* Web Technologies */}
      <Col xs={4} md={2} className="tech-icons">
        <SiHtml5 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCss3 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiStreamlit />
      </Col>
      
      {/* Version Control */}
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>
    </Row>
  );
}

export default TechStack;
