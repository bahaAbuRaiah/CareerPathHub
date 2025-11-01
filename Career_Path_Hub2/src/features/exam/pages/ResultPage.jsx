import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getResult } from '../components/ResultLogic';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
// Add confetti for celebration
import Confetti from 'react-confetti';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResultPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  // Parse answers from query params
  const answers = {};
  for (let i = 1; i <= 18; i++) {
    answers[`q${i}`] = Number(query.get(`q${i}`)) || 0;
  }
  const { scores, bestMatch, confidence, description, recommendations } = getResult(answers);

  // Chart data
  const doughnutData = {
    labels: Object.keys(scores),
    datasets: [
      {
        data: Object.values(scores),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };
  const barData = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: 'Alignment Score',
        data: Object.values(scores),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderRadius: 8,
      },
    ],
  };

  // Confetti only on first load
  const [showConfetti, setShowConfetti] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 font-['Inter'] py-8 animate-fade-in relative overflow-x-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={250} recycle={false} gravity={0.25} />}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-6 shadow-lg relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="inline-block animate-bounce text-yellow-300">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="inline"><path d="M12 2L13.09 8.26L19 8.27L14.18 12.14L15.64 18.02L12 14.77L8.36 18.02L9.82 12.14L5 8.27L10.91 8.26L12 2Z" fill="currentColor"/></svg>
              </span>
              Your Career Path Results
            </h1>
            <p className="text-blue-100">Discover your ideal IT specialization based on your responses</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/exam')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-500 hover:to-green-400 transition-colors flex items-center gap-2 shadow-md"
            >
              <i className="fas fa-redo"></i>
              Retake Test
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-md"
            >
              <i className="fas fa-arrow-left"></i>
              Home
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* Top Recommendation Card */}
        <div className="card bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-12 animate-slide-in border border-blue-100 hover:scale-[1.02] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-52 h-52 flex items-center justify-center">
              <svg className="w-52 h-52">
                <circle className="text-gray-200" strokeWidth="12" stroke="currentColor" fill="transparent" r="85" cx="110" cy="110" />
                <circle
                  className="progress-ring text-blue-600"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="85"
                  cx="110"
                  cy="110"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 85}`,
                    strokeDashoffset: `${2 * Math.PI * 85 * (1 - confidence / 100)}`,
                    transition: 'stroke-dashoffset 0.5s',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-blue-600 drop-shadow-lg animate-pulse">{confidence}%</span>
                <span className="text-base text-gray-500 mt-2">Confidence</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-sm font-semibold text-blue-600 mb-2 tracking-widest uppercase">Best Match</div>
              <h2 className="text-5xl font-extrabold text-indigo-800 mb-4 drop-shadow-lg animate-fade-in-up">
                <span className="inline-block align-middle mr-2 animate-bounce text-yellow-400">
                  <i className="fas fa-trophy"></i>
                </span>
                {bestMatch}
              </h2>
              <p className="text-gray-700 text-lg mb-6">Based on your responses, we've identified your strongest alignment in IT.</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md">
                  <i className="fas fa-download"></i>
                  Download Report
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-md">
                  <i className="fas fa-share-alt"></i>
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Score Distribution */}
          <div className="card bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-blue-100 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Score Distribution</h2>
              <div className="text-sm text-gray-500">
                <i className="fas fa-info-circle"></i>
                &nbsp;Relative scores
              </div>
            </div>
            <div className="chart-container">
              <Doughnut data={doughnutData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
          {/* Comparative Analysis */}
          <div className="card bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-blue-100 hover:scale-[1.01] transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Comparative Analysis</h2>
              <div className="text-sm text-gray-500">
                <i className="fas fa-chart-bar"></i>
                &nbsp;Alignment by field
              </div>
            </div>
            <div className="chart-container">
              <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 5 } } }} />
            </div>
          </div>
          {/* Detailed Insights */}
          <div className="card bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-blue-100 hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Detailed Insights</h2>
            <div className="prose">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Primary Strength</h3>
                <p className="text-blue-600">{bestMatch} (Score: {scores[bestMatch].toFixed(2)} out of 5)</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Profile Analysis</h3>
                <p className="text-gray-600">{description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Key Indicators</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Strong analytical and problem-solving abilities</li>
                  <li>Interest in technical challenges and innovation</li>
                  <li>Alignment with industry best practices</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Career Recommendations */}
          <div className="card bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-blue-100 hover:scale-[1.01] transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Next Steps</h2>
            <div className="space-y-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <i className="fas fa-check-circle text-green-600 mt-1"></i>
                  <div>
                    <p className="text-green-800 font-medium">{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage; 