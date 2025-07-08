import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view glass-card">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Ethan Langley</span> from{" "}
            <span className="purple">Savannah, GA.</span>
            <br />
            I am currently working as a <span className="purple">Data Engineer</span> at Parkers Kitchen, where I specialize in building scalable data pipelines, ETL processes, and data infrastructure solutions.
            <br />
            I have a Bachelor's degree in Computer Science from Marshall University in Huntington, WV.
            <br />
            <br />
            My expertise includes:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Building real-time data pipelines with Apache Kafka and Apache Spark
            </li>
            <li className="about-activity">
              <ImPointRight /> Data warehousing and ETL development with Snowflake and Airflow
            </li>
            <li className="about-activity">
              <ImPointRight /> Cloud infrastructure and DevOps with AWS, Docker, and Kubernetes
            </li>
            <li className="about-activity">
              <ImPointRight /> Data visualization and analytics with modern BI tools
            </li>
          </ul>
          
          <p style={{ textAlign: "justify" }}>
            Apart from coding and data engineering, some other activities that I love to do:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Hiking and exploring nature trails
            </li>
            <li className="about-activity">
              <ImPointRight /> Biking and road cycling
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing Disc Golf competitively
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning new technologies and contributing to open source
            </li>
          </ul>

          <p className="quote-text">
            "The happiness of your life depends upon the quality of your thoughts"
          </p>
          <footer className="blockquote-footer">Ethan Langley</footer>
        </blockquote>
      </Card.Body>
      <style>{`
        .glass-card {
          background: rgba(30, 32, 60, 0.75) !important;
          color: #f3f3f3 !important;
          border-radius: 18px !important;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
        }
        .glass-card .about-activity {
          color: #b39ddb;
          font-size: 1.05rem;
        }
        .glass-card .purple {
          color: #a259ff;
        }
        .glass-card .quote-text {
          color: #90caf9;
          font-style: italic;
        }
        .glass-card .blockquote-footer {
          color: #bdbdbd;
        }
      `}</style>
    </Card>
  );
}

export default AboutCard;
