import { useEffect, useState } from 'react';
import { Download, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { apiClient } from '../lib/api-client';
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
        const response = await apiClient.checkVideoStatus(requestId);
        
        if (response.success && response.data) {
          setStatus(response.data);
          
          // Stop polling if completed or failed
          if (response.data.status === 'completed' || response.data.status === 'failed') {
            setPolling(false);
            if (intervalId) {
              clearInterval(intervalId);
            }
          }
        } else {
          setError(response.error || 'Error checking status');
          setPolling(false);
        }
      } catch (err) {
        setError('Error checking status');
        setPolling(false);
        console.error(err);
      }
    };

    // Initial check
    checkStatus();

    // Poll every 5 seconds if still processing
    if (polling) {
      intervalId = setInterval(checkStatus, 5000) as unknown as number;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [requestId, polling]);

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
    if (!status) return 'Checking status...';
    
    switch (status.status) {
      case 'completed':
        return 'Video Ready!';
      case 'failed':
        return 'Video creation failed';
      case 'processing':
        return 'Creating video...';
      case 'submitted':
        return 'Job submitted...';
      default:
        return 'Waiting for processing...';
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
        console.error('Download failed:', err);
        alert('Download failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getStatusText()}
          </h2>

          {status?.progress !== undefined && status.progress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${status.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {status.progress}% complete
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
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
                  Your browser does not support video playback.
                </video>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Video
                </button>

                {onReset && (
                  <button
                    onClick={onReset}
                    className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
                  >
                    Create New Video
                  </button>
                )}
              </div>
            </div>
          )}

          {status?.status === 'failed' && (
            <div className="space-y-4">
              <p className="text-gray-600">
                {status.error || 'Video creation failed. Please try again.'}
              </p>
              {onReset && (
                <button
                  onClick={onReset}
                  className="py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          )}

          {polling && (
            <p className="text-sm text-gray-500 mt-4">
              Automatically checking status...
            </p>
          )}

          {status?.estimated_completion && (
            <p className="text-sm text-gray-500 mt-2">
              Estimated completion time: {new Date(status.estimated_completion).toLocaleTimeString('en-US')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}