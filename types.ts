
export enum ServiceType {
  CV_WRITING = 'CV Writing',
  CV_REVIEW = 'CV Review',
  LINKEDIN_OPTIMIZATION = 'LinkedIn Optimization'
}

export enum Currency {
  AED = 'AED',
  USD = 'USD'
}

export interface ServiceCardProps {
  type: ServiceType;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  ctaText: string;
  price: number;
}

export interface ClientData {
  fullName: string;
  email: string;
  phone: string;
  targetJob: string;
  service: ServiceType;
  file?: File;
}

export interface PricingCard {
  name: ServiceType;
  priceAED: number;
  priceUSD: number;
  delivery: string;
  deliverables: string[];
}
