import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import Pricing from '../components/Landing/Pricing';
import Stats from '../components/Landing/Stats';
import Testimonials from '../components/Landing/Testimonials';

const Landing = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Features />
                <Testimonials />
                <Pricing />
            </main>
            <Footer />
        </>
    );
};

export default Landing;
