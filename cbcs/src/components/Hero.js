// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          A Strategic Investment in Efficiency & Accuracy
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming a general tool into a powerful, centralized asset that delivers significant commercial value to the entire organization.
        </p>
      </div>
    </section>
  );
};

export default Hero;
