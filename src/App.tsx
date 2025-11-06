import { useState } from 'react';
import VideoForm from './components/VideoForm';
import VideoResult from './components/VideoResult';
import PricingDisplay from './components/PricingDisplay';
import { Video } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'form' | 'pricing' | 'result'>('form');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [userId] = useState<string>('demo-user-id'); // In production, get from auth

  const handleFormSuccess = (newRequestId: string) => {
    setRequestId(newRequestId);
    setCurrentView('result');
  };

  const handleReset = () => {
    setRequestId(null);
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Merxman AI Video
              </h1>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setCurrentView('form')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'form'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Video
              </button>
              <button
                onClick={() => setCurrentView('pricing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'pricing'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pricing
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {currentView === 'form' && (
          <VideoForm onSubmitSuccess={handleFormSuccess} userId={userId} />
        )}
        
        {currentView === 'pricing' && (
          <PricingDisplay onSelectTier={(tier) => {
            console.log('Selected tier:', tier);
            // In production, handle tier selection (redirect to payment, etc.)
          }} />
        )}
        
        {currentView === 'result' && requestId && (
          <VideoResult requestId={requestId} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            Merxman AI Video - Automated video production with AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;