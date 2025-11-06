import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import type { FormData as VideoFormData, VideoStyle } from '../types';

interface VideoFormProps {
  onSubmitSuccess: (requestId: string) => void;
  userId?: string;
}

const VIDEO_STYLES: { value: VideoStyle; label: string }[] = [
  { value: 'corporate', label: 'Corporate - Professional and Trustworthy' },
  { value: 'dynamic', label: 'Dynamic - Energetic and Fast-paced' },
  { value: 'minimalist', label: 'Minimalist - Clean and Modern' },
  { value: 'cinematic', label: 'Cinematic - Dramatic and Impactful' },
  { value: 'animated', label: 'Animated - Creative and Playful' },
];

const DURATIONS = [
  { value: 5, label: '5 seconds' },
  { value: 8, label: '8 seconds' },
  { value: 10, label: '10 seconds' },
  { value: 15, label: '15 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 60, label: '60 seconds' },
];

export default function VideoForm({ onSubmitSuccess, userId }: VideoFormProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    customerName: '',
    customerEmail: '',
    productName: '',
    targetAudience: '',
    videoStyle: 'corporate',
    duration: 8,
    keyMessage: '',
    callToAction: '',
    brandColors: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Sähköpostin validointi
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.customerEmail)) {
        setError('Anna kelvollinen sähköpostiosoite.');
        return;
      }

      // Make.com webhook URL - korvaa oikealla URL:llä
      const WEBHOOK_URL = 'https://hook.eu1.make.com/XXXXXXXYOUR_WEBHOOK_IDXXXXXXXXX';
      
      // Valmistellaan data webhookille
      const webhookData = {
        timestamp: new Date().toISOString(),
        request_id: `mx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        customer_info: {
          name: formData.customerName,
          email: formData.customerEmail,
          user_id: userId || null,
        },
        product_info: {
          product_name: formData.productName,
          target_audience: formData.targetAudience,
          video_style: formData.videoStyle,
          duration_seconds: formData.duration,
          key_message: formData.keyMessage,
          call_to_action: formData.callToAction || '',
          brand_colors: formData.brandColors || [],
        },
        metadata: {
          form_version: '2.0',
          source: 'merxman-video-form',
          user_agent: navigator.userAgent,
          language: 'fi',
          ip_address: '' // Lisätään backendissä jos tarpeen
        }
      };

      // Lähetä webhook Make.com:lle
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        onSubmitSuccess(webhookData.request_id);
      } else {
        const errorData = await response.text();
        throw new Error(`Webhook failed: ${response.status} - ${errorData}`);
      }
    } catch (err) {
      console.error('Webhook error:', err);
      setError('Lomakkeen lähetys epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    
