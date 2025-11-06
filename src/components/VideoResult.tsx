
### **2. VideoResult.tsx** (korvaa kokonaan `src/components/VideoResult.tsx`)
```tsx
import { useEffect, useState } from 'react';
import { Download, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { VideoStatusResponse } from '../types';

interface VideoResultProps {
  requestId: string;
  onReset?: () => void;
}

export default function VideoResult({ requestId, onReset }: VideoResultProps) {
  const [status, setStatus] = useState<VideoStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    let intervalId: number;

    const checkStatus = async () => {
      try {
        // PLACEHOLDER: Tämä tulee toteuttamaan myöhemmin
        // Toimii nyt tilapäisesti development-versiona
        setTimeout(() => {
          setError('Tilan tarkistus ei ole vielä käytössä. Maksu on vastaanotettu ja video tullaan luomaan pian.');
          setPolling(false);
        }, 1000);
        
      } catch (err) {
        setError('Virhe tilan tarkistuksessa');
        setPolling(false);
        console.error(err);
      }
    };

    // Initial check
    checkStatus();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [requestId]);

  const getStatusIcon = () => {
    if (!status) return <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />;
    
    switch (status.status) {
      case 'completed':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'failed':
        return <XCircle className="w-12 h-12 text-red-500" />;
      case 'processing':
      case 'submitted':
        return <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />;
      default:
        return <Clock className="w-12 h-12 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    if (error) return 'Kiitos maksusta!';
    
    if (!status) return 'Tarkistetaan tilaa...';
    
    switch (status.status) {
      case 'completed':
        return 'Video valmis!';
      case 'failed':
        return 'Videon luominen epäonnistui';
      case 'processing':
        return 'Luodaan videota...';
      case 'submitted':
        return 'Työ vastaanotettu...';
      default:
        return 'Odotetaan käsittelyä...';
    }
  };

  const handleDownload = async () => {
    if (status?.video_url) {
      try {
        const response = await fetch(status.video_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `merxman-video-${requestId}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        console.error('Lataus epäonnistui:', err);
        alert('Lataus epäonnistui. Kokeile uudelleen.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {error ? <CheckCircle className="w-12 h-12 text-green-500" /> : getStatusIcon()}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getStatusText()}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">{error}</p>
            </div>
          )}

          {status?.status === 'completed' && status.video_url && (
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  src={status.video_url}
                >
                  Selaimesi ei tue videotoistoa.
                </video>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Lataa Video
                </button>

                {onReset && (
                  <button
                    onClick={onReset}
                    className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                  >
                    Luo Uusi Video
                  </button>
                )}
              </div>
            </div>
          )}

          {status?.status === 'failed' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                {status.error || 'Videon luominen epäonnistui. Kokeile uudelleen.'}
              </p>
              {onReset && (
                <button
                  onClick={onReset}
                  className="py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Kokeile Uudelleen
                </button>
              )}
            </div>
          )}

          {polling && !error && (
            <p className="text-sm text-gray-500 mt-4">
              Tilan tarkistus käynnissä...
            </p>
          )}

          {status?.estimated_completion && (
            <p className="text-sm text-gray-500 mt-2">
              Arvioitu valmistumisaika: {new Date(status.estimated_completion).toLocaleTimeString('fi-FI')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
