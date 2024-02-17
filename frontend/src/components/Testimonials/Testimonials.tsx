import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './testimonials.module.css';
import profileImage from '../../assets/profile.jpg';

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };
    // Placeholder data for testimonials
    const testimonials = [
        {
            id: 1,
            text: "This platform has transformed the way I learn. The courses are fantastic and the community is incredibly supportive.",
            author: "Jane Doe",
            image: profileImage,
            linkedin: "https://www.linkedin.com/in/janedoe/"
        },
        {
            id: 2,
            text: "I've gained so much confidence since I started using Quiz Qrafter. The quizzes are both challenging and fun.",
            author: "John Smith",
            image: profileImage,
            linkedin: "https://www.linkedin.com/in/janedoe/"
        },
        {
            id: 3,
            text: "This platform has transformed the way I learn. The courses are fantastic and the community is incredibly supportive.",
            author: "Jane Doe",
            image: profileImage,
            linkedin: "https://www.linkedin.com/in/janedoe/"
        },
        {
            id: 4,
            text: "I've gained so much confidence since I started using Quiz Qrafter. The quizzes are both challenging and fun.",
            author: "John Smith",
            image: profileImage,
            linkedin: "https://www.linkedin.com/in/janedoe/"
        },
        // Add more testimonials as needed
    ];

    return (
        <section className={styles.testimonials}>
            <h2 className={styles.heading}>Testimonials</h2>
            <Slider {...settings}>
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className={styles.slide}>
                        <blockquote className={styles.testimonial}>
                            {/* Only the image is wrapped with <a> tag */}
                            <a href={testimonial.linkedin} target="_blank" rel="noopener noreferrer">
                                <img src={testimonial.image} alt="" className={styles.testimonialImage} />
                            </a>
                            <div className={styles.testimonialContent}>
                                <p className={styles.text}>{testimonial.text}</p>
                                <footer className={styles.author}>{testimonial.author}</footer>
                            </div>
                        </blockquote>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Testimonials;