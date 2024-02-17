import React from 'react';
import styles from './feature.module.css'; // Make sure this is the correct path to your CSS module

interface FeatureProps {
    title: string;
    description: string;
    imageUrl: string; // Assuming you pass an image URL as a prop
}

const Feature = ({ title, description, imageUrl }: FeatureProps) => {
    return (
        <div className={styles.featureCard}>
            <img src={imageUrl} alt={title} className={styles.featureImage} />
            <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDescription}>{description}</p>
                <button className={styles.enrollButton}>Enroll course</button>
            </div>
        </div>
    );
};

export default Feature;
