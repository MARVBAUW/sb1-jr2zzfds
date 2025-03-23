export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'project_manager' | 'investor' | 'contractor';
  subscription_tier: 'free' | 'premium' | 'enterprise';
}

export interface Project {
  id: string;
  name: string;
  location: string;
  budget: number;
  progress: number;
  manager_id: string;
  status: 'active' | 'pending' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  importance: 'high' | 'medium' | 'low';
  icon: string;
  created_at: string;
}

export interface KPI {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}