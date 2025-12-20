/**
 * Analytics and event tracking utilities
 */

export type EventType =
  | 'wallet_connected'
  | 'wallet_disconnected'
  | 'vote_cast'
  | 'contender_registered'
  | 'voting_started'
  | 'voting_ended'
  | 'transaction_sent'
  | 'transaction_confirmed'
  | 'transaction_failed'
  | 'page_view'
  | 'button_click'
  | 'error_occurred';

export interface AnalyticsEvent {
  type: EventType;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    this.enabled = typeof window !== 'undefined' && 
                   process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
  }

  /**
   * Track an event
   */
  track(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    const eventData = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventData);
    }

    // Here you could send to analytics service (Google Analytics, Mixpanel, etc.)
    // Example:
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', event.type, event.properties);
    // }
  }

  /**
   * Track page view
   */
  pageView(path: string): void {
    this.track({
      type: 'page_view',
      properties: { path },
    });
  }

  /**
   * Track button click
   */
  buttonClick(buttonName: string, location?: string): void {
    this.track({
      type: 'button_click',
      properties: { buttonName, location },
    });
  }

  /**
   * Track error
   */
  error(error: Error, context?: string): void {
    this.track({
      type: 'error_occurred',
      properties: {
        message: error.message,
        stack: error.stack,
        context,
      },
    });
  }

  /**
   * Track transaction
   */
  transaction(
    type: 'sent' | 'confirmed' | 'failed',
    txHash: string,
    txType?: string
  ): void {
    const eventType: EventType =
      type === 'sent'
        ? 'transaction_sent'
        : type === 'confirmed'
        ? 'transaction_confirmed'
        : 'transaction_failed';

    this.track({
      type: eventType,
      properties: {
        txHash,
        txType,
      },
    });
  }
}

export const analytics = new Analytics();









