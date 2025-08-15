import domainMetricsData from "@/services/mockData/domainMetrics.json";

// Simple in-memory storage for current domain
let currentDomain = null;

const domainService = {
  async getMetrics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // If we have a domain, customize the data for that domain
        const metrics = { ...domainMetricsData };
        if (currentDomain) {
          // Add domain-specific context to metrics
          metrics.domain = currentDomain;
          // Slightly randomize metrics to simulate domain-specific data
          const domainHash = currentDomain.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0);
          const variation = Math.abs(domainHash) % 20 - 10; // -10 to +10 variation
          
          metrics.visibilityScore = Math.max(10, Math.min(100, metrics.visibilityScore + variation));
          metrics.totalKeywords = Math.max(50, metrics.totalKeywords + Math.floor(variation * 2));
          metrics.topTenKeywords = Math.max(5, metrics.topTenKeywords + Math.floor(variation / 3));
        }
        resolve(metrics);
      }, 300);
    });
  },

  getCurrentDomain() {
    return currentDomain;
  },

  async setCurrentDomain(domain) {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentDomain = domain;
        resolve(domain);
      }, 100);
    });
  },

  async removeDomain() {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentDomain = null;
        resolve();
      }, 100);
    });
  }
};

export default domainService;