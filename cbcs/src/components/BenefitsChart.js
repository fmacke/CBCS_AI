// src/components/BenefitsChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BenefitsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const benefitsData = {
      labels: ['Accuracy & Usefulness', 'Data Control & Governance', 'Data Usage & Cost', 'Team-Wide Value & Access'],
      datasets: [
        {
          label: 'Generalist AI (e.g. Copilot)',
          data: [3, 2, 4, 3],
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Bespoke Compass AI',
          data: [9, 9.5, 8, 9.5],
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };

    const tooltipsText = {
      'Generalist AI (e.g. Copilot)': [
        'Inconsistent output and varying accuracy due to generalist training.',
        'Decentralized control; risk to data integrity and consistency.',
        'Inefficient due to numerous individual queries and redundant work.',
        'Limited to "savvy" users with deep AI knowledge; not accessible to all.',
      ],
      'Bespoke Compass AI': [
        'High accuracy and consistency from training on controlled, high-quality data.',
        'Centralized control ensures consistency and automated data updates.',
        'More efficient, centralized processing reduces overall data usage and cost.',
        'Democratizes access; useful and reliable for all team members.',
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: benefitsData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            title: {
              display: true,
              text: 'Relative Value / Effectiveness Score',
              font: { size: 14 },
            },
          },
          x: {
            ticks: {
              callback: function (value) {
                const label = this.getLabelForValue(value);
                if (label.length > 15) {
                  return label.split('&').map((l) => l.trim());
                }
                return label;
              },
              font: { size: 12 },
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Comparison of AI Approaches',
            font: { size: 18, weight: 'bold' },
            padding: { top: 10, bottom: 30 },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              afterBody: function (context) {
                const datasetLabel = context[0].dataset.label;
                const dataIndex = context[0].dataIndex;
                if (tooltipsText[datasetLabel] && tooltipsText[datasetLabel][dataIndex]) {
                  const text = tooltipsText[datasetLabel][dataIndex];
                  const words = text.split(' ');
                  const lines = [];
                  let currentLine = '';
                  words.forEach((word) => {
                    if ((currentLine + word).length > 40) {
                      lines.push(currentLine.trim());
                      currentLine = '';
                    }
                    currentLine += word + ' ';
                  });
                  lines.push(currentLine.trim());
                  return lines;
                }
                return '';
              },
            },
          },
        },
      },
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-blue-800">The Commercial Benefits</h3>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            A centralized approach delivers several key commercial advantages, making the system a genuinely valuable and reliable tool for all users.
          </p>
        </div>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl fade-in">
          <div className="chart-container">
            <canvas id="benefitsChart" ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsChart;