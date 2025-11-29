import React from 'react';

export interface CaseStudy {
  id: string;
  title: string;
  category: 'provincial' | 'national';
  image: string;
  highlights: string[];
  description: string;
  link: string;
}

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

// Company Info Types
export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Honor {
  id: string;
  title: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// AI Related Types
export type AIModelType = 'text-pro' | 'text-fast' | 'image' | 'video';

export interface GeneratedMedia {
  type: 'image' | 'video';
  url: string;
  prompt: string;
}