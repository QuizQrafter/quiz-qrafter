import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Feature from "../../components/Feature/Feature";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import styles from "./home.module.css";
import image1 from "../../assets/courses.png";
import Benefit from "../../components/Benefit/Benefit";

const Home = () => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [features, setFeatures] = useState([
    {
      title: "Interactive Quizzes",
      description:
        "Take quizzes to test your knowledge and learn new concepts.",
      imageUrl: image1,
    },
    {
      title: "Learn Anywhere",
      description: "Access course content on mobile, tablet or desktop.",
      imageUrl: image1,
    },
    {
      title: "Expert Teachers",
      description:
        "Learn from industry experts who are passionate about teaching.",
      imageUrl: image1,
    },
    {
      title: "Unlimited Access",
      description: "Get access to our entire library with a subscription.",
      imageUrl: image1,
    },
  ]);

  return (
    <div className={styles.home}>
      <Header />
      <Hero />
      <section className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Most popular courses</h2>
          <button
            className={styles.viewAllButton}
            onClick={() => setShowAllFeatures(!showAllFeatures)}
          >
            {showAllFeatures ? "View Less" : "View All"}
          </button>
        </div>
        <div className={styles.featuresGrid}>
          {features
            .slice(0, showAllFeatures ? features.length : 2)
            .map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.imageUrl}
              />            
            ))}
        </div>
      </section>
      <Benefit />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
