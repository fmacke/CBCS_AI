// src/components/Solution.js
import React from 'react';

const Solution = () => {
  return (
    <section id="solution" className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-800">The Proposed Solution: A Centralized Compass AI</h3>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A dedicated AI front end for Compass projects, trained on our data, offers a robust, valuable, and efficient alternative.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-bold mb-2 text-green-700">Dedicated AI Front End</h5>
              <p className="text-gray-600">
                A bespoke system utilizing Retrieval-Augmented Generation (RAG) trained specifically on our projects, procedures, costs, and sales data.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-bold mb-2 text-green-700">Standardized Submission</h5>
              <p className="text-gray-600">
                A single, prescribed format for project data submission replaces the current fragmented approach, ensuring all data is presented to the AI optimally.
              </p>
            </div>
          </div>
          <div className="fade-in">
            <h4 className="text-2xl font-bold mb-6">Proposed Streamlined Workflow</h4>
            <p className="text-gray-700 mb-8">
              This centralized approach ensures all data is submitted in an orderly, optimal way, leading to highly accurate, consistent, and useful results for the entire team.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flow-diagram-box border-gray-300 text-gray-700 bg-gray-50">
                All Project Data (Projects, Costs, Sales, Procedures)
              </div>
              <div className="flex justify-center items-center my-4">
                <span className="text-4xl text-green-500">↓</span>
              </div>
              <div className="flow-diagram-box border-blue-400 text-blue-800 bg-blue-100 font-semibold">
                Centralized Compass AI (RAG Trained)
              </div>
              <div className="flex justify-center items-center my-4">
                <span className="text-4xl text-green-500">↓</span>
              </div>
              <div className="flow-diagram-box border-green-500 text-green-900 bg-green-100 font-bold">
                Consistent, Accurate & Useful Output
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;