import React, { useState } from 'react';
import { ChevronRight, Mail, ArrowRight, Check } from 'lucide-react';

const SaaSQuiz = () => {
  const [stage, setStage] = useState('intro'); // intro, quiz, email, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(null);

  const questions = [
    {
      id: 'company_size',
      question: 'What\'s your company size?',
      answers: [
        { text: 'Solo / Freelancer', value: 'solo', category: 'scale' },
        { text: '2-10 people', value: 'small', category: 'scale' },
        { text: '11-50 people', value: 'medium', category: 'scale' },
        { text: '50+ people', value: 'enterprise', category: 'scale' }
      ]
    },
    {
      id: 'budget',
      question: 'What\'s your monthly SaaS budget?',
      answers: [
        { text: '$0-50', value: 'minimal', category: 'budget' },
        { text: '$50-200', value: 'starter', category: 'budget' },
        { text: '$200-1000', value: 'growth', category: 'budget' },
        { text: '$1000+', value: 'enterprise', category: 'budget' }
      ]
    },
    {
      id: 'primary_need',
      question: 'What\'s your primary pain point?',
      answers: [
        { text: 'Customer Management (CRM)', value: 'crm', category: 'need' },
        { text: 'Project Management', value: 'pm', category: 'need' },
        { text: 'Marketing Automation', value: 'marketing', category: 'need' },
        { text: 'Finances & Accounting', value: 'finance', category: 'need' },
        { text: 'Communications', value: 'comms', category: 'need' }
      ]
    },
    {
      id: 'priority',
      question: 'What matters most to you?',
      answers: [
        { text: 'Ease of Use', value: 'easy', category: 'priority' },
        { text: 'Advanced Features', value: 'features', category: 'priority' },
        { text: 'Best Price', value: 'price', category: 'priority' },
        { text: 'Integration Capacity', value: 'integration', category: 'priority' }
      ]
    },
    {
      id: 'timeline',
      question: 'When do you need to implement?',
      answers: [
        { text: 'Immediately (this week)', value: 'urgent', category: 'timeline' },
        { text: 'Soon (this month)', value: 'soon', category: 'timeline' },
        { text: 'Planning (next quarter)', value: 'planning', category: 'timeline' },
        { text: 'Just researching', value: 'research', category: 'timeline' }
      ]
    }
  ];

  const recommendations = {
    crm: {
      title: 'Best CRM Solutions for You',
      tools: [
        {
          name: 'HubSpot',
          description: 'Complete CRM with marketing & sales automation',
          match: 95,
          affiliate: 'hubspot.com'
        },
        {
          name: 'Pipedrive',
          description: 'Sales-focused CRM with beautiful interface',
          match: 88,
          affiliate: 'pipedrive.com'
        },
        {
          name: 'Zoho CRM',
          description: 'Affordable with powerful features',
          match: 85,
          affiliate: 'zoho.com/crm'
        }
      ]
    },
    pm: {
      title: 'Best Project Management Tools for You',
      tools: [
        {
          name: 'Monday.com',
          description: 'Visual project management with automation',
          match: 92,
          affiliate: 'monday.com'
        },
        {
          name: 'Asana',
          description: 'Flexible workflows for any team size',
          match: 89,
          affiliate: 'asana.com'
        },
        {
          name: 'Notion',
          description: 'All-in-one workspace at great price',
          match: 86,
          affiliate: 'notion.so'
        }
      ]
    },
    marketing: {
      title: 'Best Marketing Automation for You',
      tools: [
        {
          name: 'HubSpot Marketing',
          description: 'Complete marketing automation platform',
          match: 94,
          affiliate: 'hubspot.com/marketing'
        },
        {
          name: 'Mailchimp',
          description: 'Email marketing with automation',
          match: 87,
          affiliate: 'mailchimp.com'
        },
        {
          name: 'ActiveCampaign',
          description: 'Powerful automation for SMBs',
          match: 85,
          affiliate: 'activecampaign.com'
        }
      ]
    }
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const needValue = answers.primary_need || 'crm';
    setScore(needValue);
    setStage('email');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStage('results');
      // Here you'd send the email + answers to your backend
      console.log('Email:', email, 'Answers:', answers);
    }
  };

  // ============ INTRO STAGE ============
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1b2e] via-[#1a2847] to-[#0f1b2e] flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; }
          
          .glow-text {
            background: linear-gradient(135deg, #d4a574 0%, #f5d5a8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .button-hover {
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .button-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(212, 165, 116, 0.2);
          }
          
          .shimmer {
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>

        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-white">Find Your Perfect</span><br/>
              <span className="glow-text">SaaS Match</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
              Answer 5 quick questions and get personalized software recommendations tailored to your business needs, budget, and goals.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: '⚡', label: '2 min Quiz' },
                { icon: '🎯', label: 'Personalized' },
                { icon: '💼', label: 'Expert Tips' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-gray-300 text-sm">{item.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStage('quiz')}
              className="button-hover w-full bg-gradient-to-r from-[#d4a574] to-[#f5d5a8] text-[#0f1b2e] font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-lg"
            >
              Start Quiz Now <ArrowRight size={20} />
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            ✓ No spam. Your data is safe. We hate spam too.
          </p>
        </div>
      </div>
    );
  }

  // ============ QUIZ STAGE ============
  if (stage === 'quiz') {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1b2e] via-[#1a2847] to-[#0f1b2e] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="glow-text text-sm font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4a574] to-[#f5d5a8]"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(answer.value)}
                  className="button-hover w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#d4a574] text-white p-5 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{answer.text}</span>
                    <ChevronRight size={20} className="text-[#d4a574] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ EMAIL STAGE ============
  if (stage === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1b2e] via-[#1a2847] to-[#0f1b2e] flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d4a574] to-[#f5d5a8] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-[#0f1b2e]" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              One More Step!
            </h2>
            <p className="text-gray-300 text-lg">
              Get your personalized recommendations + exclusive tips sent to your email
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a574] mb-6 transition-colors"
            />

            <button
              type="submit"
              className="button-hover w-full bg-gradient-to-r from-[#d4a574] to-[#f5d5a8] text-[#0f1b2e] font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 text-lg"
            >
              Get My Recommendations <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // ============ RESULTS STAGE ============
  if (stage === 'results') {
    const recs = recommendations[score] || recommendations.crm;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1b2e] via-[#1a2847] to-[#0f1b2e] p-4">
        <div className="max-w-4xl mx-auto py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-green-400 text-sm font-semibold flex items-center gap-2">
                <Check size={16} /> Ready to Go!
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {recs.title}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Based on your answers, here are the top solutions matched to your needs
            </p>
          </div>

          {/* Recommendations Cards */}
          <div className="space-y-4 mb-12">
            {recs.tools.map((tool, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#d4a574] rounded-2xl p-8 transition-all group hover:bg-white/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-gray-300">{tool.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold glow-text">{tool.match}%</div>
                    <div className="text-xs text-gray-400">Match</div>
                  </div>
                </div>

                <div className="h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#d4a574] to-[#f5d5a8]"
                    style={{ width: `${tool.match}%` }}
                  />
                </div>

                <a
                  href={`https://${tool.affiliate}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-hover inline-flex items-center gap-2 text-[#d4a574] hover:text-[#f5d5a8] font-semibold mt-4 group-hover:translate-x-1 transition-transform"
                >
                  Learn More <ChevronRight size={18} />
                </a>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#d4a574]/10 to-[#f5d5a8]/10 border border-[#d4a574]/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Need More Guidance?
            </h3>
            <p className="text-gray-300 mb-6">
              Check out our detailed buyer's guides with comparisons, pricing, and implementation tips
            </p>
            <button className="button-hover bg-gradient-to-r from-[#d4a574] to-[#f5d5a8] text-[#0f1b2e] font-semibold py-3 px-8 rounded-xl inline-flex items-center gap-2">
              Read Full Guides <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SaaSQuiz;
