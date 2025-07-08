import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import CaseStudyCard from "./CaseStudyCard";

function Projects() {
  const caseStudies = [
    {
      title: "Streamlytics - Real-Time Streaming Analytics Pipeline",
      summary: "A production-ready data engineering pipeline that processes streaming media user behavior data with real-time analytics and interactive dashboards. Built for scale, performance, and enterprise-grade reliability.",
      problem: [
        { label: "Primary Challenge", description: "Need for real-time processing of streaming media user behavior data with sub-second latency and high throughput." },
        { label: "Business Goal", description: "Create a scalable analytics platform that can handle millions of events and provide real-time business insights." }
      ],
      role: "Full-stack data engineering, real-time streaming pipeline development, and interactive dashboard creation.",
      technologies: ["Python", "Apache Kafka", "FastAPI", "Streamlit", "Docker", "Pandas", "PyArrow", "Great Expectations"],
      solution: "Built a microservices architecture with Kafka for real-time streaming, FastAPI for analytics API, and Streamlit for interactive dashboards. Implemented comprehensive data validation and monitoring.",
      results: [
        "Achieved 1000+ records/second processing speed with <100ms latency",
        "80% storage compression using Parquet format",
        "99.9% uptime with comprehensive error handling and monitoring",
        "Real-time analytics dashboard with live data streaming"
      ],
      takeaways: "Mastered real-time data engineering, streaming architectures, and building production-ready analytics platforms.",
      codeAvailable: true,
      demoUrl: "http://3.86.142.1:8502/",
      repoUrl: "https://github.com/Elangley101/streaming-behavior-pipeline",
      note: "Public demo project - live dashboard and code available"
    },
    {
      title: "Modern E-Commerce Platform",
      summary: "Built a full-stack e-commerce platform with real-time inventory management, payment processing, and advanced analytics dashboard using modern web technologies.",
      problem: [
        { label: "Primary Challenge", description: "Need for a scalable e-commerce solution with real-time inventory tracking and seamless payment processing." },
        { label: "Business Goal", description: "Create a platform that could handle high traffic, provide excellent UX, and generate detailed business insights." }
      ],
      role: "Full-stack development, database design, API development, and deployment orchestration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Socket.io", "AWS", "Docker"],
      solution: "Developed a microservices architecture with real-time features, implemented secure payment processing, and created an intuitive admin dashboard for business analytics.",
      results: [
        "Reduced checkout time by 40% through optimized UX",
        "Achieved 99.9% uptime with scalable cloud infrastructure",
        "Increased conversion rate by 25% with improved mobile experience"
      ],
      takeaways: "Mastered microservices architecture, real-time web technologies, and cloud deployment strategies.",
      codeAvailable: false,
      note: "Work project - code not publicly available"
    },
    {
      title: "Data Engineering Pipeline & Analytics Platform",
      summary: "Designed and implemented a comprehensive data engineering pipeline at Parkers, processing millions of records daily to provide real-time business intelligence and automated reporting.",
      problem: [
        { label: "Primary Challenge", description: "Manual data processing was time-consuming and error-prone, with no centralized analytics platform for business decision-making." },
        { label: "Business Goal", description: "Create an automated data pipeline to process large volumes of business data and provide actionable insights through dashboards." }
      ],
      role: "Data pipeline development, ETL process design, database optimization, and analytics dashboard creation.",
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "AWS S3", "Apache Spark", "Tableau", "Docker", "Kubernetes"],
      solution: "Built a scalable data pipeline using Apache Airflow for orchestration, implemented ETL processes for data transformation, and created interactive dashboards for business intelligence.",
      results: [
        "Reduced data processing time by 75% through automation",
        "Improved data accuracy by 95% with automated validation",
        "Enabled real-time business insights with 24/7 data availability",
        "Reduced manual reporting effort by 80%"
      ],
      takeaways: "Gained expertise in data engineering, ETL processes, and building scalable data infrastructure for enterprise applications.",
      codeAvailable: false,
      note: "Work project at Parkers - code not publicly available"
    },
    {
      title: "AI-Powered Task Management System",
      summary: "Created an intelligent task management application that uses machine learning to prioritize tasks, predict completion times, and optimize team productivity.",
      problem: [
        { label: "Primary Challenge", description: "Teams struggling with task prioritization and time management leading to missed deadlines and reduced productivity." },
        { label: "Innovation Goal", description: "Leverage AI to automate task prioritization and provide intelligent insights for better project management." }
      ],
      role: "AI/ML implementation, frontend development, API integration, and user experience design.",
      technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
      solution: "Implemented ML models for task prioritization, built intuitive UI with drag-and-drop functionality, and created predictive analytics for project timelines.",
      results: [
        "Improved team productivity by 35% through intelligent task prioritization",
        "Reduced project delays by 50% with predictive timeline analysis",
        "Enhanced user satisfaction with 95% positive feedback"
      ],
      takeaways: "Gained expertise in ML integration, real-time data processing, and building AI-powered user interfaces.",
      codeAvailable: false,
      note: "Work project - code not publicly available"
    },
    {
      title: "AWS Automation and Optimization",
      summary: "Implemented custom Python scripts with AWS SDK to automate AWS RDS schema updates, enhancing menu responsiveness and boosting data query efficiency.",
      problem: [
        { label: "Primary Challenge", description: "Manual updates to AWS RDS schemas were time-consuming and error-prone." },
        { label: "Importance", description: "Automation was crucial to improve system responsiveness and data query efficiency." }
      ],
      role: "Developed Python scripts, optimized backend systems, and monitored system health.",
      technologies: ["Python", "AWS SDK (boto3)", "Docker", "CloudFormation", "Lambda"],
      solution: "Automated schema updates and optimized server configurations, resulting in increased system uptime and efficiency.",
      results: [
        "Enhanced menu responsiveness by 36%.",
        "Increased system uptime by 20%.",
        "Reduced manual intervention by 80%"
      ],
      takeaways: "Gained insights into cloud automation and backend optimization.",
      codeAvailable: false,
      note: "Work project - code not publicly available"
    },
    {
      title: "Kitchen Ticket Forecasting Application",
      summary: "Developed a Python-based monitoring tool with a PyQT interface for ticket status visualization, boosting user satisfaction.",
      problem: [
        { label: "Primary Challenge", description: "Lack of real-time feedback in kitchen workflows." },
        { label: "Importance", description: "Real-time monitoring was essential for improving user satisfaction." }
      ],
      role: "Developed the monitoring tool and integrated instant feedback features.",
      technologies: ["Python", "PyQT", "AWS Lambda","MySQL", "WebSocket"],
      solution: "Created a visual interface for real-time ticket status updates.",
      results: [
        "Boosted user satisfaction by 28%",
        "Reduced kitchen waste by 30%",
        "Improved order accuracy by 95%"
      ],
      takeaways: "Learned the importance of real-time feedback in user interfaces.",
      codeAvailable: false,
      note: "Work project - code not publicly available"
    },
    {
      title: "Scalable Web Applications",
      summary: "Designed and developed scalable solutions for clients, automating tasks and enhancing client satisfaction.",
      problem: [
        { label: "Primary Challenge", description: "Workflow bottlenecks and repetitive tasks in client processes." },
        { label: "Importance", description: "Automation was key to reducing manual effort and improving efficiency." }
      ],
      role: "Developed Django APIs, implemented RESTful APIs, and integrated client-specific features.",
      technologies: ["Django", "React", "AWS Lambda", "MySQL", "Redis"],
      solution: "Automated reporting systems and implemented dynamic form generation.",
      results: [
        "Reduced manual effort by 20%.",
        "Boosted project delivery and client satisfaction.",
        "Improved system performance by 40%"
      ],
      takeaways: "Enhanced skills in scalable web application development and client interaction.",
      codeAvailable: false,
      note: "Work project - code not publicly available"
    }
  ];

  return (
    <Container fluid className="project-section">
      <Particle />
      
      <Container style={{ paddingTop: "60px" }}>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "rgba(255, 255, 255, 0.8)", textAlign: "center", fontSize: "1.1rem", marginBottom: "20px" }}>
          Here are some of my recent projects showcasing my skills in full-stack development, AI/ML, data engineering, and cloud technologies.
        </p>
        
        <div style={{ 
          background: "rgba(102, 126, 234, 0.1)", 
          padding: "20px", 
          borderRadius: "12px", 
          marginBottom: "40px",
          border: "1px solid rgba(102, 126, 234, 0.3)"
        }}>
          <p style={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            textAlign: "center", 
            fontSize: "1rem", 
            margin: "0",
            fontStyle: "italic"
          }}>
            💼 <strong>Professional Experience:</strong> These projects represent real-world work experience. 
            While code isn't publicly available due to company policies, the results and technologies demonstrate 
            my ability to deliver impactful solutions in professional environments.
          </p>
        </div>

        <div className="project-grid">
          {caseStudies.map((study, index) => (
            <div className="project-card" key={index}>
              <CaseStudyCard {...study} />
            </div>
          ))}
        </div>

        <div className="work-in-progress">
          <h2>🚀 More Projects Coming Soon!</h2>
          <p>I'm constantly working on new and exciting projects. Stay tuned for updates!</p>
        </div>
      </Container>
    </Container>
  );
}

export default Projects;