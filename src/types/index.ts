// Type Definitions for Merxman AI Video Application

export interface User {
  id: string;
  email: string;
  subscription_tier: string;
  credits_remaining: number;
  total_videos_generated: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface VideoRequest {
  id: string;
  user_id: string;
  form_data: FormData;
  generated_prompt: any;
  runway_job_id?: string;
  status: VideoStatus;
  error_message?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface Video {
  id: string;
  request_id: string;
  video_url: string;
  storage_path: string;
  duration: number;
  file_size: number;
  quality: string;
  aspect_ratio: string;
  thumbnail_url?: string;
  created_at: string;
  expires_at?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export type VideoStatus = 
  | 'pending' 
  | 'processing' 
  | 'submitted' 
  | 'completed' 
  | 'failed';

export type SubscriptionTier = 
  | 'starter' 
  | 'professional' 
  | 'business' 
  | 'enterprise';

export type SubscriptionStatus = 
  | 'active' 
  | 'cancelled' 
  | 'past_due' 
  | 'trialing';

export interface FormData {
  userId?: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  targetAudience: string;
  videoStyle: VideoStyle;
  duration: number;
  brandColors?: string[];
  keyMessage: string;
  callToAction?: string;
}

export type VideoStyle = 
  | 'corporate' 
  | 'dynamic' 
  | 'minimalist' 
  | 'cinematic' 
  | 'animated';

export interface PricingTier {
  name: string;
  price: number | string;
  videosPerMonth: number;
  maxDuration: number;
  quality: string;
  support: string;
  features: string[];
  popular?: boolean;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  details?: string;
}

export interface VideoStatusResponse {
  status: VideoStatus;
  video_url?: string;
  video_id?: string;
  request_id: string;
  progress?: number;
  estimated_completion?: string;
  error?: string;
}