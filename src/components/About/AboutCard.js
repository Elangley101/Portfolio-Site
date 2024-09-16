import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Ethan Langley</span> from{" "}
            <span className="purple">Savannah, GA.</span>
            <br />
            I am currently working as a Junior Software Engineer at Parkers Kitchen.
            <br />
            I have a Bachelor's degree in Computer Science from Marshall University in
            Huntington WV.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Hiking
            </li>
            <li className="about-activity">
              <ImPointRight /> Biking
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing Disc Golf
            </li>
          </ul>

          <p className="quote-text">
            "The happiness of your life depends upon the quality of your thoughts"
          </p>
          <footer className="blockquote-footer">Ethan Langley</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
