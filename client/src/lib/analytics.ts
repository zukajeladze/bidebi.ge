import { hasConsentedToAnalytics, hasConsentedToMarketing } from './cookie-utils';

// Define global tracking functions
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

// Initialize Google Analytics only if user has consented
export const initGA = () => {
  // Check if user has consented to analytics cookies
  if (!hasConsentedToAnalytics()) {
    console.log('Analytics cookies not consented, skipping GA initialization');
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};

// Initialize Facebook Pixel only if user has consented to marketing cookies
export const initFacebookPixel = () => {
  if (!hasConsentedToMarketing()) {
    console.log('Marketing cookies not consented, skipping Facebook Pixel initialization');
    return;
  }

  const pixelId = import.meta.env.VITE_FB_PIXEL_ID;
  if (!pixelId) {
    console.warn('Missing required Facebook Pixel key: VITE_FB_PIXEL_ID');
    return;
  }

  if (typeof window === 'undefined') return;

  if (!window.fbq) {
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        t=b.createElement(e);
        t.async=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(inlineScript);
    return;
  }

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag || !hasConsentedToAnalytics()) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });

  // Track SPA navigation for Meta Pixel too (if enabled)
  if (window.fbq && hasConsentedToMarketing()) {
    window.fbq('track', 'PageView');
  }
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !hasConsentedToAnalytics()) return;
  
  // Track with Google Analytics
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Track with Facebook Pixel
  if (window.fbq && hasConsentedToMarketing()) {
    window.fbq('track', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Facebook Pixel specific tracking functions
export const trackFacebookEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined' || !window.fbq || !hasConsentedToMarketing()) return;
  
  if (parameters) {
    window.fbq('track', eventName, parameters);
  } else {
    window.fbq('track', eventName);
  }
};

// Common Facebook Pixel events for auction platform
export const trackRegistration = () => {
  trackFacebookEvent('CompleteRegistration');
  trackEvent('sign_up', 'engagement', 'user_registration');
};

export const trackBidPlaced = (value?: number, auctionId?: string) => {
  trackFacebookEvent('Purchase', { 
    value: value || 1, 
    currency: 'KGS',
    content_ids: auctionId ? [auctionId] : undefined
  });
  trackEvent('bid_placed', 'auction', 'bid_action', value);
};

export const trackAuctionView = (auctionId: string, auctionTitle?: string) => {
  trackFacebookEvent('ViewContent', {
    content_ids: [auctionId],
    content_name: auctionTitle,
    content_type: 'auction'
  });
  trackEvent('view_auction', 'auction', auctionTitle);
};

export const trackTopUp = (value: number) => {
  trackFacebookEvent('AddPaymentInfo', { value, currency: 'KGS' });
  trackEvent('add_payment_info', 'monetization', 'top_up', value);
};
