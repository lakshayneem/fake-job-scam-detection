import React from 'react';
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
    const container = {
        margin: "100px auto",
        maxWidth: "90%",
        paddingBottom: 100,
        width: "100%",
        overflowX: "hidden", // Prevents horizontal overflow
    };
    
    const cardContainer = {
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingTop: 20,
        marginBottom: 20,
    };
    
    const card = {
        fontSize: 18,
        width: "100%",
        maxWidth: 400,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        background: "#ffffff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        textAlign: "center",
        color: "#333",
    };
    
    const cardVariants = {
        offscreen: { y: 200, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };
    
    const featureCards = [
        { title: "AI-Powered Detection", description: "Analyzes job listings with AI to detect scams accurately." },
        { title: "Real-Time Alerts", description: "Instantly notifies users about suspicious job postings." },
        { title: "Risk Assessment", description: "Provides a safety score for each job listing." },
        { title: "Company Verification", description: "Checks employer legitimacy through multiple sources." },
        { title: "Scam Database", description: "Maintains an updated list of known scam job listings." },
    ];
    
    const Card = ({ title, description, i }) => {
        return (
            <motion.div
                className={`card-container-${i}`}
                style={cardContainer}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
            >
                <motion.div style={card} variants={cardVariants} className="card">
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{title}</h3>
                    <p style={{ fontSize: '16px', color: '#555' }}>{description}</p>
                </motion.div>
            </motion.div>
        );
    };
      const token = localStorage.getItem("authToken");
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="navbar-brand ms-2 mb-0 fw-bold">JobShield</h1>
          </div>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <a className="nav-link fw-semibold nav-hover" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold nav-hover" href="#works">How it Works?</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold nav-hover" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold nav-hover" href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            {token ? 
            <>
              <Link to='/model' className="btn btn-outline-dark px-4">Test our Model</Link>
              <Link to='/signup' className="btn btn-dark px-4" onClick = {()=>localStorage.removeItem("authToken")}>Logout</Link>
            </>: 
            <>
              <Link to='/login' className="btn btn-outline-dark px-4">Login</Link>
              <Link to='/signup' className="btn btn-dark px-4">Signup</Link>
            </>}
            
          </div>
        </div>
      </nav>

      <style>
        {`
          .nav-hover:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <section className="hero-section text-center py-5 d-flex flex-column align-items-center justify-content-center bg-body-tertiary" style={{ minHeight: '88vh', width: '100%', overflowX: 'hidden' }}>
        <h1 className="fw-bold display-5 text-dark">
          Protect Your Career From <span className="text-danger">Fake Job Scams</span>
        </h1>
        <p className="lead text-muted mt-3">
          JobShield uses advanced AI to detect fraudulent job listings, keeping you safe from scammers and time-wasters.
        </p>
        <div className="mt-4">
          {token ? 
          <>
            <Link to='/model' className="btn btn-dark px-5 py-2 me-3">Test our Model</Link>
          </>
          :
          <>
            <Link to='/login' className="btn btn-dark px-5 py-2 me-3">Get Started</Link>
          </>}
          
          <a href = '#works' className="btn btn-outline-dark px-5 py-2">Learn More</a>
        </div>
      </section>

          <div className="text-center py-5 bg-body-tertiary" style={{ width: '100%', overflowX: 'hidden' }}>
                <div className="text-center my-5">
            <h1 style={{fontWeight:'800'}} className="text-3xl sm-text-5xl text-dark">
                Stay Safe in Your Job Search
            </h1>
            <p className="mx-auto text-muted fs-5" style={{ maxWidth: '900px' }}>
                Our advanced technology analyzes job listings to identify potential scams before you waste your time
                or risk your personal information.
            </p>
        </div>

        <h2 id='features' className="fw-bold text-decoration-underline">Key Features</h2>
        <div className="row justify-content-center">
          {featureCards.map(({ title, description }, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4 p-3">
              <Card i={i} title={title} description={description} />
            </div>
          ))}
        </div>
      </div>
      <div id='works' style={{display:'flex',flexDirection:'column',height:'100vh',justifyContent:'center',alignItems:'center'}}>

      
      <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{fontWeight:'800'}}>How JobShield Works</h1>
        <p style={{fontWeight:'100'}}>Our platform uses advanced machine learning to protect you from job scams in three simple steps.</p>
      </div>
      <div className="container py-5">
    <div className="position-relative">
        
        <div className="row text-center">
            <div className="col-md-4 d-flex flex-column align-items-center position-relative z-1">
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold mb-3 shadow-lg" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>
                1
                </div>
                <h3 className="fw-bold">Fill the details asked in the form</h3>
                <p className="text-muted mt-2">
                Simply copy and paste the job listing details in the form, if any field's value is not mentioned in the listing, you may leave the field blank
                </p>
            </div>

            <div className="col-md-4 d-flex flex-column align-items-center position-relative z-1">
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold mb-3 shadow-lg" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>
                2
                </div>
                <h3 className="fw-bold">Instant Analysis</h3>
                <p className="text-muted mt-2">
                Our AI analyzes the listing against our database of scam patterns and legitimate employers.
                </p>
            </div>

            <div className="col-md-4 d-flex flex-column align-items-center position-relative z-1">
                <div className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold mb-3 shadow-lg" style={{ width: '64px', height: '64px', fontSize: '1.5rem' }}>
                3
                </div>
                <h3 className="fw-bold">Get Results</h3>
                <p className="text-muted mt-2">
                Receive a detailed report with a safety score and specific red flags if detected.
                </p>
            </div>
            </div>
        </div>
    </div>
    </div>
          <div id='pricing' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100vh'}}>
            <h1 style={{fontWeight:'800'}}>Simple, Transparent Pricing</h1>
            <Layout></Layout>
          </div>
          <Footer></Footer>
    </>
  );
}
