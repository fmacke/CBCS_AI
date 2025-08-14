// src/pages/ProjectInfographics.js (or wherever your component is)
import React, { useEffect, useCallback } from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import BenefitsChart from '../components/BenefitsChart';
import Conclusion from '../components/Conclusion';
import '../App.css';

const ProjectInfographics = () => {
    // Moved the event handler inside the component, but it's not being used in this JSX,
    // so it could be removed if it's not needed. Let's assume it's for a different header.
    // If you are nesting this page within a larger structure, the parent's header might handle this.
    const handleMobileNavChange = useCallback((e) => {
      window.location.href = e.target.value;
    }, []);

    useEffect(() => {
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px',
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach((fader) => {
            appearOnScroll.observe(fader);
        });

        return () => {
            appearOnScroll.disconnect();
        };
    }, []);

    return (
        <>
            {/* The header below should probably be moved to a separate component,
                and the overall header and main tags should be in your parent component. */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <h1 className="font-bold text-xl text-blue-800">Compass AI: The Business Case</h1>
                    <div className="hidden md:flex space-x-8">
                        <a href="#problem" className="text-gray-600 hover:text-blue-700 transition">The Problem</a>
                        <a href="#solution" className="text-gray-600 hover:text-blue-700 transition">The Solution</a>
                        <a href="#benefits" className="text-gray-600 hover:text-blue-700 transition">The Benefits</a>
                        <a href="#investment" className="text-gray-600 hover:text-blue-700 transition">Conclusion</a>
                    </div>
                    <div className="md:hidden">
                        <select id="mobile-nav" className="bg-gray-200 border border-gray-300 rounded-md p-2" onChange={handleMobileNavChange}>
                            <option value="#hero">Home</option>
                            <option value="#problem">Problem</option>
                            <option value="#solution">Solution</option>
                            <option value="#benefits">Benefits</option>
                            <option value="#investment">Conclusion</option>
                        </select>
                    </div>
                </nav>
            </header>

            <main>
                <Hero />
                <Problem />
                <Solution />
                <BenefitsChart />
                <Conclusion />
            </main>
        </>
    );
};

export default ProjectInfographics;