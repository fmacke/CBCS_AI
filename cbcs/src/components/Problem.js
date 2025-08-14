// src/components/Problem.js
import React from 'react';

const Problem = () => {
  return (
    <section id="problem" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-800">The Challenge with a Generalist AI</h3>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            While tools like Copilot offer broad utility, their general nature creates key commercial challenges that limit their effectiveness for our business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h4 className="text-2xl font-bold mb-6">Current Inefficient Workflow</h4>
            <p className="text-gray-700 mb-8">
              The current model is decentralized and inefficient. Over 60 operators individually submit data in varied formats, leading to redundant work, inconsistent outputs, and a significant risk to data integrity.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flow-diagram-box border-red-300 text-red-700 bg-red-50">Operator 1</div>
                <div className="flow-diagram-box border-red-300 text-red-700 bg-red-50">Operator 2</div>
                <div className="flow-diagram-box border-red-300 text-red-700 bg-red-50">...</div>
                <div className="flow-diagram-box border-red-300 text-red-700 bg-red-50">Operator 60+</div>
              </div>
              <div className="flex justify-center items-center my-4">
                <span className="text-4xl text-red-500">↓</span>
              </div>
              <div className="flow-diagram-box border-yellow-400 text-yellow-800 bg-yellow-50 font-semibold">
                Generalist AI (e.g. Copilot)
              </div>
              <div className="flex justify-center items-center my-4">
                <span className="text-4xl text-red-500">↓</span>
              </div>
              <div className="flow-diagram-box border-red-500 text-red-900 bg-red-100 font-bold">
                Inconsistent & Unreliable Output
              </div>
            </div>
          </div>
          <div className="space-y-8 fade-in">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-bold mb-2 text-red-700">Inconsistent Output</h5>
              <p className="text-gray-600">
                The AI is not trained on our specific data, leading to suboptimal formats and varying levels of accuracy, making it unreliable for critical functions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-bold mb-2 text-red-700">User Dependency</h5>
              <p className="text-gray-600">
                Effectiveness is highly dependent on a user's deep AI knowledge. This limits the true benefit to only a few "savvy" individuals on the team.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-bold mb-2 text-red-700">Operational Inefficiency</h5>
              <p className="text-gray-600">
                Individual file uploads create redundant work and a lack of control over data submission, posing a commercial risk to data integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;